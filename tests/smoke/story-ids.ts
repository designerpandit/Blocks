/**
 * Real story IDs confirmed against the react-vite/default-ts sandbox's own
 * story index (index.json), generated via `yarn start` from the repo root
 * per Task 1.1. Do not add an ID here without confirming it exists in that
 * index first — a typo'd ID fails the smoke test for the wrong reason.
 */
export const SMOKE_STORY_IDS: string[] = [
  // Example stories (src/stories/*.stories.ts in the sandbox)
  'example-button--primary',
  'example-button--secondary',
  'example-button--large',
  'example-button--small',
  'example-header--logged-in',
  'example-header--logged-out',
  'example-page--logged-out',
  'example-page--logged-in',

  // Core stories (Storybook's own template stories, titled "core")
  'core-args--events',
  'core-args--inheritance',
  'core-args--targets',
  'core-basics--basic',
  'core-basics--cyclical',
  'core-basics--disabled',
  'core-basics--option-depth',
  'core-basics--option-persist',
  'core-basics--reserved',
  'core-basics--type-array',
  'core-basics--type-boolean',
  'core-basics--type-class',
  'core-basics--type-function',
  'core-basics--type-global',
  'core-basics--type-infinity',
  'core-basics--type-minus-infinity',
];
