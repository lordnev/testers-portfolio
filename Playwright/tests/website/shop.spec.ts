import { expect, test } from '@playwright/test';
import { HomePage } from '../../PageObjects/HomePage';
import { LoginPage } from '../../PageObjects/LoginPage';
import { ShopPage } from '../../PageObjects/ShopPage';
import { ProductPage } from '../../PageObjects/ProductPage';
import { CheckoutPage } from '../../PageObjects/CheckoutPage';
import { ConsoleLog } from '../../PageObjects/ConsoleLog';

test.describe('Shop Tests - Testers Portfolio', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let shopPage: ShopPage;
  let productPage: ProductPage;
  let checkoutPage: CheckoutPage;
  let consoleLog: ConsoleLog;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    shopPage = new ShopPage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);
    consoleLog = new ConsoleLog(page);
  });

  test('Verification of key subpages presence (Terms, Policy, Contact)', async () => {
    await homePage.goto();
    await homePage.checkRegulaminExists();
    await homePage.checkPolitykaPrywatnosciExists();
    await homePage.checkKontaktExists();
  });

  test('Login to WP Admin panel - login form availability', async ({ page }) => {
    await loginPage.goto();
    await loginPage.checkLoginFieldsVisible();
    await loginPage.login();
    await expect(page.getByRole('heading', { name: 'Moje konto' })).toBeVisible();
  });

  test('Verification of product visibility in the store', async () => {
    await shopPage.goto();
    await shopPage.checkProductsVisible();
  });

  test.only('Order Wi-Fi headphones with traditional transfer and slingshot delivery', async () => {
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
});
