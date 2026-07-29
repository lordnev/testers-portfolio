import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(process.env.WP_ADMIN_URL as string);
  }

  async checkLoginFieldsVisible() {
    // Pola formularza logowania w WordPress (wp-admin)
    const usernameField = this.page.locator('#user_login');
    const passwordField = this.page.locator('#user_pass');
    const submitButton = this.page.locator('#wp-submit');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(submitButton).toBeVisible();
  }

  async login(username?: string, password?: string) {
    const user = username ?? process.env.WP_USERNAME;
    const pass = password ?? process.env.WP_PASSWORD;

    await this.page.locator('#user_login').fill(user as string);
    await this.page.locator('#user_pass').fill(pass as string);
    await this.page.locator('#wp-submit').click();

    // Wait for the dashboard to load to confirm login success
    await this.page.waitForURL(/moje-konto/);
  }
}
