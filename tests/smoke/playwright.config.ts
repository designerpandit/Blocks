import { defineConfig, devices } from '@playwright/test';

const STORYBOOK_PORT = 6006;
const STORYBOOK_URL = `http://localhost:${STORYBOOK_PORT}`;

/**
 * Task 1.5 — Smoke-test suite over 20+ sample stories.
 *
 * Boots the same react-vite/default-ts sandbox Task 1.1 verified manually
 * (`yarn start` from the repo root), then smoke.spec.ts loads each story in
 * story-ids.ts headlessly and asserts no console errors or render failures.
 */
export default defineConfig({
  testDir: '.',
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: STORYBOOK_URL,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'yarn start',
    cwd: '../..',
    url: STORYBOOK_URL,
    reuseExistingServer: !process.env.CI,
    // Full sandbox generation (install + compile + create sandbox + boot) is slow the first time.
    timeout: 15 * 60 * 1000,
  },
});
