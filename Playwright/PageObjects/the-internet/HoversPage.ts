import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HoversPage extends BasePage {
  readonly figures: Locator;

  constructor(page: Page) {
    super(page);
    this.figures = page.locator('.figure');
  }

  async open() {
    await this.navigateTo('/hovers');
  }

  async hoverFigure(index: number) {
    await this.figures.nth(index).hover();
  }

  getFigureCaption(index: number): Locator {
    return this.figures.nth(index).locator('.figcaption');
  }
}
