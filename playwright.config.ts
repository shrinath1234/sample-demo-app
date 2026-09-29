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
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
  webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
});
