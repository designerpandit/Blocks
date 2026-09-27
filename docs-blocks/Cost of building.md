# Cost of building

The cost-effective path here is one person, technically capable, building with Claude doing most of the frontend and backend implementation. That path leads this tab; the original team-based numbers stay further down as a reference for when it's time to scale beyond solo.

## The solo + Claude path

- One technically capable person who can direct and review AI-written code, not necessarily write every line by hand
- Claude Code, on a Pro or Max plan, does most of the actual implementation; the person's time goes to specs, review, testing, and the trust-critical calls
- Full-time effort assumed below; a nights-and-weekends side project roughly doubles the elapsed time

### Monthly cash cost

- Claude: a Pro plan most months ($20/month, or $17/month billed annually) covers typical day-to-day building. Expect to step up to a Max plan (from $100/month) for the three or four heaviest build months — the low-code editor and the GitHub write-access phases are the likely candidates.
- Infrastructure: free tiers cover almost the entire pre-launch build; budget $0–$50/month while building, rising to $50–$300/month once real users are on it.
- Everything else (domain, basic error monitoring): roughly $10–$20/month.
- A realistic monthly average across the whole build: **$40–$70/month**, with two or three months closer to $120–$150 during the heaviest phases.

### The one place to still spend real money

For phase 8 (GitHub write access) and phase 10 (SSO and permissions), budget for a single paid, outside security or code review before either ships for real — not a hire, just a focused review. Roughly $1,500–$4,000 per review, twice across the whole roadmap. This is the one spot where cost-effective shouldn't mean unreviewed: a mistake in write-access or authentication is exactly the kind of thing that erodes trust in the whole product.

### Elapsed time

- Full-time, solo, AI-assisted: roughly 13–20 months to work through all 26 versions, one phase at a time
- Nights-and-weekends: realistically 2.5–4.5 years for the same 26 versions

### Total cash cost for the whole build

- Roughly $700–$1,500 in Claude subscription costs across the full timeline
- Roughly $300–$1,000 in infrastructure during the build itself
- Roughly $3,000–$8,000 for the two paid expert reviews
- **Total: roughly $4,500–$11,500** to build all 26 versions solo. The trade is elapsed time, plus the review discipline a team would otherwise provide automatically.

### Where quality still needs deliberate attention, not a bigger budget

- Build the audits already in the roadmap (v9 accessibility, v13 visual regression, v14 token-drift) early rather than last — they stand in for a QA team
- Write tests as you go; a solo builder has no one else catching regressions by using the product daily
- Treat the two paid reviews above as non-negotiable, not optional polish

## Ongoing costs after launch

Not part of the one-time build cost above:

- Hosting and infrastructure (database, storage, background jobs): roughly $500–$3,000/month at small scale, growing with usage
- LLM API usage for the AI agent (phase 9): usage-based, typically starting in the low hundreds of dollars per month and scaling with how much designers use the assistant
- Third-party services (auth/SSO provider, error monitoring, analytics): roughly $200–$1,500/month depending on which are added and at what plan tier
- Ongoing engineering for maintenance, support and versions beyond v25: typically 1–2 engineers retained on an ongoing basis once the core roadmap ships

## The honest caveat

Both paths are planning-level estimates, not fixed budgets. Solo plus Claude is dramatically cheaper in dollars and slower in elapsed time; a team is faster in elapsed time and costs three to four times more or less depending on location and seniority. The right call is whichever trade-off matches how much runway and how much calendar time you actually have.
