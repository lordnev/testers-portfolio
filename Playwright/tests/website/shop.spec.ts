import { test, expect } from '../../fixtures/test-fixtures';
import { HomePage } from '../../PageObjects/website/HomePage';
import { LoginPage } from '../../PageObjects/website/LoginPage';
import { ShopPage } from '../../PageObjects/website/ShopPage';
import { ProductPage } from '../../PageObjects/website/ProductPage';
import { CheckoutPage } from '../../PageObjects/website/CheckoutPage';
import { ConsoleLog } from '../../PageObjects/website/ConsoleLog';

test.describe('Shop Tests - Testers Portfolio @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ homePage, loginPage, shopPage, productPage, checkoutPage, consoleLog }) => {
    // Initialize page objects
    // Already available via fixtures
  });

  test('Verification of key subpages presence (Terms, Policy, Contact) @smoke', async ({ homePage }) => {
    await homePage.goto();
    await homePage.checkRegulaminExists();
    await homePage.checkPolitykaPrywatnosciExists();
    await homePage.checkKontaktExists();
  });

  test('Login to WP Admin panel - login form availability @smoke', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.checkLoginFieldsVisible();
    await loginPage.login();
    await expect(page.getByRole('heading', { name: 'Moje konto' })).toBeVisible();
  });

  test('Verification of product visibility in the store @smoke', async ({ shopPage }) => {
    await shopPage.goto();
    await shopPage.checkProductsVisible();
  });

  test('Order Wi-Fi headphones with traditional transfer and slingshot delivery @e2e', async ({
    homePage,
    shopPage,
    productPage,
    checkoutPage,
    consoleLog,
  }) => {
    await homePage.goto();
    await homePage.goToShop();
    await shopPage.selectProduct('Hi-Fi Headphones');
    await productPage.addProductToCart();

    await checkoutPage.goto();
    const details = await checkoutPage.fillBillingDetails();
    await checkoutPage.selectShippingMethod('Wysyłka z procy');
    await checkoutPage.selectPaymentMethod('Przelew bankowy');

    await checkoutPage.verifyOrderSuccess();
    await checkoutPage.confirmOrder();
    await checkoutPage.orderSummary(details.email);

    consoleLog.logOrderDetails(details);
  });

  test('Verify cart functionality @regression', async ({ shopPage, productPage, page }) => {
    await shopPage.goto();
    await shopPage.selectProduct('Hi-Fi Headphones');
    await productPage.addProductToCart();

    await productPage.goToCart();
    await expect(page.locator('.cart_item')).toBeVisible();
  });

  test('Verify product details page @regression', async ({ shopPage, productPage, page }) => {
    await shopPage.goto();
    await shopPage.selectProduct('Hi-Fi Headphones');

    await expect(productPage.productTitle).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();
  });
});