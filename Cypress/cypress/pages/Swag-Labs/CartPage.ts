export class CartPage {
  private readonly selectors = {
    cartItem: '.cart_item',
    itemName: '.inventory_item_name',
    continueShopping: '[data-test="continue-shopping"]',
    checkoutButton: '[data-test="checkout"]',
  } as const;

  get cartItems() { return cy.get(this.selectors.cartItem); }
  get continueShopping() { return cy.get(this.selectors.continueShopping); }
  get checkoutButton() { return cy.get(this.selectors.checkoutButton); }

  isProductInCart(productName: string): Cypress.Chainable<boolean> {
    return this.cartItems
      .find(this.selectors.itemName)
      .contains(productName)
      .should('be.visible')
      .then(() => true)
      .catch(() => false);
  }

  proceedToCheckout(): void {
    this.checkoutButton.click();
  }

  continueShoppingClick(): void {
    this.continueShopping.click();
  }

  getItemCount(): Cypress.Chainable<number> {
    return this.cartItems.then(($items) => $items.length);
  }
}

export const cartPage = new CartPage();