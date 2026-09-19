import { Page, expect } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartItem = '.cart_item';
    private readonly checkoutButton = '[data-test="checkout"]';

    constructor(page: Page) {
        this.page = page;
    }

    async isProductInCart(productName: string): Promise<boolean> {
        const item = this.page.locator(this.cartItem);
        // Check if any of the cart items contain the product name
        return await item.filter({ hasText: productName }).isVisible();
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }
}
