import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LargeDomPage extends BasePage {
  readonly largeTable: Locator;

  constructor(page: Page) {
    super(page);
    this.largeTable = page.locator('#large-table');
  }

  async open() {
    await this.navigateTo('/large');
  }

  getCell(row: number, col: number): Locator {
    return this.page.locator(`#large-table tr.row-${row} td.column-${col}`);
  }
}
