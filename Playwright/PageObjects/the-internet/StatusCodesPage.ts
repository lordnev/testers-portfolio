import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class StatusCodesPage extends BasePage {
  readonly redirectLink: Locator;
  readonly codeLinks: Locator;
  readonly statusText: Locator;

  constructor(page: Page) {
    super(page);
    this.redirectLink = page.locator('#redirect');
    this.codeLinks = page.locator('.example ul li a');
    this.statusText = page.locator('.example p');
  }

  async openRedirector() {
    await this.navigateTo('/redirector');
  }

  async openStatusCodes() {
    await this.navigateTo('/status_codes');
  }

  async clickStatusCode(code: number) {
    await this.page.locator(`.example ul li a[href="status_codes/${code}"]`).click();
  }
}
