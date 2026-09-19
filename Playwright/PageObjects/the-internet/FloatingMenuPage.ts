import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FloatingMenuPage extends BasePage {
  readonly menu: Locator;
  readonly homeLink: Locator;
  readonly newsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menu = page.locator('#menu');
    this.homeLink = page.locator('#menu a[href="#home"]');
    this.newsLink = page.locator('#menu a[href="#news"]');
  }

  async open() {
    await this.navigateTo('/floating_menu');
  }

  async scrollDown(pixels: number = 2000) {
    await this.page.mouse.wheel(0, pixels);
  }
}
