import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BrokenImagesPage extends BasePage {
  readonly images: Locator;

  constructor(page: Page) {
    super(page);
    this.images = page.locator('.example img');
  }

  async open() {
    await this.navigateTo('/broken_images');
  }

  async getImageStatuses(): Promise<number[]> {
    const count = await this.images.count();
    const statuses: number[] = [];

    for (let i = 0; i < count; i++) {
      const src = await this.images.nth(i).getAttribute('src');
      if (src) {
        const absoluteUrl = new URL(src, this.baseUrl).toString();
        const response = await this.page.request.get(absoluteUrl);
        statuses.push(response.status());
      }
    }
    return statuses;
  }
}
