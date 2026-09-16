---
description: Push the branch and open or update a GitHub PR
subagent: false
---

Same house style as /commit. For this command the default is a PR: commit if dirty, push, `gh pr create` or `gh pr edit`, print the URL. Do not merge.

$ARGUMENTS

!`git status -sb && git diff --stat && git diff && git log --oneline -15 && git branch --show-current && git remote -v`

Follow ~/.config/opencode/commands/commit.md for messages, splits, `git commit -m`, branching, push, and the What/Why/Leftovers PR body.
