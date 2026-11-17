import { test, expect } from '../../fixtures/test-fixtures';
import { generateEmployeeData } from '../../utils/test-data-generators';

test.describe('OrangeHRM PIM Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmAuthenticatedPage, orangeHrmDashboardPage }) => {
    await orangeHrmDashboardPage.navigateToPIM();
  });

  test('Add Employee @smoke @e2e', async ({ orangeHrmAuthenticatedPage, page }) => {
    // This would use the PIM page object
    // For now, using direct page interactions as placeholder
    const employeeData = generateEmployeeData();

    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('First Name').fill(employeeData.firstName);
    await page.getByPlaceholder('Last Name').fill(employeeData.lastName);

    if (employeeData.employeeId) {
      await page.locator('input[placeholder="Employee Id"]').fill(employeeData.employeeId);
    }

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-table-card')).toBeVisible({ timeout: 10000 });
  });

  test('Search Employee @smoke', async ({ page }) => {
    await page.goto('**/pim/viewEmployeeList');
    await page.getByPlaceholder('Employee Name').fill('Admin');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Admin')).toBeVisible();
  });

  test('Employee List Load @smoke', async ({ page }) => {
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });

  test('Search for non-existent employee @negative', async ({ page }) => {
    await page.goto('**/pim/viewEmployeeList');
    await page.getByPlaceholder('Employee Name').fill('NonExistentEmployee123');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('No Records Found')).toBeVisible();
  });

  test('Validate required fields in Add Employee @negative', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
  });

  test('Employee Update @regression', async ({ page }) => {
    await page.goto('**/pim/viewEmployeeList');
    await page.getByPlaceholder('Employee Name').fill('Admin');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('Admin').first().click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByPlaceholder('Last Name').clear();
    await page.getByPlaceholder('Last Name').fill('UpdatedLastName');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });

  test('Complex Search @regression', async ({ page }) => {
    await page.goto('**/pim/viewEmployeeList');
    await page.getByPlaceholder('Employee Name').fill('Admin');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Admin')).toBeVisible();
  });
});