export class InventoryPage {
    get cartBadge() { return cy.get('.shopping_cart_badge'); }
    get shoppingCartLink() { return cy.get('.shopping_cart_link'); }

    addProductToCart(productName) {
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        cy.get(`[data-test="add-to-cart-${productId}"]`).click();
    }

    getCartBadgeCount() {
        return this.cartBadge.invoke('text');
    }

    goToCart() {
        this.shoppingCartLink.click();
    }
}

export const inventoryPage = new InventoryPage();
