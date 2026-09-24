---
name: implement
description: Implement a set of issues or feature slices by coordinating subagents
disable-model-invocation: true
argument-hint: path to issues.md, an issue list, or a feature plan
---

# Implement

Turn a source of issues or feature slices into working, verified code. The main agent coordinates the work: delegate implementation to subagents, combine their results, verify the combined change, and finish with a local commit.

## 1. Establish the source and context

- Use the source supplied by the user. Otherwise, use `issues.md` at the repository root; if it is missing, ask which issues or plan to implement.
- Read the repository's `AGENTS.md` and any relevant `CONTEXT.md`, ADRs, or project documentation before changing code. Follow the existing stack and conventions.
- Inspect the working tree before starting. Keep pre-existing user changes separate from the implementation; commit them separately only when the user asks, and leave them otherwise intact.
- Identify the checks, tests, and real user path relevant to the requested work.

## 2. Partition the work

Read every issue or slice before delegating it. Record its goal, dependencies, acceptance criteria, likely files, and verification steps.

- Use one subagent per issue by default.
- Combine issues into one subagent only when they are small, closely related, and form one coherent change with compatible dependencies and file ownership.
- Respect explicit dependencies. Start independent slices in parallel, and run dependent slices after their blockers are complete.
- Assign file ownership when slices run in parallel. If two slices need the same files or make competing design decisions, sequence them or resolve the overlap before continuing.
- Give every subagent a brief containing the issue, relevant context, owned paths, acceptance criteria, constraints, and required checks. Ask the subagent to read the repository instructions rather than relying on memory.

## 3. Delegate and integrate

- Ask implementation subagents to make the smallest complete change that satisfies their issue, add or update tests where appropriate, run relevant checks, and report changed files, results, and unresolved concerns.
- Keep the parent responsible for integration. Read the actual diffs and command output; do not treat a subagent's summary as proof.
- After each wave, inspect the combined changes, resolve conflicts or missing pieces, and run the checks that make sense at integration boundaries.
- Keep unrelated refactors, new files, and unrequested behavior out of the implementation.
- Keep all commits local; do not push.

## 4. Verify and finish

- Track every issue and acceptance criterion explicitly. Nothing is complete until its requested behavior exists and its relevant checks pass.
- Run the project's tests, typechecks, linters, and other required checks for the touched areas.
- For user-facing work, exercise the real path a user would take and observe the resulting behavior. A successful compile or a subagent's claim is not enough by itself.
- Perform a final review of the combined diff against the source and repository instructions. Fix any findings or leftover gaps before declaring success.
- Commit the completed implementation locally, keeping it separate from unrelated pre-existing work, and report the commits, completed issues, checks, runtime evidence, and anything still unresolved.

## Completion criteria

The run is complete when every in-scope issue is either implemented and verified or explicitly reported as blocked, the combined diff matches the source, required checks and real-user verification have run, remaining gaps are addressed or disclosed, and the implementation has a local commit with no push performed.
