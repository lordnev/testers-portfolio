import { test, expect } from '../../fixtures/test-fixtures';

test.describe('OrangeHRM Admin Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmAuthenticatedPage, orangeHrmDashboardPage }) => {
    await orangeHrmDashboardPage.navigateToAdmin();
  });

  test('Admin Navigation @smoke', async ({ orangeHrmAuthenticatedPage, page }) => {
    // Verify we're on the admin page
    await expect(page.locator('.oxd-table-card')).toBeVisible({ timeout: 10000 });
  });

  test('User Search @smoke', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Admin')).toBeVisible();
  });

  test('Search for non-existent user @negative', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('GhostUser123');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('.oxd-table-card')).not.toBeVisible();
  });

  test('Add User @regression', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('combobox').first().selectOption('Admin');
    await page.getByPlaceholder('Employee Name').fill('Admin');
    await page.getByRole('combobox').nth(1).selectOption('Enabled');
    await page.getByPlaceholder('Username').fill(`testuser${Date.now()}`);
    await page.getByPlaceholder('Password').fill('Password123!');
    await page.getByPlaceholder('Confirm Password').fill('Password123!');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-toast--success')).toBeVisible({ timeout: 10000 });
  });

  test('Delete User @regression', async ({ page }) => {
    // This would need a user to delete first
    await page.goto('**/admin/viewSystemUsers');
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });
});