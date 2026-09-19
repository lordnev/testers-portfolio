import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddRemoveElementsPage extends BasePage {
  readonly addElementBtn: Locator;
  readonly deleteBtns: Locator;

  constructor(page: Page) {
    super(page);
    this.addElementBtn = page.getByRole('button', { name: 'Add Element' });
    this.deleteBtns = page.locator('#elements button.added-manually');
  }

  async open() {
    await this.navigateTo('/add_remove_elements/');
  }

  async addElements(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addElementBtn.click();
    }
  }

  async deleteFirstElement() {
    await this.deleteBtns.first().click();
  }

  async deleteAllElements() {
    while ((await this.deleteBtns.count()) > 0) {
      await this.deleteBtns.first().click();
    }
  }
}
