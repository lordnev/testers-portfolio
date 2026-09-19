import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ABTestingPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('.example h3');
  }

  async open() {
    await this.navigateTo('/abtest');
  }

  async setOptOutCookie() {
    await this.page.context().addCookies([
      {
        name: 'opt_out_new',
        value: 'true',
        domain: 'the-internet.herokuapp.com',
        path: '/',
      },
    ]);
  }
}
