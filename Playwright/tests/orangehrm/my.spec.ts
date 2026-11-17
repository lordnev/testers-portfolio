import { test, expect } from '../../fixtures/test-fixtures';

test.describe('OrangeHRM My Page Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmAuthenticatedPage, orangeHrmDashboardPage }) => {
    await orangeHrmDashboardPage.navigateToMy();
  });

  test('My Page Personal Info @smoke', async ({ orangeHrmAuthenticatedPage, page }) => {
    await expect(page.locator('.oxd-card')).toBeVisible();
    await expect(page.getByText('Personal Details')).toBeVisible();
  });

  test('Verify personal contact details load @smoke', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact Details' }).click();
    await expect(page.getByText('Contact Details')).toBeVisible();
  });

  test('Check profile picture visibility @smoke', async ({ page }) => {
    await expect(page.locator('.oxd-userprofile-image')).toBeVisible();
  });

  test('Update personal details @regression', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByPlaceholder('First Name').clear();
    await page.getByPlaceholder('First Name').fill('Updated');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-toast--success')).toBeVisible({ timeout: 10000 });
  });

  test('Add attachment @regression', async ({ page }) => {
    await page.getByRole('link', { name: 'Attachments' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });
});