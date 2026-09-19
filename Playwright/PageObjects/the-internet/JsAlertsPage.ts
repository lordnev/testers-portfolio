import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class JsAlertsPage extends BasePage {
  readonly jsAlertBtn: Locator;
  readonly jsConfirmBtn: Locator;
  readonly jsPromptBtn: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    super(page);
    this.jsAlertBtn = page.getByRole('button', { name: 'Click for JS Alert' });
    this.jsConfirmBtn = page.getByRole('button', { name: 'Click for JS Confirm' });
    this.jsPromptBtn = page.getByRole('button', { name: 'Click for JS Prompt' });
    this.resultText = page.locator('#result');
  }

  async open() {
    await this.navigateTo('/javascript_alerts');
  }

  async triggerAlertAndAccept(): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await this.jsAlertBtn.click();
    return dialogMessage;
  }

  async triggerConfirm(accept: boolean): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await this.jsConfirmBtn.click();
    return dialogMessage;
  }

  async triggerPrompt(input: string): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept(input);
    });
    await this.jsPromptBtn.click();
    return dialogMessage;
  }
}
