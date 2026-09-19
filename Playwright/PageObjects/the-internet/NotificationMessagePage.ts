import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotificationMessagePage extends BasePage {
  readonly triggerLink: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.triggerLink = page.locator('.example a');
    this.flashMessage = page.locator('#flash');
  }

  async open() {
    await this.navigateTo('/notification_message_rendered');
  }

  async clickTrigger() {
    await this.triggerLink.click();
  }
}
