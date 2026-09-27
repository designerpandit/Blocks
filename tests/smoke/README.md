# Smoke tests (Task 1.5)

Headless smoke pass over 20+ sample Storybook stories. Renders each story in `story-ids.ts` and asserts:

- the page responds successfully
- the story root renders with content
- no console errors are logged
- no unhandled page errors occur

This suite is self-contained: its own `package.json`, its own Playwright install, no shared dependency on the root workspace.

## Running locally

From this directory:

```bash
npm install
npx playwright install chromium --with-deps
npm test
```

The Playwright config boots Storybook itself (`yarn start` from the repo root, the same command Task 1.1 verified manually) and waits for it to come up on `http://localhost:6006` before running. The first run is slow — it generates the sandbox from scratch. Subsequent local runs reuse an already-running server on port 6006 if one exists (`reuseExistingServer`).

## Running in CI

Wired into `.github/workflows/fork-checks.yml` as a job gated the same way the rest of that file is (`github.repository_owner != 'storybookjs'`), since this suite is specific to the Blocks fork, not upstream Storybook.

## Adding a story ID

Confirm the ID actually exists first — fetch `http://localhost:6006/index.json` from a running instance and check the `entries` keys. Don't guess a story ID from a component's file name.
