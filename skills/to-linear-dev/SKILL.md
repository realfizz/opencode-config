---
name: to-linear-dev
description: Break a development plan, spec, or PRD into Linear issues using tracer-bullet vertical slices. Use when user wants to convert a dev plan into Linear tickets, create implementation issues, or break down engineering work.
---

# To Linear (Dev)

Break a dev plan into Linear issues using vertical tracer-bullet slices.

## Process

### 1. Gather context

Work from the conversation. If the user passes a Linear issue URL or ID, fetch it via Linear MCP. Explore the codebase if needed — issue titles should use the project's domain language.

### 2. Draft vertical slices

Each issue is a thin vertical slice that cuts through all layers end-to-end (schema, API, UI, tests), not a horizontal layer.

Slices are HITL (needs human decision) or AFK (can be built and merged without interaction). Prefer AFK.

Present as a numbered list. For each:
- **Title** (proper English, title case)
- **Type**: HITL / AFK
- **Blocked by**: other slices if any
- **User stories covered**: if the source has them

Ask if granularity, dependencies, and HITL/AFK marks look right. Iterate.

### 3. Create

Use Linear MCP to create each issue in dependency order. Each issue description should include:

- **Context**: why this exists
- **What to build**: end-to-end behavior, not layer-by-layer
- **Acceptance criteria**: verifiable checklist
- **Blocked by**: real issue IDs or "None"

Default priority Medium. Don't assign unless asked. Don't close parents.
