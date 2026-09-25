import { defineConfig } from '@playwright/test';

const runId = new Date().toISOString().replace(/[:.]/g, '-');

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  outputDir: `./test-run/test-results/${runId}`,
  reporter: [
    ['line'],
    ['html', { outputFolder: `./test-run/playwright-report/${runId}` }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
});
