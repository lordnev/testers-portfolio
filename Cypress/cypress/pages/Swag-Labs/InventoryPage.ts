export class InventoryPage {
  private readonly selectors = {
    cartBadge: '[data-test="shopping-cart-badge"]',
    cartLink: '[data-test="shopping-cart-link"]',
    inventoryItem: '.inventory_item',
    addToCartButton: (productName: string) => `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
    productName: '.inventory_item_name',
  } as const;

  get cartBadge() { return cy.get(this.selectors.cartBadge); }
  get cartLink() { return cy.get(this.selectors.cartLink); }
  get inventoryItems() { return cy.get(this.selectors.inventoryItem); }

  addProductToCart(productName: string): void {
    const buttonSelector = this.selectors.addToCartButton(productName);
    cy.get(buttonSelector).click();
  }

  getCartBadgeCount(): Cypress.Chainable<string> {
    return this.cartBadge.invoke('text');
  }

  goToCart(): void {
    this.cartLink.click();
  }

  verifyProductVisible(productName: string): void {
    this.inventoryItems.contains(productName).should('be.visible');
  }

  getProductPrice(productName: string): Cypress.Chainable<string> {
    return this.inventoryItems
      .contains(productName)
      .parent()
      .find('.inventory_item_price')
      .invoke('text');
  }
}

export const inventoryPage = new InventoryPage();