import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShiftingContentPage extends BasePage {
  readonly menuItems: Locator;
  readonly shiftingImage: Locator;

  constructor(page: Page) {
    super(page);
    this.menuItems = page.locator('.example ul li a');
    this.shiftingImage = page.locator('.shift');
  }

  async openMenu(pixelShift?: number) {
    const query = pixelShift ? `?pixel_shift=${pixelShift}` : '';
    await this.navigateTo(`/shifting_content/menu${query}`);
  }

  async openImage(pixelShift?: number) {
    const query = pixelShift ? `?pixel_shift=${pixelShift}` : '';
    await this.navigateTo(`/shifting_content/image${query}`);
  }
}
