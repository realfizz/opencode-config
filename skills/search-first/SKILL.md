---
name: search-first
description: Look for libraries, docs, and reference repos before writing custom code. Use when adding a helper, picking a library, learning an API, or checking how others solved the same problem.
---

# Search first

Someone has probably already solved this. Prefer a library over a hand-rolled implementation: less for us to review, and they maintain the edge cases. A package that shipped last week is fine. "Early," "unstable," or "not compatible with Bun/modern runtimes" is not a reason to skip it unless you have actually seen it fail. Five GitHub stars and no README is a smell. A few weeks old with real docs is not.

This is for **choosing libraries**, **reading their APIs**, and **finding how other people implemented the same shape of thing**. Not a report template. Come back with a recommendation and enough evidence that we could act on it.

## Look

Use whatever can actually answer the question:

- **Web search** for options, official docs, and "how do people do X."
- **`gh search repos`** and **`gh search code`** for libraries and for copyable implementations.
- Clone under `tmp/` (or the repo's usual scratch dir) when you need the real API, not a guess. Read their README, examples, and types. Do not invent the surface from memory.
- Any MCP that is actually connected. **Context7** is the one for library docs (resolve the library, then query). If it is not connected, skip it; do not stall. Web search and a clone still work.

Search this repo first. If we already depend on something that does the job, use that.

## Prefer

Explore the field, not the first hit. For something like a job queue, look at the current options and say which one fits, not that queues are hard so we should write our own.

Favour **adopting** a library. A thin adapter at our seam is fine. Building it ourselves is the exception: the problem is genuinely ours, or nothing out there matches after you looked.

When you use a library, follow **its** docs and examples, not a pattern from another stack.

## Come back with

What you would use (or that we should build, and why), where you looked, and a couple of reference repos or code hits if they exist. Keep it short.
