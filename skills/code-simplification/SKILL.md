---
name: code-simplification
description: Reduce complexity while preserving exact behavior. Use when code works but is harder to read than it should be, after a feature is green, or when reviewing accumulated clutter.
metadata:
  opencode/autoinvoke: false
---

# Code simplification

Same behavior, less to learn. Not fewer lines. Load `codebase-design` if depth / seam / deletion test is in play. Load `types-and-boundaries` for TypeScript diffs. After the pass, load `prove-it-works`.

## Guardrails

- Preserve outputs, errors, side effects, and ordering. Existing tests pass **without** editing them.
- Match this repo's conventions, not an imported style.
- Scope is the current change unless the user widens it.
- Chesterton's fence: know why it exists (callers, tests, git history) before removing it.
- **Deletion test:** if deleting a helper makes complexity vanish, it was a pass-through — inline it. If complexity reappears across callers, keep it.
- Do not extract shallow wrappers "for testability." Do not strip error handling to look clean.

## Scan

| Signal | Move |
|---|---|
| Nesting 3+ | Guard clauses |
| Nested ternaries | if/else or a lookup |
| Boolean flags `doThing(true, false)` | Options object or two functions |
| `data` / `tmp` / `val` | Name the domain thing |
| Comments that narrate `count++` | Delete the comment |
| Duplicated 5+ lines | One function if it names a concept |
| Dead / commented-out | Remove after confirming |
| Wrapper that adds nothing | Inline |

One simplification, then tests. Split refactor commits from feature commits.

## Done

Tests unchanged and green. `prove-it-works` ran on the user path. Diff is reviewable. A new reader would understand it faster.
