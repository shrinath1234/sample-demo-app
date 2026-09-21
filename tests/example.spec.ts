import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Example Domain/i);
  await expect(page.locator('h1')).toContainText('Example Domain');
});
