import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InfiniteScrollPage extends BasePage {
  readonly scrollBlocks: Locator;

  constructor(page: Page) {
    super(page);
    this.scrollBlocks = page.locator('.jscroll-added');
  }

  async open() {
    await this.navigateTo('/infinite_scroll');
  }

  async scrollDown(times: number = 2) {
    for (let i = 0; i < times; i++) {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(1000);
    }
  }
}
