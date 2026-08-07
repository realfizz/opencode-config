---
name: to-linear
description: Create Linear issues from a plan, idea, or conversation. Not development-specific — research, ops, product, anything. Use when user wants to file Linear issues, single or multiple.
---

# To Linear

Create Linear issues from context. One or many — depends what the user asks for.

## Process

### 1. Gather context

Work from the conversation. If the user passes a Linear issue URL or ID, fetch it via Linear MCP.

### 2. How many

- User asked for one issue → create one
- User asked to break down a plan → draft a breakdown, quiz them, then create

### 3. Draft (if multiple)

Break into independently-grabbable chunks. Present as a numbered list:

- **Title** (proper English, title case)
- **Blocked by**: other issues if any
- **Why separate**: one sentence

Ask if granularity and dependencies look right. Iterate.

### 4. Titles

Proper English, title case. Specific.

```
Social Icons Missing Focus Ring in Safari
Research Hosting Options for Internal Dashboard
Migrate Auth to Better-Auth
```

### 5. Create

Use Linear MCP. Default priority Medium. Don't assign, label, or close anything unless asked. Print issue URLs.
