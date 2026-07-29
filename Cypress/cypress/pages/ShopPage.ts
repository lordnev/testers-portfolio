export class ShopPage {
  goto() {
    cy.visit(Cypress.env('SHOP_URL'));
  }

  checkProductsVisible() {
    const products = cy.get('.product, .type-product');
    
    products.first().should('be.visible');
    products.should('have.length.greaterThan', 0);
  }
}
