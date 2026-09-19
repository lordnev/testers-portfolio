import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.submitBtn = page.locator('#form_submit');
  }

  async open() {
    await this.navigateTo('/forgot_password');
  }

  async submitEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitBtn.click();
  }
}
