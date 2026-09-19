import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShadowDomPage extends BasePage {
  readonly shadowParagraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.shadowParagraphs = page.locator('my-paragraph span');
  }

  async open() {
    await this.navigateTo('/shadowdom');
  }
}
