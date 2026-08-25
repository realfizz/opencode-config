---
description: Push branch and open a GitHub PR
subtask: false
---

Open a PR for the current work. Do not merge. Invoking this command IS confirmation — just do it.

The body is for a human (and for git archaeology). Say what landed and why. Do not write a test plan, review map, risk list, or evidence dump.

## 1. Ground yourself

```bash
git status -sb
git remote -v
git branch --show-current
```

Find the base branch (`main` or `master` via `gh repo view --json defaultBranchRef -q .defaultBranchRef.name`).

```bash
git fetch origin
git log --oneline origin/$BASE..HEAD
git diff --stat origin/$BASE...HEAD
git diff origin/$BASE...HEAD
```

Read the diff. If it is empty and the working tree is clean, stop and say so.

## 2. Branch + commits

- If you're on `$BASE` with changes: create a branch. Name it `type/short-kebab` from the work (e.g. `feat/social-links`, `fix/empty-payload`). No slashes beyond that.
- If the working tree is dirty: commit first using the same rules as `/commit` (focused conventional commits, split when needed).
- Never commit secrets. Gitignore junk first.

## 3. Push

```bash
git push -u origin HEAD
```

## 4. PR

Title = one conventional commit line for the whole change (same voice as `/commit`):

```
feat(ui): add social links and clean up structure
fix(api): handle empty payload
```

Body — What + Why. Leftovers only if there are any. No "This PR…", no emdashes, no AI essay, no Test plan / Review / Risk / Evidence.

```markdown
## What
- what actually landed, in product/behavior terms (paths/symbols when that is the change)
- not a file list, not "updated X and cleaned up Y"

## Why
- the problem or constraint this exists for
- anything a reader cannot get from the code: rejected alternative, product rule, "we left X alone on purpose"

## Leftovers
- known holes, follow-ups, out of scope. omit when there are none
```

Create with a heredoc (real newlines):

```bash
gh pr create --title "..." --body "$(cat <<'EOF'
## What
- ...

## Why
- ...
EOF
)"
```

If a PR for this branch already exists, update it (`gh pr edit`) instead of opening a second one. Keep any sections a human already wrote (screenshots, discussion) unless they are now false.

## 5. Done

Print the PR URL. Stop. Do not merge, do not enable auto-merge, do not request reviewers unless asked.
