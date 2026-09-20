---
name: create-verification-skill
description: Generate a project-local verification skill that drives the app the way a user does. Use when the user wants a control/verify skill for this repo, or there is no scripted way to prove UI/CLI/service behavior.
metadata:
  opencode/autoinvoke: false
---

# Create a verification skill

Write a skill the **next OpenCode agent** can run cold: launch the real app, drive a user path, capture evidence. Output lives in the **project**, not global config.

Target: `.opencode/skills/verify-<app>/` (OpenCode project skills). ID is `verify-<app>`.

Use OpenCode `subagent` if you fan out discovery. No Cursor paths, no Task/AskQuestion.

## 1. Interview the repo

Answer from the codebase; ask only what you cannot observe.

- **Surface:** what the user touches (web, CLI/TUI, API, library). Primary + note the rest.
- **Run:** documented local start (package scripts, Makefile, README). Ports, env, seed, auth.
- **Drive:** existing harness first (Playwright, curl, PTY). Else browser/CDP, tmux/PTY, or HTTP.
- **Observe:** screenshots, transcripts, bodies, logs, exit codes, DB.
- **Isolate:** can two instances run side by side? If not, the generated skill must refuse to double-drive.

If the checkout does not start, fix or report that before generating.

**Done when:** surface, run command, drive method, and evidence kind are named from this repo.

## 2. Generate the skill

Write `.opencode/skills/verify-<app>/SKILL.md` with frontmatter `name: verify-<app>` and a description that names the app, surface, and when to load it.

Sections, all filled (no placeholders):

- **Launch:** exact command; ready signal; teardown. Short-lived CLI: build once, each drive in its own session.
- **Doctor:** read-only "is this instance worth driving?"
- **Drive:** real selectors/commands from this repo. Prefer ARIA, data attributes, prompt strings, routes.
- **Evidence:** what to capture and **where**. Real user path; action + resulting state; side effects. Mocks only at an existing production seam.
- **Cleanup:** kill what you started, not by process name. Evidence **survives** teardown at the named path.
- **Helpers:** any script is executable; invocation is in the skill body.

Copy the feature-map shape from [`references/feature-map-example/`](references/feature-map-example/).

## 3. Seed the feature map

`.opencode/skills/verify-<app>/features/README.md` plus one file per user-facing feature (start with 3–5). Each file: `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, `Gotchas`.

## 4. Prove it once

Run the generated skill end to end: launch, doctor, drive **one** mapped feature, evidence, cleanup. After cleanup, the evidence file still exists. A skill never executed is a draft.

## 5. Hand off

Point at `maintain-verification-skill` for upkeep.

## Done

`.opencode/skills/verify-<app>/SKILL.md` exists, one live proof ran, evidence remains on disk.
