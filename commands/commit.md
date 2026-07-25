---
description: Commit changes in focused conventional commits
subtask: false
---

See git diff and git status. If there are files that should not be tracked (node_modules, build output, lockfile noise, secrets, .env) add them to .gitignore first.

Understand the diff. Read relevant files when the diff is from work you did not author.

Split into focused commits. Each commit is one logical change. Group by feature/fix area; use hunks only when one file mixes unrelated work. Prefer smaller commits over a 1000-line blob.

## Message style

Conventional commits, short and human. Match this repo's voice:

```
feat(sdk): add dayz engine offsets and types
fix(formatting): remove stupid clang tidy check yapping about pragma once usage
refactor(render): simplify overlay
docs: extend agents.md rules
chore: update .gitignore
style: reformat memory and overlay pointers
```

Rules:
- `type(scope): summary` when scope helps; `type: summary` when it does not
- types: feat, fix, refactor, docs, style, chore, test, perf
- summary is lowercase, imperative feel, no trailing period
- keep it short; one line unless the body is truly needed
- no PR fluff, no "this commit", no AI essay
- never amend unless asked; never rewrite history

## Execution

NEVER ask for confirmation before committing. Invoking this command IS confirmation. Commit immediately after reviewing the diff. Only commit your intended changes; leave unrelated dirty files alone unless the user said commit all.
