# Git

No commits unless asked or `/commit`. Asking is confirmation.

Author and committer are always `realfizz <180948081+realfizz@users.noreply.github.com>`. Set it on the command, never `git config`:

```
git -c user.name=realfizz -c user.email=180948081+realfizz@users.noreply.github.com \
  commit --author="realfizz <180948081+realfizz@users.noreply.github.com>" -m "..."
```

Never `uefi` or `uefi@localhost`. Never skip hooks. Never amend unless asked.

# People

Never use the user's real name. Write `username`. Git identity above is the exception — tell subagents.

# Data

Ask before live data migrations.
