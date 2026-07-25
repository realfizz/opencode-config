---
description: Remove AI code slop from the current branch
---

Check the diff against the default branch (main/master), and remove AI-generated slop introduced on this branch.

This includes:

- Extra comments a human would not add, or comments inconsistent with the file
- Extra defensive checks or try/catch blocks abnormal for that area (especially on trusted/validated paths)
- Casts to `any` to dodge type issues
- Style inconsistent with the surrounding file
- Unnecessary emoji
- Noisy names, over-abstraction, or dead "just in case" code

Report at the end with only a 1-3 sentence summary of what changed.
