import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  getUsername(): Locator {
    return this.usernameInput;
  }

  getPassword(): Locator {
    return this.passwordInput;
  }

  getLoginButton(): Locator {
    return this.loginButton;
  }
}
