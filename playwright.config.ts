import { defineConfig } from '@playwright/test';

const runId = new Date().toISOString().replace(/[:.]/g, '-');

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  outputDir: `./test-results/${runId}`,
  reporter: [['line'], ['html', { outputFolder: './playwright-report' }]],
  use: {
    baseURL: 'https://example.com',
    trace: 'retain-on-failure',
  },
});
