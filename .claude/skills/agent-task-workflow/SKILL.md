---
name: agent-task-workflow
description: Use whenever picking up a new implementation task (as a Maker), reviewing a diff against acceptance criteria (as a Checker), or slicing a new roadmap phase into agent-ready tasks.
---

# Agent task workflow

This skill governs how any task gets picked up, implemented, and verified. It has three parts: slicing a task, the Maker's contract, and the Checker's contract. The core rules in CLAUDE.md still apply throughout — this skill is how they get put into practice.

## Slicing a task (only if one doesn't already exist for the work at hand)

Slice vertically, not horizontally: one observable, testable behavior — not one architectural layer. "Build the schema" is not a task. "The viewport toggle persists across navigation" is a task.

For each task, write down:
- The one-sentence behavior it delivers
- Which acceptance criterion it satisfies (quoted verbatim from the source)
- The exact scope list: files and directories it may touch
- Its prerequisites: which earlier tasks must already be done

If the scope can't be written precisely yet because the code it depends on doesn't exist, the task isn't ready to hand off — that's a sign the phase before it isn't actually finished.

## Acting as a Maker

**Before starting, confirm you have:**
- The task, in one sentence, naming a single observable behavior
- The acceptance criteria, quoted verbatim — not summarized
- The schema or contract this task must conform to
- The scope list: the exact files and directories you may touch
- The negative-space list: what you must NOT do for this task specifically
- The relevant section of the guidance file for naming and conventions

If anything above is missing, unclear, or contradicts something else you were given: **stop**. Report exactly what's missing. Do not proceed on a guess.

**Deliver, in order:**
1. A short plan — 2 to 5 bullet points — before writing any code. Wait for it to be approved.
2. Once approved: a single diff, touching only the declared scope.
3. Tests that encode the acceptance criteria, written alongside the implementation.
4. A one-paragraph note: what you built, any assumption you had to make explicit even if small, and confirmation the scope list was respected.
5. Check this task's box in `docs-blocks/PROGRESS.md` (the top-level box, not the nested "Checker verified" box), in the same change or an immediate follow-up commit — this signals the task is ready for a Checker, not that it's done. Hand the task to a Checker next; do not treat it as finished until the Checker checks the nested box. Don't check the box if only part of the acceptance criteria is satisfied.
6. Nothing else. No unrelated refactors, no speculative extensions, no new files outside scope, no dependencies not already agreed.

## Acting as a Checker

Any task whose box in `docs-blocks/PROGRESS.md` is checked but whose nested "Checker verified" box is still unchecked is waiting on a Checker — treat that as an open item, not just a signal a Maker happened to leave behind.

**Before starting, confirm you have:**
- The diff to review
- The exact acceptance criteria this diff is being checked against, quoted verbatim
- The scope list the Maker was given
- The relevant section of the guidance file

If the acceptance criteria weren't provided: **stop and ask**. Never infer what "correct" means from reading the diff alone.

**Deliver:**
1. A pass or fail verdict per criterion — never a single "looks good." One line per criterion, citing the specific file and location.
2. A scope check: does the diff touch anything outside the declared scope list? If yes, automatic fail, regardless of code quality elsewhere.
3. A check against the negative-space list — new dependencies, unrelated changes, speculative flexibility — flagged even if the "real" functionality works.
4. If everything passes: say so explicitly, criterion by criterion, and check the nested "Checker verified" box under that task in `docs-blocks/PROGRESS.md` yourself — this is what actually marks the task done, not the Maker's top-level box alone.
5. If anything fails: specific, actionable feedback tied to the exact criterion and location, sent back to the Maker. Never fix it yourself, and never check the "Checker verified" box.
