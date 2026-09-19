import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class EntryAdPage extends BasePage {
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly closeModalBtn: Locator;
  readonly reEnableLink: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = page.locator('#modal');
    this.modalTitle = page.locator('.modal-title');
    this.closeModalBtn = page.locator('.modal-footer p');
    this.reEnableLink = page.locator('#restart-ad');
  }

  async open() {
    await this.navigateTo('/entry_ad');
  }

  async closeModal() {
    await this.closeModalBtn.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async reEnableAd() {
    await this.reEnableLink.click();
  }
}
