import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TyposPage extends BasePage {
  readonly paragraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.paragraphs = page.locator('.example p');
  }

  async open() {
    await this.navigateTo('/typos');
  }
}
