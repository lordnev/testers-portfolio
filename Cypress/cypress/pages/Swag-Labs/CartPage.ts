export class CartPage {
    get cartItem() { return cy.get('.cart_item'); }
    get checkoutButton() { return cy.get('[data-test="checkout"]'); }

    isProductInCart(productName) {
        this.cartItem.should('contain', productName);
    }

    proceedToCheckout() {
        this.checkoutButton.click();
    }
}

export const cartPage = new CartPage();
