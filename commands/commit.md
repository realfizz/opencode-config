---
description: Commit the current work, or draft messages / push / open a PR
subagent: false
---

House style for git on this machine. Invoking /commit is confirmation to do what was asked.

$ARGUMENTS

If that text is empty: commit now as focused conventional commits. Do not push. Do not open a PR.
Read it as English. Typical asks: draft (messages only), single commit, push, PR.
Draft means do not stage, commit, or push — only print messages.
If they asked to draft and also to push or open a PR, draft wins.
PR implies commit if dirty, push, then `gh pr create` or `gh pr edit`. Print the URL. Do not merge.

## Look first

!`git status -sb && git diff --stat && git diff && git log --oneline -15`

Gitignore junk and secrets (node_modules, build output, .env). Leave unrelated dirty files alone unless they said otherwise. If there is nothing to do, say so and stop.

## Messages

Conventional, short, human. Match recent commits in this repo.

```
feat(auth): add session refresh
fix(api): handle empty payload
refactor(ui): simplify layout
docs: clarify install steps
chore: ignore build output
```

`type(scope): summary` or `type: summary`. Types: feat, fix, refactor, docs, style, chore, test, perf.
Lowercase, no trailing period, one line. No fluff, no "this commit". Never amend unless asked.

If drafting: one fenced block per message, copyable. Stop.

## If committing

`git commit -m`. Never an editor. Never `--no-verify`. Split into focused commits unless they asked for a single commit. Hunks only if one file mixes unrelated work.

## If pushing

`git push -u origin HEAD`. If on the default branch with local commits or a dirty tree, branch first: `type/short-kebab` (e.g. `feat/social-links`). No extra slashes.

## If a PR

Title = one conventional line for the whole change.

```markdown
## What
- what landed, in product/behavior terms (paths/symbols when that is the change)
- not a file list

## Why
- the problem or constraint this exists for
- anything a reader cannot get from the code

## Leftovers
- known holes, follow-ups, out of scope; omit when there are none
```

```bash
gh pr create --title "..." --body "$(cat <<'EOF'
## What
- ...

## Why
- ...
EOF
)"
```

If a PR for this branch already exists, `gh pr edit` instead of opening a second one. Keep sections a human already wrote unless they are now false.
Print the PR URL. Stop. Do not merge, do not enable auto-merge, do not request reviewers unless asked.
