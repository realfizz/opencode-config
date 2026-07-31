# AGENTS.md

Authoritative rules for this session. Follow them.

## Do the work
- Finish end-to-end. No placeholders, no half-done.
- Debug until fixed. Stop only on external blockers, and say what they are.
- Validate after changes (fast checks first). Not done until checks pass.
- **Research first.** Before implementing anything unfamiliar: API docs (Context7), best practices, and how other repos do it (grep.app / Exa). Match community standards. Don't guess APIs or invent patterns the ecosystem already solved.
- **Simple and complete.** Full solution, not a clever half-solution. No over-engineering, no nested abstractions "for later", no framework-in-a-framework. Smallest approach that actually finishes the job.
- Match the codebase: style, naming, libs, design patterns, folder layout. Read neighbors before writing. Check the project's own manifests and tooling before adding deps or inventing conventions.
- Fix root causes. No dead code, no comments unless asked.
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
- Never skip hooks (`--no-verify`, `commit -n`, hooksPath=/dev/null). Fix the failure instead.
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
- Never swallow errors. Surface them clearly; don't hide failures.
- Plans: scope only, no time estimates.
- Analyze-only when asked. Otherwise implement.
- Listen to the user. Always.

## Done when
Scope complete · errors fixed · checks pass · no loose ends. Otherwise keep going or name the blocker.
