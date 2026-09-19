import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string = 'https://the-internet.herokuapp.com';
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h3');
  }

  async navigateTo(path: string = '') {
    await this.page.goto(`${this.baseUrl}${path}`);
  }
}
