---
description: File a GitHub issue from chat context
subtask: false
---

Capture something from this session as a single GitHub issue on the current repo. Not a full breakdown (that's `to-issues`) — one bug, idea, or follow-up so you can keep working and fix it later.

Invoking this command IS confirmation. Create it. Do not ask "should I file this?".

## 1. Where

Must be inside a git repo with a GitHub remote:

```bash
git remote -v
gh repo view --json nameWithOwner -q .nameWithOwner
```

If there's no GitHub remote, stop and say so.

## 2. What

Build the issue from, in order:

1. Anything the user wrote after `/issue` (treat as the main signal)
2. Relevant chat context (the bug/idea they just noticed)
3. Light codebase grounding only if needed (file path, error, nearby symbol) — don't go explore the whole tree

One issue. One topic. If they dumped five unrelated things, file separate issues (still without asking).

## 3. Write it

**Title** — short, specific, human. Not conventional-commit format unless it fits naturally.

```
social icons missing focus ring in safari
theme toggle ignores reduced-motion
cache drops entities after map change
```

**Body** — tight. No "I noticed that…", no emdashes, no AI essay.

```markdown
## What
- plain description of the bug/idea
- expected vs actual when it's a bug
- path/symbol if known (`app/_components/hero.tsx`)

## Notes
- only if useful: repro steps, stack snippet, workaround
- skip this section when empty
```

Skip empty sections entirely. No Test plan unless they asked for one. No labels/assignees/milestones unless they said so.

## 4. Create

Heredoc for real newlines:

```bash
gh issue create --title "..." --body "$(cat <<'EOF'
## What
- ...

## Notes
- ...
EOF
)"
```

## 5. Done

Print the issue URL. Stop. Don't start fixing it unless they also asked to fix it.
