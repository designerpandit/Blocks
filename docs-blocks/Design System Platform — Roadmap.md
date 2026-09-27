# Design System Platform — Roadmap (v1–v25)

Sep 21, 2026 · @Anshuman

## Overview

This roadmap ships one real, stable capability at a time, starting from a faithful fork of Storybook rather than a rewrite. Each version should be shippable, tested and genuinely useful on its own — nothing here is a stepping stone that only makes sense once three future versions exist.

The tiers follow a Metabase-style split. Everything through v9 is free and self-hostable, a complete and credible tool on its own. Pro adds collaboration, deeper audits, the one-way Figma bridge, and the low-code editor in draft mode. Enterprise is reserved for anything that writes back into source control, plus org-wide governance (SSO, audit logs, permissions at scale) — the highest-trust, highest-support-cost capabilities.

## Phase 1 — Foundation (parity clone)

Goal: prove the fork is stable and trustworthy before changing anything about the paradigm.

#### v1 — Fork the core · Free

Ships: manager, preview and channel forked from Storybook; Storybook's builders (Vite/Webpack) and docgen packages reused unchanged; addon-API compatible. Acceptance criteria:

- Renders an existing CSF story set with no visual or behavioral difference from vanilla Storybook
- At least 3 existing Storybook addons (Controls, Docs, a11y) load without modification
- Full test suite, including a smoke pass over 20+ sample stories, passes in CI
- A documented process exists for pulling upstream Storybook security patches into the fork, even before the first real sync happens

#### v2 — Own shell and packaging · Free

Ships: rebranded manager UI (visual identity only, no functional change), Docker image, one-command self-host install. Acceptance criteria:

- A fresh install completes in under 10 minutes on a clean machine, per a documented quickstart
- Manager UI passes a basic accessibility check (keyboard navigation, contrast)
- A versioned Docker image is published and pinned in the docs
- Basic error tracking, structured logging, and an external uptime check are wired in before the first real deployment

## Phase 2 — Get an existing library in fast

#### v3 — Import wizard · Free

Ships: bulk docgen introspection over an existing component package; auto-generates CSF files and argTypes. Acceptance criteria:

- Running the wizard against a real React/TS component library generates a working story for at least 90% of exported components with no manual edits
- Generated argTypes match the component's actual prop types, spot-checked against existing docs
- The wizard reports which components it couldn't auto-generate, and why

#### v4 — Token importer · Free

Ships: ingest existing JSON or Style Dictionary tokens; auto-generate a theme decorator and CSS custom properties; theme switcher in the toolbar. Acceptance criteria:

- Importing a real token file produces a working light/dark or brand toggle with no manual CSS
- Token values update every story live when switched, with no page reload
- Unsupported token formats fail with a clear, specific error message

## Phase 3 — Designer-friendly browsing

#### v5 — Designer-friendly browsing view · Free

Ships: a way to browse components that's friendly to non-engineers, with a toggle to see the underlying code from any view. The exact layout and interaction pattern is left to product and design. Acceptance criteria:

- A visual preview of each component is available without a manual screenshot step
- Switching between views keeps the current selection
- "View code" shows the exact story source, not a simplified approximation

#### v6 — See every variant at a glance · Free

Ships: a way to see a component's key prop combinations without opening one story at a time. The exact presentation is left to product and design. Acceptance criteria:

- A component with 2 enum props shows all combinations correctly with no manual story-writing
- The view loads in under 2 seconds for a component with up to 20 combinations
- Selecting any combination opens that exact variant as its own story

#### v7 — Global viewport and theme switching · Free

Ships: a way to switch viewport size and theme (light/dark/wrand) that applies across all stories. The exact control placement is left to product and design. Acceptance criteria:

- Switching viewport or theme persists across navigation between stories
- Works with the token importer from v4 with no extra configuration
- The current view is shareable via URL so a link reproduces the exact same state

## Phase 4 — Guidance layer and first audit

Free tier closes at the end of this phase — this is the "complete, credible tool" bar.

#### v8 — Guidance layer and agentic guidance file · Free

Ships: a per-component MDX doc block (usage, do's/don'ts, accessibility notes) plus a project-level guidance markdown file (naming conventions, which surface is designer-editable vs. dev-only, when to add a new token) that humans and, later, the AI agent both read as ground truth. Acceptance criteria:

- Every component page shows its guidance block with no manual docs-writing step for boilerplate sections
- The guidance file lives in the repo, is version-controlled, and reads fine in a plain markdown viewer with no special tool
- Changing the guidance file updates the rendered guidance on the next build, with no separate publish step

#### v9 — Accessibility audit · Free

Ships: an axe-core scan runs inside the preview iframe per story; results appear in a manager panel. Acceptance criteria:

- Every story is scanned automatically on load, with no manual trigger required
- Failures link to the specific DOM element and the specific WCAG rule violated
- The false-positive rate is validated against a known test set before release, documented rather than just claimed

## Phase 5 — Collaboration (first paid tier)

#### v10 — Pinned comments · Pro

Ships: comments attached to a specific rendered story or variant state. Acceptance criteria:

- A comment survives a token or prop change elsewhere in the system rather than silently detaching
- Comments are visible to anyone with access to that story, threaded, with resolve and unresolve
- Notifications fire to mentioned users, feeding into v11

#### v11 — Notifications and subscriptions · Pro

Ships: alerts when a component or token someone depends on changes. Acceptance criteria:

- A user can subscribe to one specific component or token, not just everything
- A notification includes what changed and a link to the diff, delivered within 5 minutes of publish
- Unsubscribing actually stops notifications, verified in test

#### v12 — Usage and adoption analytics · Pro

Ships: visibility into which teams or repos consume which component version. Acceptance criteria:

- The adoption dashboard reflects real usage data from at least one connected consuming repo
- Data refreshes at least daily
- Component owners can see a version-by-version adoption trend, not just a current snapshot

## Phase 6 — Deeper audits and the Figma bridge

#### v13 — Visual regression audit · Pro

Ships: screenshot diffing across branches. Acceptance criteria:

- A visual change is flagged with a side-by-side diff, not just a pass/fail flag
- The false-positive rate from anti-aliasing or font-rendering noise stays under an agreed threshold
- Runs as a required CI check, blocking merge on unreviewed diffs

#### v14 — Token-drift lint · Pro

Ships: flags hardcoded hex or pixel values used instead of token references. Acceptance criteria:

- Correctly flags at least one known hardcoded-value case in a test repo
- Reports file and line number, not just "somewhere in this component"
- Can be run locally by a developer, not only in CI

#### v15 — One-way Figma publish · Pro

Ships: code pushes components and tokens into a Figma library via the Figma API, versioned per release. Acceptance criteria:

- Publishing from code creates or updates the correct Figma library components with matching variants
- The Figma publish is tagged with the same version as the code release
- Nothing in this pipeline reads from Figma back into code, verified rather than assumed

#### v16 — Figma ↔ code drift detection · Pro

Ships: builds on v15 to detect and alert when Figma diverges from published code. Acceptance criteria:

- Detects at least a renamed variant, a changed token value, and a missing component
- The alert names the specific mismatch, not just "drift detected"
- Runs on a schedule, not only on demand, so drift doesn't go unnoticed for weeks

## Phase 7 — Low-code editor (still draft-only, nothing writes to git yet)

#### v17 — Composition canvas v1, preview only · Pro

Ships: arrange existing real components into a page via a JSON tree; preview only, nothing saved. Acceptance criteria:

- Dragging and arranging at least 5 real components into a layout renders correctly, live
- The underlying JSON tree is inspectable, in keeping with the "view code" philosophy
- Nothing persists after closing the tab; this version is throwaway by design

#### v18 — Composition persistence and code export · Pro

Ships: schema-driven save; generates real CSF/JSX from the saved tree. Acceptance criteria:

- A saved composition reopens exactly as it was left
- Exported code compiles and renders identically to the canvas preview
- The export is reviewable as a diff before anyone commits it

#### v19 — Visual prop and token editing UI, sandbox only · Pro

Ships: Figma-like controls for props and tokens, constrained to schema-safe values; draft or sandbox only, no git write. Acceptance criteria:

- Editing is impossible outside the declared schema; no arbitrary CSS value can be set
- Every edit shows a live "what would change" code diff preview before anything is saved
- Sandbox changes never affect the shared or published component state

## Phase 8 — Write access to GitHub (the highest-trust tier)

#### v20 — Scoped GitHub write access · Enterprise

Ships: a CODEOWNERS-style permission map defining exactly what designers can and can't touch. Acceptance criteria:

- A designer without permission on a file cannot generate a commit touching it, enforced server-side
- The permission map is itself version-controlled and auditable
- Permission changes take effect without a redeploy

#### v21 — Branch and PR automation · Enterprise

Ships: visual edits become real commits and PRs with auto-generated descriptions and before/after screenshots. Acceptance criteria:

- Every PR is attributed to the actual designer's git identity, never a shared bot account
- The PR description accurately lists what changed and which components are affected
- Before/after screenshots are generated automatically, with no manual step

#### v22 — CI review gate · Enterprise

Ships: audits and drift checks required before merge; merge auto-triggers Figma republish and a Storybook rebuild. Acceptance criteria:

- A PR cannot merge if a required audit (accessibility, visual regression, token-drift) fails
- Merge triggers both the Figma publish (v15) and a Storybook rebuild automatically, with no manual step
- A failed automated trigger is retried or clearly surfaced, never silently dropped

## Phase 9 — AI agent, added gradually rather than as one big launch

#### v23 — AI agent v1: explain and draft · Pro

Ships: explains audit failures in plain language; drafts new story variants from a component's prop schema; grounded in the v8 guidance file. Acceptance criteria:

- Explanations reference the actual failing rule or element, not a generic description
- Drafted variants follow the naming and structure conventions in the guidance file
- The agent clearly labels its output as a suggestion and never auto-applies a change

#### v24 — AI agent v2: prompt-to-composition and PR review · Enterprise

Ships: a natural-language prompt generates a first-pass low-code composition (v17/v18); automated review of a designer's PR against the guidance file before a human looks at it. Acceptance criteria:

- Prompt-generated compositions use only real, existing components, never invented ones
- Automated PR review correctly flags at least one class of guidance-file violation in testing
- Human reviewers can see and override the agent's review comments; the agent never blocks a merge on its own

## Phase 10 — Org-scale maturity

#### v25 — Enterprise governance · Enterprise

Ships: SSO/RBAC, audit logs, multi-team workspaces, on-prem or VPC deployment, SLA support. Acceptance criteria:

- SSO works end to end with at least one major provider (for example Okta or Azure AD)
- Every write action (edits, merges, permission changes) appears in an exportable audit log
- On-prem or VPC deployment is documented and tested on a clean environment, not only cloud

## Phase 11 (v26): Agent manifest and MCP server

Builds on the catalog (v3), tokens (v4), guidance file (v8), and audits (v9) already in place. Depends on those four rather than sitting in build order after v25 — appended here to avoid renumbering the rest of the roadmap.

Ships: a machine-readable manifest of the design system (components, props, tokens, guidance conventions), plus a hosted MCP server exposing that same data live to any connected external coding agent (Cursor, Claude Code, and similar), so a team can import this design system once and get consistent output anywhere they build. Only components and variants currently passing their audits are surfaced, so an agent is never steered toward something presently broken.

Acceptance criteria:

- A manifest export run against a real installed library produces a valid, accurate JSON contract of current components, props, tokens, and guidance text
- Connecting a real coding agent through the hosted MCP server results in that agent using real component names and props in a test prompt, instead of inventing them
- A component or variant currently failing an active audit is excluded from what the manifest and MCP server surface until it passes again
- A change made to the library is reflected through the MCP server within a few minutes, with no manual republish step

Tier: Pro. The value here — a live, governed, always-current feed into whatever coding agent a team already uses — is the single most direct answer to "will output stay consistent with our design system," and depends on hosted infrastructure already gated behind Pro.

## Tier summary

| Tier | Versions | What it covers | Who it's for |
| --- | --- | --- | --- |
| Free, self-host | v1–v9 | Full visual browsing, library and token import, the guidance layer, accessibility audits | Any team getting started, no budget needed |
| Pro | v10–v19, v23, v26 | Collaboration, deeper audits, the one-way Figma bridge, the low-code editor in draft mode, AI agent v1, the live agent manifest/MCP server | Teams working together day to day, and any team wanting consistent output from external coding agents |
| Enterprise | v20–v22, v24–v25 | GitHub write access, the CI review gate, AI-assisted PR review, SSO/RBAC, on-prem deployment | Organizations that need write-back to source control and org-wide governance |

Cloud hosting is a separate axis from feature tier, available at any tier and priced independently, the same way Metabase Cloud sits alongside the free, self-hosted edition.
