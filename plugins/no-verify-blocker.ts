import { Plugin } from "@opencode-ai/plugin"

function commandFrom(input: unknown): string | undefined {
  if (typeof input !== "object" || input === null) return undefined
  const command = (input as Record<string, unknown>).command
  return typeof command === "string" && command ? command : undefined
}

export default Plugin.define({
  id: "eve.no-verify-blocker",
  setup: async (ctx) => {
    await ctx.tool.hook("execute.before", (event) => {
      // beta renamed the tool bash -> shell; match either while on beta
      if (event.tool !== "shell" && event.tool !== "bash") return
      const command = commandFrom(event.input)
      if (!command) return

      if (/hooksPath\s*=\s*\/dev\/null/.test(command)) {
        throw new Error("Blocked: disabling git hooks (hooksPath=/dev/null). Fix the hook failure instead.")
      }
      if (!/\bgit\b/.test(command)) return
      if (!/\b(commit|commit-tree|push|merge|rebase|cherry-pick|am)\b/.test(command)) return

      const skipsShortN = command
        .match(/\S+/g)
        ?.some((t) => t.startsWith("-") && !t.startsWith("--") && t.slice(1).includes("n"))
      if (!command.includes("--no-verify") && !skipsShortN) return

      throw new Error("Blocked: git --no-verify/-n skips hooks. Fix the failing check and commit without bypass flags.")
    })
  },
})
