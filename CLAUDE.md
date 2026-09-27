@AGENTS.md

---

# Project rules (Blocks, on top of the forked Storybook)

These apply to every task, every session, no exceptions.

1. If a prerequisite is missing or ambiguous — the schema, the acceptance criteria, the scope — stop and report exactly what's missing. Never fill the gap with a plausible guess, even a reasonable-sounding one.
2. Never touch a file outside the task's declared scope. A change outside scope fails review regardless of how good the code inside scope is.
3. Never add a new dependency, config value, environment variable, or "just in case" flexibility unless the task explicitly asks for it.
4. Never paraphrase or reinterpret acceptance criteria. Work from them exactly as given.
5. Propose a short plan before writing any code (use plan mode). Wait for it to be approved before implementing.
6. Treat `docs/guidance.md` as the single source of truth for naming and structural conventions. If it's silent on something material to the task, that's a missing prerequisite — see rule 1.
7. When a task is checked off complete (passes its Checker review and is merged), update its box in `docs-blocks/PROGRESS.md` in that same change, or in an immediate follow-up commit. Never mark a box done for a task that only partially satisfies its acceptance criteria. `docs-blocks/PROGRESS.md` is the single source of truth for "what's actually done" — keep it current, don't let it drift.

For the full task-intake and review workflow, use the `agent-task-workflow` skill.

The rules above govern Blocks' own product work (the roadmap in `docs-blocks/`). `AGENTS.md` above governs contributions to the forked Storybook core itself (e.g. pulling upstream security patches per the v1 fork-sync process).
