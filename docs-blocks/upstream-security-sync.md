# Upstream security-sync process

Blocks is a fork of [`storybookjs/storybook`](https://github.com/storybookjs/storybook). Forking once does not mean the fork stays current — Storybook keeps shipping security patches and fixes upstream, and those need a standing process to pull in. This document is that process for now: manual, run by a human or the Release Agent on request. Automating it (a scheduled job that runs this and opens a PR automatically) is a separate, later, ongoing task for the Release Agent, not part of this task.

## Cadence

- Run this process monthly, on a fixed day, regardless of whether anything looks urgent.
- Also run it immediately, out of cadence, whenever Storybook publishes a release whose changelog or advisory mentions a security fix. Watch:
  - [`storybookjs/storybook` GitHub Security Advisories](https://github.com/storybookjs/storybook/security/advisories)
  - [`storybookjs/storybook` releases](https://github.com/storybookjs/storybook/releases)

## One-time setup: add the upstream remote

A GitHub fork does not track new upstream commits automatically. Add `storybookjs/storybook` as a second remote once, locally:

```bash
git remote add upstream https://github.com/storybookjs/storybook.git
git remote -v
# origin    https://github.com/designerpandit/Blocks.git (fetch/push)
# upstream  https://github.com/storybookjs/storybook.git (fetch/push)
```

## Steps to diff and pull in a patch

1. **Fetch upstream:**

   ```bash
   git fetch upstream
   ```

2. **See what's changed since the fork's current base**, on the branch that matters — `next` is this fork's default branch, mirroring upstream's own default branch:

   ```bash
   git log --oneline next..upstream/next
   ```

   This lists every upstream commit not yet in this fork. Security-relevant commits are usually identifiable by their message, the advisory linking to a specific commit/PR, or `CHANGELOG.md`'s "Patch" sections in the release the advisory names.

3. **Isolate the relevant commit(s).** Do not merge all of `upstream/next` blindly — this fork may have diverged (rebranding, new product code under `docs-blocks/`, `.claude/`, etc. added on top). Identify the specific commit SHA(s) tied to the security fix:

   ```bash
   git log upstream/next --oneline --all -- <path affected, if known from the advisory>
   ```

4. **Bring the fix in**, preferring a cherry-pick for a single, isolated patch:

   ```bash
   git cherry-pick <commit-sha>
   ```

   For a fix that spans many commits or a full patch release, merge the relevant upstream tag instead:

   ```bash
   git merge upstream/vX.Y.Z
   ```

5. **Resolve conflicts if any**, favoring upstream's fix content and keeping this fork's own additions (rebrand, product docs, `.claude/` config) intact. If a conflict touches application code Blocks has already modified for its own roadmap (v2 onward), that is a signal to slow down and review by hand rather than blindly taking either side.

6. **Verify before merging to `next`:**
   - Run the existing test suite (`yarn test`, and the smoke-test suite from Task 1.5 in `tests/smoke/`)
   - Confirm `yarn start` still boots and serves example stories with no new console errors
   - Confirm the specific security issue is actually fixed, per the advisory's reproduction steps if it gives one

7. **Open a PR against `next`**, tagging it clearly as a security sync (e.g. `chore(security-sync): pull in upstream fix for <advisory ID or short description>`), linking the upstream advisory or commit. This goes through the same Checker review as any other change before merge.

## What this process does not cover

- Automating the fetch/diff/flag step on a schedule — that is a separate Release Agent task, noted in the Implementation plan as starting the moment v1 ships.
- Deciding whether a non-security upstream change (a feature, a refactor) should also be pulled in — this document is scoped to security patches specifically.
