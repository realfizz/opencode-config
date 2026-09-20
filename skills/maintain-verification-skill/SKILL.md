---
name: maintain-verification-skill
description: Keep a project's verify skill and feature map honest. Source-wave per feature, one live pass, at most one PR of proven corrections. Use when auditing or updating a verify-* skill.
metadata:
  opencode/autoinvoke: false
---

# Maintain a verification skill

Upkeep for a skill from `create-verification-skill` (or any project `verify-*` with a feature map). Unit of rigor is the **feature**.

Use OpenCode `subagent` (`agent: "explore"`) for the source wave. Children are read-only: they never drive the app and never edit.

## Outcomes

Say which: **clean** (coverage, nothing to ship) | **changed** (one PR of proven map/harness fixes) | **blocked** (name the blocker).

## Edit scope

Only `.opencode/skills/verify-*/` (SKILL.md, features/, helpers it owns). Never product code. Map describes behavior the app no longer does → fix the map **or** report a product regression. Do not paper over bugs in docs.

## Pass

0. **Locate.** Project `.opencode/skills/verify-*/`. Several → ask. None → stop and point at `create-verification-skill`.

1. **Index.** Feature README vs sibling files. Fix missing/extra/dead entries.

2. **Source wave.** One read-only `subagent` per feature file, in parallel. Return: summary / source entry points / likely drift or none / one live recipe.

3. **Reconcile.** Every feature has a summary. Merge recipes. Require a source path before calling a surface "missing."

4. **Live pass.** Required even if source looks clean. Follow the verify skill's Launch model. Doctor before first drive, after any failed drive, and on each fresh session. Evidence survives cleanup. Residue from failed drives is cleaned. Re-drive any harness fix live before it ships.

5. **Triage.** Wrong user-POV → doc drift. Harness cannot drive working behavior → harness gap. App broken → product gap, out of this PR.

6. **Ship or stop.** Changed: one PR, re-read every changed file. Clean/blocked: no PR.

## Done

One of the three outcomes, with features covered and evidence paths named.
