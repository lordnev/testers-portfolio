import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormAuthPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly logoutBtn: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.locator('button[type="submit"]');
    this.logoutBtn = page.locator('a.button.secondary');
    this.flashMessage = page.locator('#flash');
  }

  async open() {
    await this.navigateTo('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }
}
