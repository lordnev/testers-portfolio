import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsWindowsPage extends BasePage {
  private readonly alertBtn: Locator;
  private readonly confirmBtn: Locator;
  private readonly promptBtn: Locator;
  private readonly resultText: Locator;

  constructor(page: Page) {
    super(page);
    this.alertBtn = page.getByText('Click me');
    this.confirmBtn = page.getByText('Confirm Box');
    this.promptBtn = page.getByText('Prompt Box');
    this.resultText = page.locator('#confirmBoxResult');
  }

  async triggerSimpleAlert(): Promise<void> {
    await this.alertBtn.click();
  }

  async triggerConfirmAlert(action: 'accept' | 'dismiss'): Promise<void> {
    await this.confirmBtn.click();
    if (action === 'accept') {
      await this.page.once('dialog', dialog => dialog.accept());
    } else {
      await this.page.once('dialog', dialog => dialog.dismiss());
    }
  }

  async verifyConfirmResult(text: string): Promise<void> {
    await expect(this.resultText).toContainText(text);
  }
}
