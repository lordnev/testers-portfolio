import { test, expect } from '../../fixtures/test-fixtures';
import { generateJobVacancyData } from '../../utils/test-data-generators';

test.describe('OrangeHRM Job Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmAuthenticatedPage, orangeHrmDashboardPage }) => {
    await orangeHrmDashboardPage.navigateToAdmin();
    await orangeHrmAuthenticatedPage.goto('**/admin/viewJobTitles');
  });

  test('Job Vacancy List Load @smoke', async ({ page }) => {
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });

  test('Add Job Vacancy @smoke @e2e', async ({ page }) => {
    const jobData = generateJobVacancyData();

    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('Job Title').fill(jobData.title);
    await page.getByPlaceholder('Description').fill(jobData.description);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.oxd-table-card')).toBeVisible({ timeout: 10000 });
  });

  test('Job Search @regression', async ({ page }) => {
    await page.getByPlaceholder('Job Title').fill('QA');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('.oxd-table-card')).toBeVisible();
  });

  test('Job Description Verification @regression', async ({ page }) => {
    await expect(page.getByText('QA Automation Engineer')).toBeVisible();
  });

  test('Edit Job Title @regression', async ({ page }) => {
    await page.getByPlaceholder('Job Title').fill('QA');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('QA Automation Engineer').first().click();
    await page.getByPlaceholder('Job Title').clear();
    await page.getByPlaceholder('Job Title').fill('Senior QA Automation Engineer');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('.oxd-toast--success')).toBeVisible({ timeout: 10000 });
  });
});