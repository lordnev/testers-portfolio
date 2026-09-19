import { Page, expect } from '@playwright/test';

export class InventoryPage {
    private readonly page: Page;
    private readonly cartBadge = '.shopping_cart_badge';
    private readonly shoppingCartLink = '.shopping_cart_link';

    constructor(page: Page) {
        this.page = page;
    }

    async addProductToCart(productName: string) {
        // Convert product name to the data-test format: "Sauce Labs Backpack" -> "sauce-labs-backpack"
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        const selector = `[data-test="add-to-cart-${productId}"]`;
        await this.page.click(selector);
    }

    async getCartBadgeCount(): Promise<string | null> {
        return await this.page.textContent(this.cartBadge);
    }

    async goToCart() {
        await this.page.click(this.shoppingCartLink);
    }
}
