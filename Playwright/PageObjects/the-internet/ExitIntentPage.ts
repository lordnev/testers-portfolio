import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExitIntentPage extends BasePage {
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly closeModalBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = page.locator('#ouibounce-modal');
    this.modalTitle = page.locator('.modal-title');
    this.closeModalBtn = page.locator('.modal-footer p');
  }

  async open() {
    await this.navigateTo('/exit_intent');
  }

  async triggerExitIntent() {
    // Ouibounce listens for mouseleave at the top of the viewport
    await this.page.evaluate(() => {
      document.documentElement.dispatchEvent(new MouseEvent('mouseleave', { clientY: -10 }));
    });
  }

  async closeModal() {
    await this.closeModalBtn.click();
    await this.modal.waitFor({ state: 'hidden' });
  }
}
