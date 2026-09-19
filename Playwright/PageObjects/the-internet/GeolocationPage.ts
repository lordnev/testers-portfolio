import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GeolocationPage extends BasePage {
  readonly whereAmIBtn: Locator;
  readonly latValue: Locator;
  readonly longValue: Locator;

  constructor(page: Page) {
    super(page);
    this.whereAmIBtn = page.locator('.example button');
    this.latValue = page.locator('#lat-value');
    this.longValue = page.locator('#long-value');
  }

  async open() {
    await this.navigateTo('/geolocation');
  }

  async clickWhereAmI() {
    await this.whereAmIBtn.click();
  }
}
