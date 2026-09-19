import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxesPage extends BasePage {
  readonly checkboxes: Locator;

  constructor(page: Page) {
    super(page);
    this.checkboxes = page.locator('#checkboxes input[type="checkbox"]');
  }

  async open() {
    await this.navigateTo('/checkboxes');
  }

  async setCheckbox(index: number, checked: boolean) {
    const checkbox = this.checkboxes.nth(index);
    if (checked) {
      await checkbox.check();
    } else {
      await checkbox.uncheck();
    }
  }
}
