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
7. `docs-blocks/PROGRESS.md` is the single source of truth for "what's actually done" — keep it current, don't let it drift. Each task there has two boxes: the Maker checks the task's own box once its diff, tests, and note are delivered; the nested "Checker verified" box is checked only by a Checker, only after it has independently reviewed that diff against the task's exact acceptance criteria and passed it. Whenever a Maker checks a task's box, that task must go to a Checker before it's treated as done — a checked task box with an unchecked "Checker verified" box means implemented, not yet verified. Never check either box for a task that only partially satisfies its acceptance criteria.

For the full task-intake and review workflow, use the `agent-task-workflow` skill.

The rules above govern Blocks' own product work (the roadmap in `docs-blocks/`). `AGENTS.md` above governs contributions to the forked Storybook core itself (e.g. pulling upstream security patches per the v1 fork-sync process).
