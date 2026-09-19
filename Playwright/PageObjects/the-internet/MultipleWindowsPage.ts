import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MultipleWindowsPage extends BasePage {
  readonly clickHereLink: Locator;

  constructor(page: Page) {
    super(page);
    this.clickHereLink = page.locator('.example a');
  }

  async open() {
    await this.navigateTo('/windows');
  }

  async openNewWindow(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.clickHereLink.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
