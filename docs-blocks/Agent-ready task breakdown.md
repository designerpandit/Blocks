# Agent-ready task breakdown

The roadmap tab scopes work by version. That's the right unit for planning, but too big a unit to hand a single Maker agent — it invites exactly the ambiguity the agent instructions tab is built to prevent. This tab slices each version into individual, agent-ready tasks.

## The slicing rule

Slice vertically, not horizontally. A horizontal slice — "write the schema," "write the API route," "write the UI" as three separate tasks — looks small but isn't checkable on its own; the agent has to guess at the other two pieces while writing each one. A vertical slice is small **and** complete: one observable behavior, touching whatever layers it actually needs, with its own test that passes or fails on its own. "The viewport toggle persists across navigation" is a vertical slice. "Build the toolbar" is not.

## How this tab is organized

Phase 1 and Phase 2 — the versions being built first — are broken all the way down below, since that's what's actually actionable right now. Later phases keep the roadmap's existing per-version acceptance criteria as their working scope for now. Break each phase down the same way, in this same format, right before it starts. Writing exhaustive file-level scope lists for code that doesn't exist yet isn't planning, it's guessing — the template at the bottom of this tab is what to run through at that point.

## Phase 1 (v1–v2), broken into agent-ready tasks

### v1 — Fork the core

**Task 1.1 — Establish the fork baseline**

- Behavior: a fresh clone builds and runs, serving Storybook's own existing example stories with zero visual or behavioral difference from upstream
- Satisfies: "renders an existing CSF story set with no visual or behavioral difference from vanilla Storybook"
- Scope: repo root config only (package.json, tsconfig, build config) — no application code
- Prerequisites: none, this is the first task
- Note: this is a baseline-verification task, not feature work; every later task diffs against this known-good state

**Task 1.2 — Verify the Controls addon**

- Behavior: Controls loads and functions unmodified against the forked manager/preview
- Satisfies: part of "at least 3 existing addons load unmodified"
- Scope: none expected — if changes are needed, that itself is a signal to stop and report, since v1's whole promise is zero modification
- Prerequisites: Task 1.1

**Task 1.3 — Verify the Docs addon**

- Same pattern as 1.2, for the Docs addon

**Task 1.4 — Verify the a11y addon**

- Same pattern as 1.2, for the a11y addon

**Task 1.5 — Smoke-test suite over 20+ sample stories**

- Behavior: an automated suite renders 20+ representative stories headlessly and asserts no console errors or render failures
- Satisfies: "full test suite ... passes in CI"
- Scope: a new tests/ or e2e/ directory only
- Prerequisites: 1.1–1.4

**Task 1.6 — Document the upstream security-sync process**

- Behavior: a written, checked-in process describing how to diff the fork against upstream Storybook releases (the automation of this is a separate, later, ongoing task for the Release Agent)
- Satisfies: "a documented process exists for pulling upstream security patches"
- Scope: docs/ only
- Prerequisites: 1.1

### v2 — Own shell and packaging

**Task 2.0 — Backend service skeleton**

- Behavior: a persistent Node/TypeScript backend service boots and responds on a health-check endpoint; nothing else
- Scope: a new `backend/` directory (Fastify, per `docs-blocks/Tech stack.md`'s persistent-Node-process requirement — no Next.js/Vercel, which that doc rules out for this role), plus adding `backend` to the root `package.json` workspaces list
- Prerequisites: v1 complete

**Task 2.1 — Rebrand the manager UI shell, visual only**

- Behavior: the manager UI shows the new name, logo, and colors; no functional change
- Scope: the manager's theme/styling files only, no logic files
- Prerequisites: v1 complete

**Task 2.2 — One-command install and Docker image**

- Behavior: a single command boots a working instance in under 10 minutes on a clean machine
- Satisfies: "a fresh install completes in under 10 minutes ... a versioned Docker image is published"
- Scope: Dockerfile, install script, docs/quickstart.md
- Prerequisites: v1 complete (independent of 2.1, can run in parallel)

**Task 2.3 — Basic accessibility pass on the manager shell**

- Behavior: keyboard navigation and contrast pass against a fixed checklist
- Scope: manager UI files only
- Prerequisites: 2.1

**Task 2.4 — Wire in error tracking, logging, and an uptime check**

- Behavior: an intentionally-thrown test error appears in the tracking dashboard; a log line appears in the log service; an uptime check reports the service as up
- Scope: a new observability/instrumentation module and backend bootstrap config only
- Prerequisites: 2.0 complete (independent of 2.1–2.3, can run in parallel)

## Phase 2 (v3–v4), broken into agent-ready tasks

### v3 — Import wizard

**Task 3.1 — Docgen introspection for a single component**

- Behavior: given one real component file, extracts its props and types correctly
- Scope: a new import-wizard module only
- Prerequisites: v1 complete

**Task 3.2 — Bulk introspection across a whole library**

- Behavior: pointed at a real sample library, produces a working story for at least 90% of exported components with no manual edits
- Scope: import-wizard module
- Prerequisites: 3.1

**Task 3.3 — Failure reporting for un-importable components**

- Behavior: components the wizard can't handle are listed with a specific reason, never silently skipped
- Scope: import-wizard module
- Prerequisites: 3.2

### v4 — Token importer

**Task 4.1 — Parse a single token format (JSON)**

- Behavior: given a real JSON token file, produces a validated internal token representation
- Scope: a new token-importer module only
- Prerequisites: v1 complete

**Task 4.2 — Generate the theme decorator and CSS custom properties**

- Behavior: imported tokens produce a working light/dark toggle in the preview, live, with no page reload
- Scope: token-importer module, preview decorators
- Prerequisites: 4.1

**Task 4.3 — Unsupported-format error handling**

- Behavior: a malformed or unsupported token file fails with a specific, readable error, never a silent skip
- Scope: token-importer module
- Prerequisites: 4.1

## Template: breaking down a future phase

Run this right before a phase starts, not earlier:

1. Copy the version's acceptance criteria verbatim from the Roadmap tab.
2. For each criterion, ask: is this genuinely one observable behavior, or does it hide two or more? Split until each item is a single, independently testable behavior.
3. For each resulting task, write: the one-sentence behavior, which original criterion it satisfies, the exact scope list based on the actual repo layout at that point, and its prerequisites.
4. Anything that can't be scoped precisely yet, because the code it depends on doesn't exist, isn't ready to hand to a Maker agent — that's a sign the phase before it isn't actually finished.
