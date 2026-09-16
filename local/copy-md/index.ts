import { spawn } from "node:child_process"
import { Plugin } from "@opencode/plugin"

type SessionMessage = Awaited<ReturnType<Plugin.Context["session"]["context"]>>[number]

function lastAssistantMarkdown(messages: readonly SessionMessage[]): string | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i]
    if (message.type !== "assistant") continue
    const text = message.content
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n\n")
      .trim()
    if (text) return text
  }
}

function copyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("wl-copy", [], { stdio: ["pipe", "ignore", "ignore"], detached: true })
    let settled = false
    const finish = (error?: Error) => {
      if (settled) return
      settled = true
      if (error) reject(error)
      else resolve()
    }
    child.on("error", (error) => finish(error))
    child.stdin.end(text, () => {
      child.unref()
      finish()
    })
  })
}

export default Plugin.define({
  id: "copy-md",
  async setup(ctx) {
    await ctx.command.transform((editor) => {
      editor.add({
        name: "copy-md",
        description: "Copy the latest assistant reply to the clipboard as Markdown",
        execute: async ({ sessionID }) => {
          const text = lastAssistantMarkdown(await ctx.session.context({ sessionID }))
          if (!text) throw new Error("No assistant Markdown to copy")
          await copyToClipboard(text)
        },
      })
    })
  },
})
