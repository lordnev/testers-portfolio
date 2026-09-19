import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicLoadingPage extends BasePage {
  readonly startBtn: Locator;
  readonly loadingBar: Locator;
  readonly finishText: Locator;

  constructor(page: Page) {
    super(page);
    this.startBtn = page.locator('#start button');
    this.loadingBar = page.locator('#loading');
    this.finishText = page.locator('#finish h4');
  }

  async openExample(exampleId: 1 | 2) {
    await this.navigateTo(`/dynamic_loading/${exampleId}`);
  }

  async startAndWaitForFinish() {
    await this.startBtn.click();
    await this.finishText.waitFor({ state: 'visible' });
  }
}
