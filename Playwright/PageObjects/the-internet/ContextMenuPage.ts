import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContextMenuPage extends BasePage {
  readonly hotSpot: Locator;

  constructor(page: Page) {
    super(page);
    this.hotSpot = page.locator('#hot-spot');
  }

  async open() {
    await this.navigateTo('/context_menu');
  }

  async rightClickHotSpot(): Promise<string> {
    let alertText = '';
    this.page.once('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });
    await this.hotSpot.click({ button: 'right' });
    return alertText;
  }
}
