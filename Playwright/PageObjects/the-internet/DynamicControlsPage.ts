import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicControlsPage extends BasePage {
  readonly checkbox: Locator;
  readonly removeAddBtn: Locator;
  readonly enableDisableBtn: Locator;
  readonly inputField: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    super(page);
    this.checkbox = page.locator('#checkbox-example input[type="checkbox"]');
    this.removeAddBtn = page.locator('#checkbox-example button');
    this.enableDisableBtn = page.locator('#input-example button');
    this.inputField = page.locator('#input-example input');
    this.message = page.locator('#message');
  }

  async open() {
    await this.navigateTo('/dynamic_controls');
  }

  async clickRemoveAdd() {
    await this.removeAddBtn.click();
  }

  async clickEnableDisable() {
    await this.enableDisableBtn.click();
  }
}
