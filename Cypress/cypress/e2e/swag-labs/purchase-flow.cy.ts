import { loginPage } from '../../pages/Swag-Labs/LoginPage';
import { inventoryPage } from '../../pages/Swag-Labs/InventoryPage';
import { cartPage } from '../../pages/Swag-Labs/CartPage';
import { checkoutPage } from '../../pages/Swag-Labs/CheckoutPage';

describe('Swag Labs Purchase Flow', { tags: ['@smoke', '@e2e'] }, () => {
  const product = 'Sauce Labs Backpack';

  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });

  it('Complete purchase flow', () => {
    cy.step('Add product to cart');
    inventoryPage.addProductToCart(product);
    inventoryPage.getCartBadgeCount().should('eq', '1');

    cy.step('Verify cart contents');
    inventoryPage.goToCart();
    cartPage.isProductInCart(product);

    cy.step('Complete checkout');
    cartPage.proceedToCheckout();

    cy.task('generateUser').then((userData: any) => {
      checkoutPage.fillCheckoutInformation(userData);
      checkoutPage.continueToOverview();
      checkoutPage.finishPurchase();
    });

    cy.step('Verify order completion');
    checkoutPage.getCompletionMessage().should('contain', 'Thank you for your order!');
  });

  it('Purchase flow with different products', { tags: ['@regression', '@data-driven'] }, () => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    products.forEach((product) => {
      cy.step(`Purchase ${product}`);
      inventoryPage.addProductToCart(product);
      inventoryPage.getCartBadgeCount().should('eq', '1');

      inventoryPage.goToCart();
      cartPage.isProductInCart(product);

      cartPage.proceedToCheckout();
      cy.task('generateUser').then((userData: any) => {
        checkoutPage.fillCheckoutInformation(userData);
        checkoutPage.continueToOverview();
        checkoutPage.finishPurchase();
      });

      checkoutPage.getCompletionMessage().should('contain', 'Thank you for your order!');

      // Go back to inventory for next product
      cy.visit('/inventory.html');
    });
  });
});