import { HomePage } from '../pages/shop/HomePage';
import { LoginPage } from '../pages/shop/LoginPage';
import { ShopPage } from '../pages/shop/ShopPage';

describe('Shop Tests - Tester Portfolio', () => {

  it('Verify presence of key subpages (Terms and Conditions, Privacy Policy, Contact)', () => {
    const homePage = new HomePage();
    
    // Step 1: Navigate to the home page
    homePage.goto();
    
    // Step 2: Verify that pages exist and links are visible
    homePage.checkRegulaminExists();
    homePage.checkPolitykaPrywatnosciExists();
    homePage.checkKontaktExists();
  });

  it('Login to WP Admin panel - login form availability', () => {
    const loginPage = new LoginPage();
    
    // Step 1: Navigate to the WP-Admin login page
    loginPage.goto();
    
    // Step 2: Verify visibility of login fields (username, password, button)
    loginPage.checkLoginFieldsVisible();
  });

  it('Verify product visibility in the store', () => {
    const shopPage = new ShopPage();
    
    // Step 1: Navigate to the store view
    shopPage.goto();
    
    // Step 2: Verify that products load and are visible
    shopPage.checkProductsVisible();
  });

});
