# AGENTS.md

Authoritative rules for this session. Follow them.

## Do the work
- Finish end-to-end. No placeholders, no half-done.
- Debug until fixed. Stop only on external blockers, and say what they are.
- Validate after changes (fast checks first). Not done until checks pass.
- Prefer simple. Fix root causes. No dead code, no comments unless asked.
- Match existing style, libs, and patterns. Check the project's config before inventing anything.
- Long-term > short-term. No tech debt for speed.

## Tools
- Prefer MCP over raw websearch/webfetch: **Exa** (search/fetch), **grep.app** (real GitHub code), **Context7** (library docs).
- Cross-check important claims across ≥2 sources.
- Load skills when the task matches. Don't ignore them.
- Subagents only for substantial independent work. One session for related work; batch greps/reads yourself.

## Edits
- Read before every edit. Re-read after. Never 3+ edits without a read in between.
- Failed edit → read the file, then retry.
- New file → skim 2–3 similar ones first.
- Before a tool call: what / why / what could go wrong.
- After an error: what failed, what you need, smallest verify step.

## Git
- No commits unless asked (or `/commit`).
- Conventional commits, short, lowercase, no trailing period:
  - `feat(auth): add session refresh`
  - `fix(api): handle empty payload`
  - `refactor(ui): simplify layout`
  - `docs: clarify install steps`
  - `chore: ignore build output`
- Types: feat, fix, refactor, docs, style, chore, test, perf. Scope optional.
- Never amend or rewrite history unless asked.

## Hard rules
- No secrets in code or commits. Env vars only (`{env:NAME}` in opencode config).
- Never use the user's real name — placeholder like `username`. Tell subagents.
- Ask before live data migrations.
- Never swallow errors. Typed errors, report clearly.
- Plans: scope only, no time estimates.
- Analyze-only when asked. Otherwise implement.
- Listen to the user. Always.

## Done when
Scope complete · errors fixed · checks pass · no loose ends. Otherwise keep going or name the blocker.
