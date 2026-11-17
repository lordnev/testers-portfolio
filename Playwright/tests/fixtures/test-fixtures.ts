import { test as base, type Page, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../PageObjects/Swag-Labs/LoginPage';
import { InventoryPage } from '../../PageObjects/Swag-Labs/InventoryPage';
import { CartPage } from '../../PageObjects/Swag-Labs/CartPage';
import { CheckoutPage } from '../../PageObjects/Swag-Labs/CheckoutPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { LoginPage as OrangeHrmLoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { ApiClient } from '../utils/api-helpers';
import { generateTestUser, TEST_USERS, type UserData } from '../utils/test-data-generators';

// Define fixture types
type TestFixtures = {
  // Page Objects
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orangeHrmLoginPage: OrangeHrmLoginPage;
  orangeHrmDashboardPage: DashboardPage;

  // Pre-authenticated pages
  authenticatedPage: Page;
  orangeHrmAuthenticatedPage: Page;

  // API Client
  apiClient: ApiClient;

  // Test data
  testData: {
    user: string;
    product: string;
    credentials: { username: string; password: string };
    userData: UserData;
  };

  // Test users for data-driven tests
  testUsers: typeof TEST_USERS;
};

// Extend base test with custom fixtures
export const test = base.extend<TestFixtures>({
  // Page Object fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  orangeHrmLoginPage: async ({ page }, use) => {
    await use(new OrangeHrmLoginPage(page));
  },

  orangeHrmDashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // Pre-authenticated page for Swag Labs
  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/.*inventory/);
    await use(page);
  },

  // Pre-authenticated page for OrangeHRM
  orangeHrmAuthenticatedPage: async ({ page, orangeHrmLoginPage, orangeHrmDashboardPage }, use) => {
    const username = process.env.ORANGEHRM_USERNAME!;
    const password = process.env.ORANGEHRM_PASSWORD!;
    await orangeHrmLoginPage.goto();
    await orangeHrmLoginPage.login(username, password);
    await orangeHrmDashboardPage.verifyLoaded();
    await use(page);
  },

  // API Client fixture
  apiClient: async ({ request }, use) => {
    const baseUrl = process.env.BASE_URL || 'https://reqres.in';
    await use(new ApiClient(request, baseUrl));
  },

  // Test data fixture
  testData: async ({}, use) => {
    await use({
      user: 'standard_user',
      product: 'Sauce Labs Backpack',
      credentials: { username: 'standard_user', password: 'secret_sauce' },
      userData: generateTestUser(),
    });
  },

  // Test users for data-driven tests
  testUsers: async ({}, use) => {
    await use(TEST_USERS);
  },
});

export { expect } from '@playwright/test';