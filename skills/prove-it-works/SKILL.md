---
name: prove-it-works
description: Verify against the real artifact before declaring done. Use after implementing, fixing, refactoring, or when a subagent reports success. Compiling or "tests passed" is not enough by itself.
---

# Prove it works

Before you say a task is done, **run the thing the user will run** and observe the result. Proxies do not count: "it compiles," a subagent summary, a cached screenshot, file mtimes.

## Check

1. How does a user exercise this change? Run that path (CLI, UI, HTTP, library call).
2. Observe **input → output** and side effects (files, rows, messages), not only the last screen.
3. Prefer a **scripted** check you can re-run. Keep its output as evidence; do not eat it in cleanup.
4. Subagent work: read the **diff and runtime output**, not the summary.

If `.opencode/skills/verify-*/SKILL.md` exists, follow **that** Launch / Doctor / Drive / Evidence / Cleanup. If none exists and the change is user-facing, say so and offer `create-verification-skill`.

## Done

You have captured evidence (command output, screenshot, response body, log) that the changed path works, in a named location that still exists after teardown.
