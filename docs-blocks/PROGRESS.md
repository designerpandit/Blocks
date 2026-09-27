# Progress

A checklist of every task and version in the roadmap. This is the single place to check "what's actually done" without reading git history or re-deriving it from the code.

Every task-level item has two boxes, not one:

```
- [ ] **Task N.N — name**
  - [ ] Checker verified
```

- The top box is checked by the **Maker** once the Maker itself believes the task is complete and has delivered its diff, tests, and note.
- The nested **"Checker verified"** box is checked only by a **Checker** agent, after it has independently reviewed that diff against the task's exact acceptance criteria per the `agent-task-workflow` skill, and passed it.
- **Whenever a Maker checks the top box, that task must go to a Checker before the work is treated as actually done.** A top box checked with its "Checker verified" box still unchecked means: implemented, not yet independently verified — not the same as done.
- Never check either box speculatively, and never check a box for work that only partially satisfies its acceptance criteria — partial progress stays unchecked, with a note if useful.
- Version-level items not yet broken into tasks (most of Phase 3 onward) keep a single box, since there's no diff yet for a Checker to verify — that single box only gets checked once every task under that version has both its boxes checked.

---

## Phase 1 — Foundation (parity clone)

### v1 — Fork the core · Free

- [x] **Task 1.1 — Establish the fork baseline** — fresh clone builds and runs (`yarn install` + `yarn start`), serving Storybook's own example stories with zero visual or behavioral difference from upstream
  - [x] Checker verified
- [x] **Task 1.2 — Verify the Controls addon** — loads and functions unmodified (confirmed alongside 1.1: Controls tab present and functional on the Button story)
  - [x] Checker verified
- [x] **Task 1.3 — Verify the Docs addon** — loads and functions unmodified (confirmed alongside 1.1: Docs page renders for the Button component)
  - [x] Checker verified
- [x] **Task 1.4 — Verify the a11y addon** — loads and functions unmodified (confirmed alongside 1.1: Accessibility tab present on the Button story)
  - [x] Checker verified
- [x] **Task 1.5 — Smoke-test suite over 20+ sample stories** — automated suite renders 20+ representative stories headlessly, asserts no console errors or render failures, passes in CI (`tests/smoke/`, 24 confirmed real story IDs, independently reproduced 24/24 passing locally twice; wired into `.github/workflows/fork-checks.yml` as a new `smoke` job, following that file's existing fork-only pattern)
  - [ ] Checker verified — code and local run confirmed independently, but the "passes in CI" criterion is not yet met: GitHub Actions has never run on this fork (0 runs recorded) because Actions are disabled by default on forks that arrive with existing workflow files. Awaiting the human enabling Actions on github.com/designerpandit/Blocks/actions, then a real green run of the `smoke` job before this box is checked.
- [x] **Task 1.6 — Document the upstream security-sync process** — written, checked-in process for diffing the fork against upstream Storybook releases (`docs-blocks/upstream-security-sync.md`)
  - [x] Checker verified — every criterion checked against the diff, including a fact-check that upstream's default branch is actually `next` as the doc claims

### v2 — Own shell and packaging · Free

- [ ] **Task 2.1 — Rebrand the manager UI shell, visual only**
  - [ ] Checker verified
- [ ] **Task 2.2 — One-command install and Docker image**
  - [ ] Checker verified
- [ ] **Task 2.3 — Basic accessibility pass on the manager shell**
  - [ ] Checker verified
- [ ] **Task 2.4 — Wire in error tracking, logging, and an uptime check**
  - [ ] Checker verified

## Phase 2 — Get an existing library in fast

### v3 — Import wizard · Free

- [ ] **Task 3.1 — Docgen introspection for a single component**
  - [ ] Checker verified
- [ ] **Task 3.2 — Bulk introspection across a whole library**
  - [ ] Checker verified
- [ ] **Task 3.3 — Failure reporting for un-importable components**
  - [ ] Checker verified

### v4 — Token importer · Free

- [ ] **Task 4.1 — Parse a single token format (JSON)**
  - [ ] Checker verified
- [ ] **Task 4.2 — Generate the theme decorator and CSS custom properties**
  - [ ] Checker verified
- [ ] **Task 4.3 — Unsupported-format error handling**
  - [ ] Checker verified

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
