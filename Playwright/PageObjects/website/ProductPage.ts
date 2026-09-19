import { Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(productSlug: string) {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) throw new Error('BASE_URL is not defined in .env');
    await this.page.goto(`${baseUrl}/produkt/${productSlug}/`);
  }

  async addProductToCart() {
    const addToCartButton = this.page.locator('button[name="add-to-cart"]');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
  }
}
