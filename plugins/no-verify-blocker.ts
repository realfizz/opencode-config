import type { Plugin } from "@opencode-ai/plugin"

// Local copy — no npm. Blocks agents skipping git hooks via --no-verify / -n on commit.

const HOOK_CMDS = /\b(commit|commit-tree|push|merge|rebase|cherry-pick|am)\b/

function tokens(command: string): string[] {
  return command.match(/\S+/g) ?? []
}

function shortFlags(token: string): string[] {
  if (!token.startsWith("-") || token.startsWith("--") || token.length < 2) return []
  return [...token.slice(1)]
}

function isGitHookCommand(command: string): boolean {
  return /\bgit\b/.test(command) && HOOK_CMDS.test(command)
}

function isGitCommit(command: string): boolean {
  return /\bgit\b[^\n=]*\s+commit(?:-tree)?\b/.test(command)
}

function hasNoVerify(command: string): boolean {
  return tokens(command).some((t) => t === "--no-verify")
}

function hasCommitShortN(command: string): boolean {
  if (!isGitCommit(command)) return false
  for (const t of tokens(command)) {
    if (shortFlags(t).includes("n")) return true
  }
  return false
}

function hasHooksPathBypass(command: string): boolean {
  return /core\.hooksPath\s*=\s*\/dev\/null/.test(command) || /--hooksPath\s*=?\s*\/dev\/null/.test(command)
}

export const NoVerifyBlocker: Plugin = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return

      const command = (output?.args as { command?: unknown } | undefined)?.command
      if (typeof command !== "string" || !command) return

      if (hasHooksPathBypass(command)) {
        throw new Error(
          "Blocked: disabling git hooks (core.hooksPath=/dev/null). Fix the hook failure instead.",
        )
      }

      if (!isGitHookCommand(command)) return

      const flags: string[] = []
      if (hasNoVerify(command)) flags.push("--no-verify")
      if (hasCommitShortN(command)) flags.push("-n")
      if (flags.length === 0) return

      throw new Error(
        `Blocked: git ${flags.join(" / ")} skips hooks. Fix the failing check and commit without bypass flags.`,
      )
    },
  }
}

export default NoVerifyBlocker
