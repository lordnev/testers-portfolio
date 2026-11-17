import { test, expect } from '../../fixtures/test-fixtures';
import { ORANGEHRM_USERS } from '../../utils/test-data-generators';

test.describe('OrangeHRM Auth Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmLoginPage }) => {
    await orangeHrmLoginPage.goto();
  });

  test('Successful Login @smoke', async ({ orangeHrmLoginPage, orangeHrmDashboardPage }) => {
    const credentials = ORANGEHRM_USERS.admin;
    await orangeHrmLoginPage.login(credentials.username, credentials.password);
    await orangeHrmDashboardPage.verifyLoaded();
  });

  test('Invalid Login - Wrong Password @negative', async ({ orangeHrmLoginPage }) => {
    await orangeHrmLoginPage.login(ORANGEHRM_USERS.admin.username, 'WrongPassword123');
    await orangeHrmLoginPage.verifyErrorMessage();
  });

  test('Invalid Login - Non-existent User @negative', async ({ orangeHrmLoginPage }) => {
    await orangeHrmLoginPage.login('NonExistentUser', 'admin123');
    await orangeHrmLoginPage.verifyErrorMessage();
  });

  test('Empty Credentials Login @negative', async ({ orangeHrmLoginPage }) => {
    await orangeHrmLoginPage.login('', '');
    await orangeHrmLoginPage.verifyErrorMessage();
  });

  test('Logout Process @smoke @e2e', async ({ orangeHrmLoginPage, orangeHrmDashboardPage, page }) => {
    await orangeHrmLoginPage.login(ORANGEHRM_USERS.admin.username, ORANGEHRM_USERS.admin.password);
    await orangeHrmDashboardPage.verifyLoaded();
    await orangeHrmDashboardPage.logout();
    await expect(page).toHaveURL(/.*auth\/login/);
  });

  test('Verify login page elements @ui', async ({ orangeHrmLoginPage }) => {
    await orangeHrmLoginPage.verifyPageElements();
  });

  test('Login with credentials from env @smoke', async ({ orangeHrmLoginPage, orangeHrmDashboardPage }) => {
    const username = process.env.ORANGEHRM_USERNAME!;
    const password = process.env.ORANGEHRM_PASSWORD!;
    await orangeHrmLoginPage.login(username, password);
    await orangeHrmDashboardPage.verifyLoaded();
  });
});