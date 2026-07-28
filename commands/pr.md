---
description: Push branch and open a GitHub PR
subtask: false
---

Open a PR for the current work. Do not merge. Invoking this command IS confirmation — just do it.

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

Read enough of the diff to write an honest summary. If the diff is empty and the working tree is clean, stop and say so.

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

Body — exactly this shape, nothing else. No "This PR…", no emdashes, no AI essay:

```markdown
## Summary
- concrete bullet of what changed
- another bullet
- keep it short; paths/symbols when useful

## Test plan
- [ ] thing a human should verify
- [ ] another check
- [ ] include real commands when relevant (`bun test`, `task build`, etc.)
```

Create with a heredoc (real newlines):

```bash
gh pr create --title "..." --body "$(cat <<'EOF'
## Summary
- ...

## Test plan
- [ ] ...
EOF
)"
```

If a PR for this branch already exists, update it (`gh pr edit`) instead of opening a second one.

## 5. Done

Print the PR URL. Stop. Do not merge, do not enable auto-merge, do not request reviewers unless asked.
