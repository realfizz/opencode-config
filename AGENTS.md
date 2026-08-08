


**Always** follow the rules below strictly.
1. Complete the task **e2e** Deliver a fully working solutuon. NEVER scaffolding, stubs, TODOs, placeholders, partial wiring, or related. 
2. **Verify before claiming done.** Run real validation: typecheck, test suite, linters, and/or live checks (e.g. `curl` against a running API). Do not report success from a plausible diff alone. 
3. **Never fabricate.** Do not invent file paths, APIs, configs, library APIs, commit hashes, or test results. If unknown: read the code, run the command, or check ( via research steps as u see below ), be **fully** confident. 
4. **Touch only what the request requires.** No unrelated refactor/s or opportunistic cleanups in unrelated code.
5. **Do not disturb running development servers.** If a dev server is already running, leave it alone. Do not kill, restart, reconfigure, or alter its process unless the user explicitly asks. If it is broken or blocking work, **alert the user**, do not fix it by restarting it yourself. Same goes for docker containers and other procs that are already running.

---

## 2. Research before implementing the unfamiliar

Before writing or changing code that involves unfamiliar libraries, frameworks, APIs, protocols, or project-specific patterns:

1. **Research first.** Prefer primary sources over guesswork.
2. **Use available tools in this order of preference where relevant:**
   - Project-specific Opencode / internal references
   - MCPs you have access to (Context7, Exa, web search, and others)
   - **GitHub CLI** for code search and repository discovery ( yes the gh cli, not grep.app ) 
3. **Cloning for exploration:** clone into `tmp/` only. Do not pollute the project root. Delete the reference repo from tmp/ after u have finished exploring it
4. **Large research tasks:** use a subagent so the main context stays focused on implementation. This includes gathering information from cloned reference repos.

Do not implement from memory when the surface is unfamiliar or the cost of a wrong assumption is high.
Also use this step to ensure we are following the best practices related to the library, techstack etc. Using the library as documented. 

---

## 3. Simplicity and classic engineering principles

Apply long-standing software design discipline:

| Principle | Meaning in this repo |
|-----------|----------------------|
| **KISS** | Prefer the simplest solution that fully solves the stated problem. |
| **YAGNI** | Do not add features, options, hooks, or abstractions “for later.” Future needs are future decisions. |
| **Minimal surface** | No speculative configurability, plugin systems, or indirection for single-use code. |
| **Surgical change** | Every changed line must trace to the user’s request. |

**Concrete rules:**

- No features beyond what was asked.
- No abstractions for one-off code.
- No error handling for scenarios that cannot occur in this system; handle real failure modes only.
- If the solution is ~200 lines and could be ~50, rewrite it before presenting it.
- Bias toward deleting code over adding code.
- **Test:** would a senior engineer call this overcomplicated? If yes, simplify.

---

## 4. Goal-driven execution and verification

Rewrite vague requests into **verifiable** goals before coding:

- “Fix the bug” → reproduce with a failing test (or clear repro steps), then make it pass.
- “Add validation” → define invalid cases, test them, then implement until tests pass.
- “Make it work with X” → define the observable success criteria and the commands that prove them.

**For every task:**

1. State success criteria briefly before major edits.
2. Implement the minimal change that meets those criteria.
3. Run validation (typecheck, tests, `curl`, build, etc. as appropriate).
4. Read the output. Fix the root cause if checks fail—do not weaken or skip the check.
5. Only then report done.

**Never** claim tests passed, the API works, or types are clean unless those checks were actually run in this session.

---

## 5. Scope, assumptions, and communication

- Stay within the requested scope. If work expands into a redesign or large refactor, **stop and ask**.
- Surface material assumptions explicitly before implementing.
- If the request has two plausible interpretations that change the outcome, **ask**—do not choose silently.
- Prefer direct, precise language. No filler, flattery, or padded ceremony.
- Match existing project style, structure, and patterns. Consistency beats personal preference.

---

## 6. Session and process hygiene

- Prefer small, reviewable diffs.
- Clean up only orphans introduced by your own edit (unused imports, dead locals from the change).
- After repeated failed corrections on the same issue, stop, summarize findings, and ask for a clearer prompt or a fresh session rather than thrashing.
- For exploration-heavy work, prefer subagents so the primary thread remains implementation-focused.

---

## 8. Project learnings

Accumulate **concrete** corrections only (“Always use X for Y”), not vague advice. Prune anything that no longer prevents real mistakes. This goes in the projects ``agents.md``. 

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

- Never use the user's real name — placeholder like `username`. Tell subagents.
 - Ask before live data migrations.
 - Plans: scope only, no time estimates.
- Listen to the user. Always.
 - No secrets in code or commits. 
