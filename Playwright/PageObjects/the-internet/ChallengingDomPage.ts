import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChallengingDomPage extends BasePage {
  readonly blueButton: Locator;
  readonly redAlertButton: Locator;
  readonly greenSuccessButton: Locator;
  readonly canvas: Locator;
  readonly editLinks: Locator;
  readonly deleteLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.blueButton = page.locator('.button').first();
    this.redAlertButton = page.locator('.button.alert');
    this.greenSuccessButton = page.locator('.button.success');
    this.canvas = page.locator('#canvas');
    this.editLinks = page.locator('table tbody tr a[href="#edit"]');
    this.deleteLinks = page.locator('table tbody tr a[href="#delete"]');
  }

  async open() {
    await this.navigateTo('/challenging_dom');
  }

  async clickBlueButton() {
    await this.blueButton.click();
  }

  async clickRedAlertButton() {
    await this.redAlertButton.click();
  }

  async clickGreenSuccessButton() {
    await this.greenSuccessButton.click();
  }
}
