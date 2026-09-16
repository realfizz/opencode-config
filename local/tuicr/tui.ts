import { execFile } from "node:child_process"
import { isAbsolute, resolve } from "node:path"
import { promisify } from "node:util"

import { Plugin } from "@opencode/plugin/tui"

const execFileAsync = promisify(execFile)

type HerdrEnvelope = {
  result?: {
    pane?: { pane_id?: string }
    matched_line?: string
  }
}

type TuicrComment = {
  location?: string
  path?: string | null
  start_line?: number | null
  end_line?: number | null
  comment_type?: string
  content?: string
}

type TuicrSession = {
  slug?: string
  comment_count?: number
  active?: boolean
}

function herdrEnv(): boolean {
  return process.env.HERDR_ENV === "1"
}

function parseJson<T>(stdout: string): T {
  const text = stdout.trim()
  const start = text.indexOf("{")
  const array = text.indexOf("[")
  const cut = start === -1 ? array : array === -1 ? start : Math.min(start, array)
  if (cut === -1) throw new Error(`Expected JSON, got: ${text.slice(0, 200)}`)
  return JSON.parse(text.slice(cut)) as T
}

async function run(
  file: string,
  args: string[],
  options?: { cwd?: string },
): Promise<{ stdout: string; stderr: string }> {
  try {
    const { stdout, stderr } = await execFileAsync(file, args, {
      cwd: options?.cwd,
      encoding: "utf8",
      maxBuffer: 8 * 1024 * 1024,
    })
    return { stdout, stderr }
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message?: string }
    throw new Error((err.stderr || err.stdout || err.message || String(error)).trim())
  }
}

async function which(bin: string): Promise<boolean> {
  try {
    await execFileAsync("sh", ["-c", `command -v ${bin}`])
    return true
  } catch {
    return false
  }
}

async function herdr(args: string[]): Promise<HerdrEnvelope> {
  const { stdout, stderr } = await run("herdr", args)
  const text = stdout.trim() || stderr.trim()
  if (!text) return {}
  return parseJson<HerdrEnvelope>(text)
}

function bashQuote(value: string): string {
  return `'${value.replaceAll("'", `'\\''`)}'`
}

function formatComments(comments: readonly TuicrComment[]): string {
  const lines = comments.map((comment, index) => {
    const where = comment.location ?? comment.path ?? "review"
    const type = comment.comment_type && comment.comment_type !== "none" ? ` [${comment.comment_type}]` : ""
    return `${index + 1}. \`${where}\`${type} — ${comment.content?.trim() ?? ""}`
  })
  return ["I reviewed this in tuicr. Address these comments:", "", ...lines].join("\n")
}

export default Plugin.define({
  id: "tuicr",
  setup(context) {
    let busy = false

    const toast = (message: string, variant: "error" | "info" | "success" | "warning" = "error") => {
      context.ui.toast.show({ title: "tuicr", message, variant })
    }

    const closePane = async (paneID: string) => {
      try {
        await herdr(["pane", "zoom", paneID, "--off"])
      } catch {
        /* still close */
      }
      try {
        await herdr(["pane", "close", paneID])
      } catch {
        /* already gone */
      }
    }

    const review = async (input?: string) => {
      if (busy) {
        toast("tuicr is already open", "warning")
        return
      }

      if (!herdrEnv()) {
        toast("Not running inside Herdr")
        return
      }

      const route = context.ui.router.current()
      if (route.type !== "session") {
        toast("Open a session first")
        return
      }

      if (!(await which("herdr")) || !(await which("tuicr"))) {
        toast("herdr and tuicr must be on PATH")
        return
      }

      const cwd = context.location?.directory ?? process.cwd()
      const arg = input?.trim() ?? ""
      const tuicrArgs = arg === "" ? ["-w"] : ["--file", isAbsolute(arg) ? arg : resolve(cwd, arg)]

      busy = true
      let paneID: string | undefined
      try {
        const split = await herdr([
          "pane",
          "split",
          "--current",
          "--direction",
          "right",
          "--cwd",
          cwd,
          "--focus",
        ])
        paneID = split.result?.pane?.pane_id
        if (!paneID) throw new Error("Herdr split did not return a pane id")

        try {
          await herdr(["pane", "zoom", paneID, "--on"])
        } catch {
          /* zoom is optional */
        }

        await new Promise((resolve) => setTimeout(resolve, 400))

        const token = `__TUICR_DONE_${process.pid}_${Date.now()}`
        const inner = `tuicr ${tuicrArgs.map(bashQuote).join(" ")}; printf '\\n%s:%s\\n' ${bashQuote(token)} "$?"`
        await herdr(["pane", "run", paneID, `bash -c ${bashQuote(inner)}`])

        const done = await herdr([
          "pane",
          "wait-output",
          paneID,
          "--regex",
          `${token}:[0-9]+`,
          "--source",
          "recent-unwrapped",
        ])
        const doneLine = done.result?.matched_line ?? ""
        const statusMatch = doneLine.match(new RegExp(`${token}:(\\d+)`))
        const status = statusMatch ? Number(statusMatch[1]) : Number.NaN

        await closePane(paneID)
        paneID = undefined

        if (!Number.isFinite(status) || status !== 0) {
          if (status === 1) toast("tuicr found nothing to review", "warning")
          else toast(`tuicr exited ${Number.isFinite(status) ? status : "unknown"}`)
          return
        }

        const listed = parseJson<TuicrSession[]>(
          (await run("tuicr", ["review", "list", "--repo", cwd], { cwd })).stdout,
        )
        const session = listed.find((row) => (row.comment_count ?? 0) > 0)
        if (!session?.slug) return

        let comments: TuicrComment[] = []
        try {
          comments = parseJson<TuicrComment[]>(
            (await run("tuicr", ["review", "comments", "--session", session.slug], { cwd })).stdout,
          )
        } catch {
          return
        }
        if (!Array.isArray(comments) || comments.length === 0) return

        const delivery = context.data.session.status(route.sessionID) === "running" ? "queue" : "steer"
        await context.client.session.prompt({
          sessionID: route.sessionID,
          text: formatComments(comments),
          delivery,
        })
        toast(`Posted ${comments.length} comment${comments.length === 1 ? "" : "s"}`, "success")
      } catch (error) {
        toast(error instanceof Error ? error.message : String(error))
      } finally {
        if (paneID) await closePane(paneID)
        busy = false
      }
    }

    return context.ui.slot({
      append: "app",
      render: () => {
        context.keymap.layer(() => ({
          mode: "global",
          priority: 10,
          commands: [
            {
              id: "tuicr.open",
              title: "Review in tuicr",
              description: "Open tuicr on the working tree or a file, then post comments back",
              group: "tuicr",
              palette: true,
              slash: { name: "tuicr", arguments: true },
              run: (input) => review(input),
            },
          ],
          bindings: ["tuicr.open"],
        }))
        return null
      },
    })
  },
})
