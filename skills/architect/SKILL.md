---
name: architect
description: Sketch caller usage, types, and module shape before filling in code. Use when the user wants to architect a change, design a module, or jumping to code would lock the wrong shape.
metadata:
  opencode/autoinvoke: false
---

# Architect

Design before implementing. Caller usage first, then types and the module map. Two structurally different sketches. If implementation proves the sketch wrong, throw it out.

Load `codebase-design` (vocabulary) and `types-and-boundaries` (seams and types) before sketching. If `CONTEXT.md` exists, load `domain-modeling` and use those terms.

Use OpenCode `subagent` (`agent: "general"`) for parallel sketches. Do not invent Cursor Task / AskQuestion tools.

## 1. Ground

Read the callers and the modules this change will touch. Naming a file is not grounding. Skip only when the work is greenfield with no surrounding system.

**Done when:** you can name the callers, the seam, and what must stay hidden.

## 2. Sketch twice

Write the **caller's usage** first. Derive types and signatures from that. Bodies stay `not implemented` / pseudocode.

Produce **two structurally different** designs (not point-fixes inside one shape). Prefer two `subagent` runs in parallel with different constraints, e.g. "minimise the interface" vs "optimise the common caller." Sequential is fine if fan-out is unavailable.

Each sketch includes: usage, types/signatures, module map (what is the module, where is the seam, what adapters), and why.

Screen both with `codebase-design`: reject shallow modules, pass-throughs, leaked internals, one-adapter "seams." Prefer more behaviour behind a smaller interface.

**Done when:** two distinct sketches exist and one is chosen, with the reason written down.

## 3. Agree

**Stop and show the chosen sketch.** Do not implement until the user signs off, unless they explicitly said to proceed.

## 4. Fill in

Replace stubs against the sketch as contract. A new parameter, cast, or extra branch the sketch did not anticipate is a signal: say whether the sketch was wrong or the implementation is overreaching.

## 5. Scrap

Scrap on a **pattern**, not one edge case:

- the same workaround in unrelated places
- types that need `any`, casts, or always-set optionals
- callers that must know internal rules
- two independent deviations of the same shape

Then re-ground, sketch a **smaller** shape than the last one, and fill in again.

## Output

One file of types and signatures for a small change; module map plus types for a larger one. Usage sketch on top.
