import { test, expect } from '../../fixtures/test-fixtures';
import { CartPage } from '../../PageObjects/Swag-Labs/CartPage';
import { CheckoutPage } from '../../PageObjects/Swag-Labs/CheckoutPage';
import { generateTestUser } from '../../utils/test-data-generators';

test.describe('Swag Labs E2E Purchase Flow', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ loginPage, testData }) => {
    await loginPage.goto();
    await loginPage.login(testData.credentials.username, testData.credentials.password);
    await expect(loginPage.page).toHaveURL(/.*inventory/);
  });

  test('Complete purchase flow @smoke @e2e', async ({ page, inventoryPage, testData }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Add product to cart
    await test.step('Add product to cart', async () => {
      await inventoryPage.addProductToCart(testData.product);
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe('1');
    });

    // Step 2: Verify cart contents
    await test.step('Verify cart contents', async () => {
      await inventoryPage.goToCart();
      const isInCart = await cartPage.isProductInCart(testData.product);
      expect(isInCart).toBe(true);
    });

    // Step 3: Complete checkout
    await test.step('Complete checkout process', async () => {
      await cartPage.proceedToCheckout();

      const userData = generateTestUser();
      await checkoutPage.fillCheckoutInformation(userData);
      await checkoutPage.continueToOverview();
      await checkoutPage.finishPurchase();
    });

    // Step 4: Final verification
    await test.step('Verify order completion', async () => {
      const completionMsg = await checkoutPage.getCompletionMessage();
      expect(completionMsg).toContain('Thank you for your order!');
    });
  });

  test('Purchase flow with different products @regression @data-driven', async ({ page, inventoryPage }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    for (const product of products) {
      await test.step(`Purchase ${product}`, async () => {
        await inventoryPage.addProductToCart(product);
        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe('1');

        await inventoryPage.goToCart();
        const isInCart = await cartPage.isProductInCart(product);
        expect(isInCart).toBe(true);

        await cartPage.proceedToCheckout();
        const userData = generateTestUser();
        await checkoutPage.fillCheckoutInformation(userData);
        await checkoutPage.continueToOverview();
        await checkoutPage.finishPurchase();

        const completionMsg = await checkoutPage.getCompletionMessage();
        expect(completionMsg).toContain('Thank you for your order!');

        // Go back to inventory for next product
        await page.goto('https://www.saucedemo.com/inventory.html');
      });
    }
  });
});