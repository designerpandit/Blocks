import { test, expect } from '@playwright/test';

import { SMOKE_STORY_IDS } from './story-ids.ts';

test.describe('v1 fork baseline — smoke pass over sample stories', () => {
  for (const storyId of SMOKE_STORY_IDS) {
    test(`renders "${storyId}" with no console errors or render failures`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (error) => {
        pageErrors.push(error.message);
      });

      const response = await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
      expect(response?.ok(), `expected a successful response for story "${storyId}"`).toBe(true);

      const root = page.locator('#storybook-root, #root');
      await expect(root).toBeVisible();
      await expect(root).not.toBeEmpty();

      expect(pageErrors, `unhandled page errors while rendering "${storyId}"`).toEqual([]);
      expect(consoleErrors, `console errors while rendering "${storyId}"`).toEqual([]);
    });
  }
});
