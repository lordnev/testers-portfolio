import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablesPage extends BasePage {
  readonly table1: Locator;
  readonly table2: Locator;

  constructor(page: Page) {
    super(page);
    this.table1 = page.locator('#table1');
    this.table2 = page.locator('#table2');
  }

  async open() {
    await this.navigateTo('/tables');
  }

  async sortByHeader(tableNumber: 1 | 2, headerName: string) {
    const table = tableNumber === 1 ? this.table1 : this.table2;
    await table.locator('th', { hasText: headerName }).click();
  }

  async getColumnValues(tableNumber: 1 | 2, columnIndex: number): Promise<string[]> {
    const table = tableNumber === 1 ? this.table1 : this.table2;
    const cells = table.locator(`tbody tr td:nth-child(${columnIndex})`);
    return await cells.allInnerTexts();
  }
}
