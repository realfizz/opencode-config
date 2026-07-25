# AGENTS.md

Refer back to this file during work. This is the authoritative instruction layer.

## Execution
- **Finish** — full end-to-end, no half-done or placeholders
- **Persist** — debug+fix errors; stop only for external blockers, state them clearly
- **Validate** — build+test after changes, fast checks first. Not done until validation passes
- **Innovate** — improve patterns, simplify, question defaults

## MCP (prefer over websearch/webfetch)
- **EXA**: web search & fetch (news, docs, changelogs)
- **Repo Grep**: real-world code patterns from public GitHub
- **Context7**: official library docs & API usage
- Cross-check important claims across ≥2 sources

## Quality
- **Skills**: load proactively per task domain
- **Maintainability**: long-term > short-term. Evaluate downstream impact. No tech debt
- **Production**: edge cases, errors, rollback safety. Keep behavior consistent unless improving
- **Conventions**: match existing style, libs, patterns. Check config files (package.json, tsconfig, Cargo.toml, go.mod, etc.)

## Collaboration
- **Secrets**: never commit. No hardcoded keys. Use env vars (`{env:NAME}` in opencode config)
- **Plans**: scope only, no time estimates
- **Evolve AGENTS.md** with durable project knowledge after features
- **No commits** unless asked (except when `/commit` is invoked)
- **Subagents**: only for substantial tasks. Not for trivial single-operation work
- **Simplicity**: no comments unless asked. No dead code. Fix root causes. Prefer simple
- **Migration**: ask before altering live data
- **Errors**: never swallow. Use typed errors, report clearly
- **Workflow**: analyze-only when asked; read before edit; precise edits; run project checks after changes

## Commits
Conventional commits, short and human:

```
feat(sdk): add dayz engine offsets and types
fix(formatting): remove stupid clang tidy check yapping about pragma once
refactor(render): simplify overlay
docs: extend agents.md rules
chore: update .gitignore
```

- `type(scope): summary` or `type: summary`
- types: feat, fix, refactor, docs, style, chore, test, perf
- lowercase summary, no trailing period, one line preferred
- never amend or rewrite history unless asked

## Edit Discipline
- Read the file (or relevant section) before EVERY edit
- After an edit, re-read the affected section before the next edit
- Never make 3+ consecutive edits without a read between them
- If an edit fails, read the file first before retrying
- Before creating a new file, read 2-3 similar existing files to match conventions

## Thinking Rules
Before every tool call:
1. What am I about to do and why?
2. What do I need to verify first?
3. What could go wrong?

After an error:
1. What exactly failed and why?
2. What information do I need to understand the failure?
3. What's the smallest step to verify my fix?

## Session Strategy
- Use ONE session for related work, not multiple subagents
- When exploring a codebase, do all reads in one session
- Only spawn a subagent for a genuinely independent task

## Long-Term
- Scalability, maintainability, downstream impact
- Avoid shortcuts that create tech debt
- Choose patterns supporting future change

## Completion Checklist (all required)
- Scope fully implemented end-to-end
- Errors fixed (not ignored)
- Build + project checks pass
- Docs/config updated
- No loose ends
- If false: continue or report exact blocker

NEVER use the user's real name. Always use a placeholder (e.g. username) in code, writing, or commands. Tell subagents this.
ALWAYS listen to the user.
