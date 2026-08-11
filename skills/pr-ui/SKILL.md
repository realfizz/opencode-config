---
name: pr-ui
description: Create or update a GitHub pull request for UI changes with desktop and mobile before-and-after screenshots. Use when a change affects layout, styling, colors, components, animation, or responsive behavior.
allowed-tools: Bash, Read, Grep
---

# UI Pull Request

Follow the normal PR workflow with visual evidence. Use `/pr` for changes with no meaningful visual output.

## Contract

- **Before:** `origin/$BASE`.
- **After:** the current worktree, including uncommitted changes.
- Never switch branches, stash changes, merge, enable auto-merge, or request reviewers.
- Keep captures out of the repository. Store them in a temporary directory.
- Upload only non-sensitive captures to the public Blob store.

## Workflow

1. Read `commands/pr.md`. Inspect `git status -sb`, the remote, current branch, default branch, and `git diff origin/$BASE...HEAD`.
2. If the diff has no UI-facing changes, stop and recommend `/pr`.
3. Infer the smallest affected route set. Ask for routes only when the diff does not establish them.
4. Establish matching Before and After URLs. Prefer an existing base deployment and the current preview/local server. Otherwise create a detached worktree from `origin/$BASE`; never replace the current worktree.
5. If the base worktree needs dependencies, install them there before starting its server. Start both servers only after their dependencies are available, then verify each URL with `curl`.
6. Preflight Blob uploads:

   ```bash
   command -v vercel
   test -n "$BLOB_READ_WRITE_TOKEN"
   vercel blob list
   ```

   The store must be public. Do not use another host or a fallback.

7. Capture every affected route at desktop (`--size 1440x900`) and mobile (`--mobile`) unless mobile is genuinely unsupported or explicitly excluded. Use `--full` only for page-length changes. Capture without `--markdown`:

   ```bash
   npx --yes @vercel/before-and-after \
     "<before-url>/<route>" "<after-url>/<route>" \
     --size 1440x900 --output "$CAPTURE_DIR/<route>/desktop"

   npx --yes @vercel/before-and-after \
     "<before-url>/<route>" "<after-url>/<route>" \
     --mobile --output "$CAPTURE_DIR/<route>/mobile"
   ```

8. For each route and viewport, run `scripts/upload-screenshots.sh` from this skill directory against the matching Before and After PNGs. Add its Markdown table to the PR body under:

   ```markdown
   ## Before and After

   ### Dashboard — desktop

   | Before | After |
   |:------:|:-----:|
   | ![Before](...) | ![After](...) |
   ```

9. Capture before committing. Follow `commands/pr.md` to commit, push, and create or update the PR. Preserve an existing PR body and replace its `## Before and After` section. Print the PR URL and stop.

## Upload failures

The helper uploads with `vercel blob put --access public --add-random-suffix true`, then follows each URL and requires an `image/*` content type. If the token, CLI, upload, or validation fails, stop before creating or updating the PR and report the exact error.
