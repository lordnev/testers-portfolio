import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InputsPage extends BasePage {
  readonly numberInput: Locator;

  constructor(page: Page) {
    super(page);
    this.numberInput = page.locator('.example input[type="number"]');
  }

  async open() {
    await this.navigateTo('/inputs');
  }

  async fillNumber(value: string) {
    await this.numberInput.fill(value);
  }

  async stepWithArrow(direction: 'Up' | 'Down') {
    await this.numberInput.focus();
    await this.page.keyboard.press(`Arrow${direction}`);
  }
}
