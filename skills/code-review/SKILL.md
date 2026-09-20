---
name: code-review
description: Review a change along two axes — standards and spec — using this machine's skills. Use when the user wants a review of a diff, PR, uncommitted work, an issue implementation, or files they point at.
---

# Code review

Two axes, kept apart so one cannot hide the other:

- **Standards:** does this match how we write code here (and the skills we actually use)?
- **Spec:** if there is a spec, issue, or stated intent, did we do that — and only that?

Run them as **parallel OpenCode `subagent`s** (`agent: "general"`), then show both reports. Do not merge or rerank findings.

This is not only "review the PR that closed #123." The user may point at a branch, a commit, `git diff`, unstaged work, a path, or paste. Pin **that**. If they point at nothing, ask once: working tree vs a ref.

## 1. Pin the change

Whatever they named:

- A ref: `git diff <fixed-point>...HEAD` (three-dot) and `git log <fixed-point>..HEAD --oneline`. Confirm `git rev-parse` and a non-empty diff.
- Uncommitted: `git diff` and `git diff --cached` as they asked.
- Paths or a paste: that is the change. No git required.

Empty change: stop here.

## 2. Spec source — only if there is one

Look, in order, and **skip the Spec axis** if nothing turns up (say so; do not invent a spec):

1. An issue, ticket, or URL they named.
2. Issue refs in the commits (`#123`, `Closes #45`, …). Fetch with `gh` / `glab` / whatever this repo already uses. If `docs/agents/issue-tracker.md` exists, follow it; if not, try `gh` when the remote is GitHub.
3. A path they passed (`docs/…`, a spec file).
4. A spec under `docs/`, `specs/`, or `.scratch/` that matches the branch or feature.

Acceptance criteria, if present, are the checklist. Partial / missing / extra / wrong — quote the criterion.

## 3. Standards sources

Load these with the skill tool **in this session** (the parent), then paste the bits the Standards subagent needs into its brief. The child cannot see your skill list.

Always:

- `codebase-design` — depth, seam, deletion test, no pass-throughs
- `types-and-boundaries` — if the diff touches `.ts` / `.tsx` (or they asked about types)
- `code-simplification` — clutter, speculative generality, wrappers that add nothing
- Fowler smells below (judgement calls; repo docs win; skip what the linter already enforces)

If they exist:

- `CONTEXT.md` / `CONTEXT-MAP.md` → load `domain-modeling` and use those terms
- Repo `AGENTS.md`, `CODING_STANDARDS.md`, `CONTRIBUTING.md`

`prove-it-works` is a **question**, not a rewrite: is there evidence the changed path was actually run, or only that it compiles?

Smell baseline (heuristic, never a hard fail unless the repo says so): Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest.

## 4. Spawn both

**Standards** brief: the change (diff command or pasted hunks); the skill excerpts; repo standard files. Report per hunk: documented-standard breach (cite file + rule) vs smell (name it, quote). Under 400 words.

**Spec** brief: the same change plus the spec/issue text. Report: missing or partial criteria; extra behaviour; looks done but wrong. Quote the spec line. Under 400 words. Skip this subagent if step 2 found nothing.

## 5. Show

`## Standards` and `## Spec` as returned. One-line totals per axis. Do not pick a winner across axes.

A change can be clean TypeScript and still miss the issue. It can hit every criterion and still be a shallow module. That is why there are two headings.
