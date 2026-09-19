import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  readonly dropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.dropdown = page.locator('#dropdown');
  }

  async open() {
    await this.navigateTo('/dropdown');
  }

  async selectByValue(value: string) {
    await this.dropdown.selectOption({ value });
  }

  async selectByLabel(label: string) {
    await this.dropdown.selectOption({ label });
  }

  async getSelectedValue(): Promise<string> {
    return await this.dropdown.inputValue();
  }
}
