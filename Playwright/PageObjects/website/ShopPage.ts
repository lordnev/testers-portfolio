import { Page, expect } from '@playwright/test';

export class ShopPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(process.env.SHOP_URL as string);
  }

  async checkProductsVisible() {
    // W WooCommerce (i większości sklepów) produkty zazwyczaj mają klasę '.product' lub listę ul.products
    const products = this.page.locator('.product, .type-product');

    // Oczekujemy, że przynajmniej jeden produkt będzie widoczny na stronie
    await expect(products.first()).toBeVisible();

    // Sprawdzenie, czy załadowano więcej niż 0 produktów
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  }

  async selectProduct(productName: string) {
    await this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first().click();
  }

}
