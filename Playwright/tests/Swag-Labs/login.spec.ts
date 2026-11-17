import { test, expect } from '../fixtures/test-fixtures';
import { SWAG_LABS_USERS, type SwagLabsUserType } from '../utils/test-data-generators';

test.describe('Swag Labs Login Tests', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // Test all user types
  for (const [userType, userData] of Object.entries(SWAG_LABS_USERS) as [SwagLabsUserType, typeof SWAG_LABS_USERS[keyof typeof SWAG_LABS_USERS]][]) {
    test(`Login with ${userData.description} (${userType}) @smoke @data-driven`, async ({ loginPage, page }) => {
      await loginPage.login(userData.username, userData.password);

      if (userData.expectsSuccess) {
        await expect(page).toHaveURL(/.*inventory/);
      } else {
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
      }
    });
  }

  test('Login with empty credentials @negative', async ({ loginPage, page }) => {
    await loginPage.login('', '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username is required');
  });

  test('Login with invalid password @negative', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'wrong_password');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username and password do not match');
  });

  test('Verify error message visibility @ui', async ({ loginPage }) => {
    await loginPage.login('invalid', 'invalid');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface');
  });

  test('Clear credentials after failed login @ui', async ({ loginPage, page }) => {
    await loginPage.login('invalid', 'invalid');
    await loginPage.clearCredentials();

    const usernameValue = await loginPage.page.locator('[data-test="username"]').inputValue();
    const passwordValue = await loginPage.page.locator('[data-test="password"]').inputValue();

    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });
});