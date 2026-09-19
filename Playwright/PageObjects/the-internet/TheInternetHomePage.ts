import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TheInternetHomePage extends BasePage {
  readonly heading: Locator;
  readonly availableExamples: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1.heading');
    this.availableExamples = page.locator('ul li a');
  }

  async open() {
    await this.navigateTo('/');
  }

  async clickExampleLink(text: string) {
    await this.availableExamples.filter({ hasText: text }).first().click();
  }
}
