---
name: implement-issues
description: Orchestrates implementation from an issues file using subagents only—parallel by dependency, strict verify/fix until every acceptance criterion is met. Use when the user tags implement_issues or says work through / execute an issues file (any path or name).
---

# Implement Issues

Read the user’s **issues file** (any path/name). Infer issues, dependencies, and acceptance criteria from the file—same shape as `to-issues` output is fine. You **orchestrate only**: delegate with `task`, never implement product code yourself.

## Loop

1. **Waves** — Dispatch ready issues in parallel (respect blockers). Each worker: skill `implement`, full end-to-end for that issue, no TODOs/stubs/fallbacks, repo validation green for its scope.
2. **Verify** — When a wave or the full set is done, spawn subagents in parallel: deep pass against the issues file + diff (every AC, completeness), and `review` with the issues file as spec.
3. **Fix** — Any gap, any size → fix subagent(s), then verify again. Repeat until clean and project validation passes.

HITL issues: skip unless the user says go.

Same blocker after 3 verify/fix rounds → stop and report.

## Done

Every issue satisfied, verifiers clean, validation passes. Brief summary for the user.