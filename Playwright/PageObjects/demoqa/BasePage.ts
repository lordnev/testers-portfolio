import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(`https://demoqa.com/${path}`);
    // DemoQA often has ads that cover elements. This helper removes them.
    await this.page.addStyleTag({ content: '.adbox { display: none !important; }' });
    await this.page.addStyleTag({ content: '#fixedban { display: none !important; }' });
  }

  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
