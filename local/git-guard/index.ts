import { Plugin } from "@opencode/plugin"

const HOOK_VERBS = /\b(commit|commit-tree|push|merge|rebase|cherry-pick|am)\b/
const BYPASS =
  "Never bypass git hooks. Do not use --no-verify, -n, core.hooksPath=/dev/null, or --hooksPath. Fix the hook failure and retry without bypass flags."
const EDITOR =
  "Do not open an interactive git editor. Pass -m/--file for commits and avoid rebase -i; fix problems in the working tree instead."

function shellCommand(input: unknown): string | undefined {
  if (typeof input !== "object" || input === null || !("command" in input)) return
  return typeof input.command === "string" ? input.command : undefined
}

function shortNoVerify(command: string): boolean {
  if (!/\b(commit|commit-tree)\b/.test(command)) return false
  return (command.match(/\S+/g) ?? []).some((token) => /^-[a-zA-Z]+$/.test(token) && token.slice(1).includes("n"))
}

function gitBypass(command: string): string | undefined {
  if (/hooksPath\s*=\s*\/dev\/null/.test(command) || /--hooksPath\s*=?\s*\/dev\/null/.test(command)) return BYPASS
  if (!/\bgit\b/.test(command) || !HOOK_VERBS.test(command)) return
  if (command.includes("--no-verify") || shortNoVerify(command)) return BYPASS
  if (/\brebase\b/.test(command) && (/\s-i\b/.test(command) || command.includes("--interactive"))) return EDITOR
  if (/\bcommit\b/.test(command) && !/\s(-m|-F|-C|-c|--message|--file|--reuse-message|--reedit-message|--fixup)(\s|=|$)/.test(command))
    return EDITOR
}

export default Plugin.define({
  id: "git-guard",
  async setup(ctx) {
    await ctx.shell.hook("create.before", (event) => {
      event.env.GIT_EDITOR = "/bin/false"
      event.env.GIT_SEQUENCE_EDITOR = "/bin/false"
      event.env.GIT_TERMINAL_PROMPT = "0"
    })

    await ctx.tool.hook("execute.before", (event) => {
      if (event.tool !== "shell" && event.tool !== "bash") return
      const command = shellCommand(event.input)
      const reason = command ? gitBypass(command) : undefined
      if (reason) throw new Error(reason)
    })
  },
})
