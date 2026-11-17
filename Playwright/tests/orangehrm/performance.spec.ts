import { test, expect } from '../../fixtures/test-fixtures';

test.describe('OrangeHRM Performance Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmAuthenticatedPage, orangeHrmDashboardPage }) => {
    await orangeHrmDashboardPage.navigateToAdmin();
    await orangeHrmAuthenticatedPage.goto('**/performance/viewPerformanceReviews');
  });

  test('Navigate to Performance module @smoke', async ({ orangeHrmAuthenticatedPage }) => {
    await expect(orangeHrmAuthenticatedPage).toHaveURL(/.*performance/);
  });

  test('Verify review list load @smoke', async ({ page }) => {
    await expect(page.locator('.oxd-table-card')).toBeVisible({ timeout: 10000 });
  });

  test('Add Performance Review @regression', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('Employee Name').fill('Admin');
    await page.getByRole('combobox').selectOption('Annual');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });

  test('Search Performance Reviews @regression', async ({ page }) => {
    await page.getByPlaceholder('Employee Name').fill('Admin');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });
});