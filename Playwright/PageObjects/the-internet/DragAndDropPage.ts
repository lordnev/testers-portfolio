import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DragAndDropPage extends BasePage {
  readonly columnA: Locator;
  readonly columnB: Locator;
  readonly columnAHeader: Locator;
  readonly columnBHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.columnA = page.locator('#column-a');
    this.columnB = page.locator('#column-b');
    this.columnAHeader = page.locator('#column-a header');
    this.columnBHeader = page.locator('#column-b header');
  }

  async open() {
    await this.navigateTo('/drag_and_drop');
  }

  async dragAToB() {
    await this.columnA.dragTo(this.columnB);
  }

  async dragBToA() {
    await this.columnB.dragTo(this.columnA);
  }
}
