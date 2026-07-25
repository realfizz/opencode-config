---
description: Commit changes in focused conventional commits
subtask: false
---

See git diff and git status. Gitignore junk first (node_modules, build output, secrets, .env).

Understand the diff. Read files when the change isn't yours.

Split into focused commits — one logical change each. Smaller is better. Hunks only if one file mixes unrelated work.

## Messages

Conventional, short, human:

```
feat(auth): add session refresh
fix(api): handle empty payload
refactor(ui): simplify layout
docs: clarify install steps
chore: ignore build output
```

- `type(scope): summary` or `type: summary`
- types: feat, fix, refactor, docs, style, chore, test, perf
- lowercase, no trailing period, one line
- no fluff, no "this commit"
- never amend unless asked

## Go

Invoking this command IS confirmation. Commit now. Leave unrelated dirty files alone unless told to commit all.
