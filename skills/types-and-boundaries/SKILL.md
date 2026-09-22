---
name: types-and-boundaries
description: Typed seams for TypeScript. Parse at system edges, make illegal states unrepresentable, trust types inside. Use when writing or reviewing .ts/.tsx, designing a signature, validating input, or wiring CLI/HTTP/config/DB adapters.
---

# Types and boundaries

Two rules, one skill: **parse at the seam**, **construct illegal states out of existence**. Load `codebase-design` if you need module / interface / depth / seam vocabulary.

A **system seam** here is a Feathers seam that also crosses trust: CLI args, HTTP, config, env, DB rows, RPC. Say **seam**, not "boundary."

## Seams

- **At the seam:** validate, parse into a named domain type, return errors, keep adapters thin.
- **Inside:** trust types. No re-validation, no nil-checks that the parse already proved, no re-exported wire/DB/framework types on a module's interface.
- **Logic:** pure functions the shell calls. Parse is a pure transform from `unknown` to a domain type.

Tests: "Is this data crossing a system seam right now?" If not, skip the guard. "Can this be a pure function the shell just calls?" If yes, extract it.

## Types (TypeScript)

- **Discriminated unions**, not optional-field bags. `{ kind: "open" } | { kind: "done"; at: Date }` beats `{ completed?: boolean; completedAt?: Date }`.
- **Construct** the legal value: non-empty is `[T, ...T[]]`, a range is `start` + `duration`. Do not carve it out of a looser type with a runtime wish.
- **Brand** primitives that mean different things (`UserId` vs `OrderId`). Validate once at the seam.
- **Keep `T[]` total.** Strengthen (non-empty, etc.) only where the loose type forces `!`, a cast, or a "should never happen" throw.
- External data is **`unknown`**. Parse it with Zod. Look up current docs first and use a built-in (`z.httpUrl()`, `z.email()`, `z.creditCard()`, `z.iso.datetime()`, and the rest) before composing a schema. Do not hand-write the check.
- No lying `as`. Cast only after a parse. Prefer `satisfies`. Narrowing order: discriminant switch > `in` > `typeof`/`instanceof` > honest `isX` guard > `as`.
- Exhaust: `const _exhaustive: never = x` in the default arm.
- Derive with `Pick` / `Omit` / `Parameters` / `ReturnType` / `Awaited` / `typeof` before a new interface.
- Object args except hot paths.

If a comment is required to explain when a field combination is valid, the type is too loose. Split it.

## Done

Every new public signature is a domain type or a parse result. Wire types stop at the seam. No new `any` / unjustified `as` in the diff.
