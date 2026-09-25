import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.getUsername().fill('standard_user');
  await loginPage.getPassword().fill('secret_sauce');
  await loginPage.getLoginButton().click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('user cannot login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.getUsername().fill('invalid_user');
  await loginPage.getPassword().fill('invalid_password');
  await loginPage.getLoginButton().click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('user cannot login with empty credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.getLoginButton().click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username is required'
  );
});

test('user cannot login with empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.getUsername().fill('standard_user');
  await loginPage.getLoginButton().click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Password is required'
  );
});

test('user cannot login with invalid username and valid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.getUsername().fill('invalid_user');
  await loginPage.getPassword().fill('secret_sauce');
  await loginPage.getLoginButton().click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('user cannot login with valid username and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.getUsername().fill('standard_user');
  await loginPage.getPassword().fill('invalid_password');
  await loginPage.getLoginButton().click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});