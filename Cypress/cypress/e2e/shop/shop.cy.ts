import { HomePage } from '../pages/shop/HomePage';
import { LoginPage } from '../pages/shop/LoginPage';
import { ShopPage } from '../pages/shop/ShopPage';

describe('Shop Tests - Tester Portfolio', { tags: ['@ui'] }, () => {
  it('Verify presence of key subpages (Terms and Conditions, Privacy Policy, Contact)', { tags: ['@smoke'] }, () => {
    const homePage = new HomePage();

    homePage.goto();
    homePage.checkRegulaminExists();
    homePage.checkPolitykaPrywatnosciExists();
    homePage.checkKontaktExists();
  });

  it('Login to WP Admin panel - login form availability', { tags: ['@smoke'] }, () => {
    const loginPage = new LoginPage();

    loginPage.goto();
    loginPage.checkLoginFieldsVisible();
  });

  it('Verify product visibility in the store', { tags: ['@smoke'] }, () => {
    const shopPage = new ShopPage();

    shopPage.goto();
    shopPage.checkProductsVisible();
  });

  it('Verify navigation to shop page', { tags: ['@regression'] }, () => {
    const homePage = new HomePage();
    const shopPage = new ShopPage();

    homePage.goto();
    homePage.goToShop();
    shopPage.checkProductsVisible();
  });

  it('Verify product details accessible', { tags: ['@regression'] }, () => {
    const shopPage = new ShopPage();
    const productName = 'Hi-Fi Headphones';

    shopPage.goto();
    shopPage.selectProduct(productName);
    cy.url().should('include', 'product');
  });
});