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
  - [x] Checker verified — Actions enabled on the fork; first real CI run (36336904459) failed on immutable-lockfile enforcement rejecting the sandbox's own `yarn install` (same issue `generate-sandboxes.yml` already solves via `YARN_ENABLE_IMMUTABLE_INSTALLS=false`); fixed the same way, and the follow-up run (36338446150) has the `v1 Smoke Test (sample stories)` job passing for real in CI.
- [x] **Task 1.6 — Document the upstream security-sync process** — written, checked-in process for diffing the fork against upstream Storybook releases (`docs-blocks/upstream-security-sync.md`)
  - [x] Checker verified — every criterion checked against the diff, including a fact-check that upstream's default branch is actually `next` as the doc claims

### v2 — Own shell and packaging · Free

- [x] **Task 2.0 — Backend service skeleton** — new `backend/` workspace (Fastify, TypeScript) boots via `node src/index.ts` and responds `{"status":"ok"}` on `GET /health`; verified locally with `curl`. `backend` added to root `package.json` workspaces list. No Docker, CI, or observability wiring — out of scope for this task.
  - [x] Checker verified — all 4 acceptance points re-verified independently (boots, responds 200, persistent process, nothing else added); flagged and fixed one negative-space issue: `start` script carried an unnecessary `--experimental-strip-types` flag contradicting AGENTS.md's documented Node 22.22.3 type-stripping behavior — removed, re-confirmed working without it.
- [x] **Task 2.1 — Rebrand the manager UI shell, visual only** — manager sidebar shows brand title "Blocks", a placeholder logo, and a dark Airbnb/Resend-style palette (coral accent on near-black); no manager logic touched. `code/.storybook/manager.tsx` (theme config only) + new `code/.storybook/blocks-logo.svg` asset. Verified manually in the internal Storybook UI: Controls, Accessibility, and story rendering all still function unmodified.
  - [x] Checker verified — independently reproduced in a live internal Storybook run (`yarn storybook:ui`, port 6007): brand title, logo, and dark/coral palette render correctly; sidebar navigation, story selection, and the Controls/Actions/Interactions addon panels all still function. Diff touches only `code/.storybook/manager.tsx` (theme config, no logic lines changed) and the new logo asset — scope respected, no functional change.
- [x] **Task 2.2 — One-command install and Docker image** — `Dockerfile` (backend-only image), `install.sh`, `docs/quickstart.md`; scope widened with explicit user approval to add `.dockerignore` and `.github/workflows/publish-image.yml` (builds, health-checks, and publishes on a `blocks-v*` tag push). Image published at `ghcr.io/designerpandit/blocks:0.2.0`, pinned in `docs/quickstart.md` and `install.sh`, no `latest` tag. Verified locally: clean Docker state (`docker system df` showed 0 images/containers/cache), ran the documented one-liner (`curl -fsSL .../install.sh | sh`) end to end, wall time 21.825s, independent `curl localhost:3001/health` → `{"status":"ok"}`.
  - [x] Checker verified — both criteria independently confirmed: fresh install on a clean Docker state completes in ~22s (well under 10 minutes), and the pinned image resolves via an anonymous `docker manifest inspect ghcr.io/designerpandit/blocks:0.2.0`. Scope respected (only the 5 approved files touched); no negative-space issues (no `latest` tag, no unrelated changes, loud failure on health-check timeout).
- [x] **Task 2.3 — Basic accessibility pass on the manager shell** — 10-item keyboard-navigation and contrast checklist (`code/.storybook/accessibility-checklist.md`) run against the manager shell; all 10 pass. The one initial failure (button/input/app border contrast ≈1.25–1.31:1, inherited from upstream's `hsl(0 0% 100% / 0.1)`) was fixed by overriding `appBorderColor`, `buttonBorder`, `inputBorder` to `#666666` (≈3.2–3.45:1) in `code/.storybook/manager.tsx`; verified in the live UI. Awaiting Checker.
  - [x] Checker verified — all 8 contrast ratios in the checklist recomputed independently and match exactly (text 18.16/16.90, muted 7.57/7.04, coral 5.63/5.24, borders 3.45/3.21). Live run (`yarn storybook:ui`): real Tab presses moved through 18 stops with no trap and `:focus-visible` on each; focused Controls input shows a coral ring vs `#666666` unfocused; 0 elements still use the old `hsl(0 0% 100% / 0.1)` border. Diff to `manager.tsx` is three border values only. Scope note: `accessibility-checklist.md` sits in `code/.storybook/` beside `manager.tsx` — the criterion requires a fixed checklist and no in-scope location existed, so passed, but flagged for human sign-off.
- [ ] **Task 2.4 — Wire in error tracking, logging, and an uptime check** — **BACKLOG (deferred by human, 2026-09-28).** Blocked on missing prerequisites, not started: no chosen error-tracking/log/uptime services or accounts, and no deployed backend for an external uptime check to ping. v2 cannot be fully closed until this is done.
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
