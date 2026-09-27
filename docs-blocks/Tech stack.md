# Tech stack

The recommended stack for building the platform itself, chosen to stay boring, standard and swappable, so the on-prem / Enterprise deployment in v25 stays realistic.

## UI/UX direction

Airbnb-style design in practice means a few habits, not a specific color or font: generous whitespace, one clear focal point per screen, soft rounded corners, a calm neutral background, a single accent color used only for primary actions, and plain, friendly copy instead of technical error codes. The components being reviewed should stay the visual focus, so the tool's own chrome needs to stay quiet.

Shadcn/ui isn't a component library to install — it's source files (built on Radix UI) copied into your own codebase and restyled, paired with Tailwind for the utility styling underneath. That fits well here, since you fully own and can tune the look toward that Airbnb feel, rather than fighting someone else's design opinions later.

## Frontend

- React, already the base, since the fork is of Storybook's manager and preview
- Tailwind CSS + shadcn/ui, used consistently across every new surface (gallery view, variant matrix, comments, the low-code canvas), including inside the forked Storybook shell, so the whole product feels like one thing
- Vite, for building the platform's own app (separate from the story-bundling builder that end users' projects use)
- Zustand or React Context, lightweight state management for the app's own UI state
- dnd-kit, for the low-code composition canvas in phase 7

## Backend

- Node.js + TypeScript end to end, so frontend and backend can share types such as a component's schema or token definitions
- Fastify or NestJS as the API framework: Fastify for something lean, NestJS for more built-in structure as the team grows
- PostgreSQL as the main database, with Prisma or Drizzle to work with it in TypeScript
- Redis + BullMQ for background jobs: scheduled drift checks, notifications, the Figma publish pipeline
- S3-compatible object storage for screenshots (thumbnails, visual-regression diffs); staying S3-compatible keeps on-prem/VPC realistic later
- A GitHub App, via Octokit, rather than personal access tokens, for the write-access feature in phase 8
- WorkOS or a similar B2B auth provider for the SSO/RBAC work in v25
- Server-side calls to an LLM API for the AI agent; the key stays on the backend, never exposed to the browser

## Hosting and storage

Neither Vercel nor Supabase alone covers everything here — the cleanest, still cost-effective setup splits the job across three pieces, each doing what it's actually good at.

- **Frontend (the manager UI):** Vercel. Deploys straight from GitHub, has a generous free tier, and is the best-supported host for a Vite/React app. This one fits as-is.
- **Database and object storage:** Supabase. It bundles a real PostgreSQL database with S3-compatible storage (and auth, if that's ever wanted) behind one free tier, matching the Postgres and S3-compatible storage choices already made above without adding a second vendor just for storage.
- **Backend API and background jobs:** something that runs a persistent Node process, since Vercel's serverless functions aren't built for long-running workers like the BullMQ jobs handling drift checks, notifications, and the Figma publish pipeline. Render or Railway are the cost-effective fits here — both deploy from GitHub, both support always-on Node services and a managed Redis add-on, and both are simpler to run solo than raw AWS or GCP.
- **Redis / queue:** Upstash (serverless Redis, free tier) if the backend host doesn't already bundle one, or the backend host's own Redis add-on if it does.
- **Agent manifest / MCP server (v26):** rides on the same backend host as the API — one more endpoint on the already-persistent Node service, not a new infrastructure category. It reads from the same Postgres catalog and audit results already in place, so there's nothing new to host or pay for beyond the existing backend tier.

Why not just one platform: Vercel doesn't run long-lived background workers well, and Supabase's own serverless functions aren't meant to be a full backend for a Node/Fastify or NestJS API with queues. Splitting the three keeps each piece on the tool built for it, rather than locking the whole product into one vendor's particular way of doing things.

Staying portable: every piece here is a standard technology underneath (Postgres, S3-compatible storage, Redis, a plain Node process) rather than a platform-specific service, so moving off any one of these vendors later — including onto the self-hosted or on-prem setup Enterprise customers will eventually want (v25) — is a redeploy, not a rewrite.

## Observability

- Error tracking: wire in a tool like Sentry, on both frontend and backend, from the first real deployment — not something added after the first incident.
- Logging: structured logs from the backend, shipped somewhere queryable, even a basic free-tier hosted log service to start.
- Uptime monitoring: an external check pinging the production API, so an outage is caught before a customer reports it.
- Incident response: a short, written runbook for "the site is down" and, once phase 8 ships, "a bad commit landed in a customer's repo" — written before it's needed, not during.

## Keeping the fork current

The fork in v1 isn't a one-time event. Storybook keeps shipping security patches and fixes upstream, and this fork needs a standing process to pull relevant ones in, not just the initial copy. Budget a small, recurring slice of time for this rather than treating v1 as finished forever — see the implementation plan's ongoing tasks for how this gets assigned to an agent.

## Why these choices

Wherever there's a choice, lean toward boring, standard, swappable technology (Postgres over an exotic database, S3-compatible storage, a GitHub App over a custom integration) rather than something clever, since "stable and scalable" was the stated goal. Standard choices are what make the eventual on-prem/Enterprise deployment achievable instead of a rewrite.
