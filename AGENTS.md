Always follow these rules:

- Dev servers: do not start or restart a project’s existing dev server. Check whether one is already running. If it is, use the herdr skill and reuse the pane that already has it. If none is running, start it in a new herdr pane. Always manage developer panes, long-running tasks, and processes with herdr. Always put them in a fresh herdr tab named `dev` (or similar).

- Technical research: use the GitHub CLI to search code and repos. To inspect a repo in depth, clone it under `tmp/` and explore locally.

# Development

Load these with the skill tool by exact ID. Do not skip them because the change "looks small."

- **TypeScript** (writing or reviewing `.ts` / `.tsx`, signatures, validation, adapters): load `types-and-boundaries`.
- **Module shape** (seams, depth, where an interface goes): load `codebase-design`. New module or risky shape: load `architect` and wait for sign-off. Surveying existing mud: `improve-codebase-architecture`.
- **Done is not compile:** before declaring implementation, fix, or refactor finished, load `prove-it-works` and run it. If `.opencode/skills/verify-*/SKILL.md` exists, follow it. If the change is user-facing and none exists, say so.
- **Same behavior, less clutter:** load `code-simplification`.
- **Enforce package entry points** in a TS repo: `setup-ts-deep-modules` (once per repo).
- **Scripted app drive:** `create-verification-skill` / `maintain-verification-skill`.
- **Before a new helper, dependency, or guessed API:** load `search-first`. Prefer a library over hand-rolled code. Clone under `tmp/` rather than inventing the surface. Context7 MCP is for library docs when it is connected.
- **Building a feature or fix:** load `tdd`. Red before green, at a named seam.
- **Reviewing a diff, PR, or pointed-at change:** load `code-review`.
