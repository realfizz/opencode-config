---
description: Draft commit messages without committing
subtask: false
---

Same standards as `/commit`, but **don't commit**. Just output the message(s) in chat.

See git diff and git status. Read files when the change isn't yours.

Split into focused commits — one logical change each. Smaller is better. Hunks only if one file mixes unrelated work.

## Messages

Conventional, short, human. Match the voice of recent commits in this repo:

```bash
git log --oneline -15
```

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

## Output

Show each draft as a fenced block the user can copy. One per logical commit. Example:

\`\`\`
feat(config): add shoogle mcp
\`\`\`

\`\`\`
fix(plugins): modernize no-verify blocker
\`\`\`

Do not stage, do not commit, do not run any git command that mutates state. If the diff is empty, say so.
