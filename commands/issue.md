---
description: File a GitHub issue from this chat
subagent: false
---

File it. Don't ask. One topic on the current repo so we can keep moving.

$ARGUMENTS

Need a GitHub remote. If there isn't one, stop.

```
git remote -v
gh repo view --json nameWithOwner -q .nameWithOwner
```

Title and body like a person would write. What they typed after `/issue` is the main signal; use this chat for the rest. Path or error if we already have it — don't go exploring.

If they dumped unrelated things, file separate issues.

```
gh issue create --title "..." --body "$(cat <<'EOF'
...
EOF
)"
```

Print the URL. Don't start fixing it unless they asked.
