import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class KeyPressesPage extends BasePage {
  readonly targetInput: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    super(page);
    this.targetInput = page.locator('#target');
    this.resultText = page.locator('#result');
  }

  async open() {
    await this.navigateTo('/key_presses');
  }

  async pressKey(key: string) {
    await this.targetInput.click();
    await this.page.keyboard.press(key);
  }
}
