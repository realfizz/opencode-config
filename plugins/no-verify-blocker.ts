// Local plugin — no npm. Blocks agents bypassing git hooks.

function tokens(command: string): string[] {
  return command.match(/\S+/g) ?? []
}

function shortFlags(token: string): string[] {
  if (!token.startsWith("-") || token.startsWith("--") || token.length < 2) return []
  return [...token.slice(1)]
}

function isGit(command: string): boolean {
  return /(^|[\s;&|])git(\s|$)/.test(command) || /(^|[\s;&|])\/\S*\/git(\s|$)/.test(command)
}

function isHookSubcommand(command: string): boolean {
  return /\b(commit|commit-tree|push|merge|rebase|cherry-pick|am)\b/.test(command)
}

function isCommit(command: string): boolean {
  // commit / commit-tree after git, not --grep=commit
  return /\bgit\b[^\n=]*\s+commit(?:-tree)?\b/.test(command)
}

function hasNoVerify(command: string): boolean {
  return tokens(command).some((t) => t === "--no-verify" || t.startsWith("--no-verify="))
}

function hasCommitShortN(command: string): boolean {
  if (!isCommit(command)) return false
  for (const t of tokens(command)) {
    if (shortFlags(t).includes("n")) return true
  }
  return false
}

function hasHooksPathBypass(command: string): boolean {
  return (
    /core\.hooksPath\s*=\s*\/dev\/null/.test(command) ||
    /--hooksPath(?:=|\s+)\/dev\/null/.test(command) ||
    /hooksPath\s*=\s*\/dev\/null/.test(command)
  )
}

function block(message: string): never {
  throw new Error(message)
}

function check(command: string): void {
  if (hasHooksPathBypass(command)) {
    block("Blocked: disabling git hooks (hooksPath=/dev/null). Fix the hook failure instead.")
  }

  if (!isGit(command) || !isHookSubcommand(command)) return

  const flags: string[] = []
  if (hasNoVerify(command)) flags.push("--no-verify")
  if (hasCommitShortN(command)) flags.push("-n")
  if (flags.length === 0) return

  block(
    `Blocked: git ${flags.join(" / ")} skips hooks. Fix the failing check and commit without bypass flags.`,
  )
}

export default {
  id: "no-verify-blocker",
  server() {
    return {
      "tool.execute.before": async (
        input: { tool: string },
        output: { args: Record<string, unknown> },
      ) => {
        if (input.tool !== "bash") return
        const command = output?.args?.command
        if (typeof command !== "string" || !command) return
        check(command)
      },
    }
  },
}
