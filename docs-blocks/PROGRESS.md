# Progress

A checklist of every task and version in the roadmap. This is the single place to check "what's actually done" without reading git history or re-deriving it from the code.

**Rule for every agent (Maker or Checker): after a task passes review and is merged, check its box here in the same change, or in an immediate follow-up commit. An unchecked box means the task is not done, regardless of what any other doc or comment claims.**

Do not check a box speculatively, and do not check a box for work that only partially satisfies its acceptance criteria — partial progress stays unchecked, with a note if useful.

---

## Phase 1 — Foundation (parity clone)

### v1 — Fork the core · Free

- [x] **Task 1.1 — Establish the fork baseline** — fresh clone builds and runs (`yarn install` + `yarn start`), serving Storybook's own example stories with zero visual or behavioral difference from upstream
- [x] **Task 1.2 — Verify the Controls addon** — loads and functions unmodified (confirmed alongside 1.1: Controls tab present and functional on the Button story)
- [x] **Task 1.3 — Verify the Docs addon** — loads and functions unmodified (confirmed alongside 1.1: Docs page renders for the Button component)
- [x] **Task 1.4 — Verify the a11y addon** — loads and functions unmodified (confirmed alongside 1.1: Accessibility tab present on the Button story)
- [ ] **Task 1.5 — Smoke-test suite over 20+ sample stories** — automated suite renders 20+ representative stories headlessly, asserts no console errors or render failures, passes in CI
- [ ] **Task 1.6 — Document the upstream security-sync process** — written, checked-in process for diffing the fork against upstream Storybook releases

### v2 — Own shell and packaging · Free

- [ ] **Task 2.1 — Rebrand the manager UI shell, visual only**
- [ ] **Task 2.2 — One-command install and Docker image**
- [ ] **Task 2.3 — Basic accessibility pass on the manager shell**
- [ ] **Task 2.4 — Wire in error tracking, logging, and an uptime check**

## Phase 2 — Get an existing library in fast

### v3 — Import wizard · Free

- [ ] **Task 3.1 — Docgen introspection for a single component**
- [ ] **Task 3.2 — Bulk introspection across a whole library**
- [ ] **Task 3.3 — Failure reporting for un-importable components**

### v4 — Token importer · Free

- [ ] **Task 4.1 — Parse a single token format (JSON)**
- [ ] **Task 4.2 — Generate the theme decorator and CSS custom properties**
- [ ] **Task 4.3 — Unsupported-format error handling**

## Phase 3 — Designer-friendly browsing

- [ ] **v5 — Designer-friendly browsing view** · Free — not yet broken into tasks (see the task breakdown doc's template; run it right before this phase starts)
- [ ] **v6 — See every variant at a glance** · Free — not yet broken into tasks
- [ ] **v7 — Global viewport and theme switching** · Free — not yet broken into tasks

## Phase 4 — Guidance layer and first audit

- [ ] **v8 — Guidance layer and agentic guidance file** · Free — not yet broken into tasks
- [ ] **v9 — Accessibility audit** · Free — not yet broken into tasks

*Free tier is feature-complete once v9 is checked.*

## Phase 5 — Collaboration (first paid tier)

- [ ] **v10 — Pinned comments** · Pro — not yet broken into tasks
- [ ] **v11 — Notifications and subscriptions** · Pro — not yet broken into tasks
- [ ] **v12 — Usage and adoption analytics** · Pro — not yet broken into tasks

## Phase 6 — Deeper audits and the Figma bridge

- [ ] **v13 — Visual regression audit** · Pro — not yet broken into tasks
- [ ] **v14 — Token-drift lint** · Pro — not yet broken into tasks
- [ ] **v15 — One-way Figma publish** · Pro — not yet broken into tasks
- [ ] **v16 — Figma ↔ code drift detection** · Pro — not yet broken into tasks

## Phase 7 — Low-code editor (draft-only, nothing writes to git yet)

- [ ] **v17 — Composition canvas v1, preview only** · Pro — not yet broken into tasks
- [ ] **v18 — Composition persistence and code export** · Pro — not yet broken into tasks
- [ ] **v19 — Visual prop and token editing UI, sandbox only** · Pro — not yet broken into tasks

## Phase 8 — Write access to GitHub (highest-trust tier)

- [ ] **v20 — Scoped GitHub write access** · Enterprise — not yet broken into tasks
- [ ] **v21 — Branch and PR automation** · Enterprise — not yet broken into tasks
- [ ] **v22 — CI review gate** · Enterprise — not yet broken into tasks
- [ ] Paid outside security review commissioned before this phase ships for real (see Cost of building)

## Phase 9 — AI agent

- [ ] **v23 — AI agent v1: explain and draft** · Pro — not yet broken into tasks
- [ ] **v24 — AI agent v2: prompt-to-composition and PR review** · Enterprise — not yet broken into tasks

## Phase 10 — Org-scale maturity

- [ ] **v25 — Enterprise governance** · Enterprise — not yet broken into tasks
- [ ] Second paid outside security review commissioned before this phase is offered to real enterprise customers

## Phase 11 — Agent manifest and MCP server

- [ ] **v26 — Agent manifest and MCP server** · Pro — not yet broken into tasks

---

## One-time human setup (from the Implementation plan)

- [x] Create the GitHub repository the fork lives in (`designerpandit/Blocks`, forked from `storybookjs/storybook`)
- [x] Decide where agent definitions live (`.claude/` in the repo root, plus `docs-blocks/` for the roadmap docs)
- [ ] Set up a Claude subscription tier appropriate to the current build phase
- [ ] Choose a hosting provider account (deferred until a phase that needs it — Phase 2+)
- [ ] Choose a database and object storage provider (deferred until a phase that needs it)
- [ ] Register a domain
- [ ] Set up a password manager or secrets vault
