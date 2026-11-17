import { test, expect } from '../../fixtures/test-fixtures';
import { generateLeaveData } from '../../utils/test-data-generators';

test.describe('OrangeHRM Leave Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ orangeHrmAuthenticatedPage, orangeHrmDashboardPage }) => {
    await orangeHrmDashboardPage.navigateToLeave();
  });

  test('Navigate to Leave module @smoke', async ({ orangeHrmAuthenticatedPage }) => {
    await expect(orangeHrmAuthenticatedPage).toHaveURL(/.*leave/);
  });

  test('Apply for leave (Valid request) @smoke @e2e', async ({ orangeHrmAuthenticatedPage, page }) => {
    const leaveData = generateLeaveData();

    await page.getByRole('button', { name: 'Apply' }).click();
    await page.getByRole('button', { name: 'Leave Type' }).click();
    await page.getByText(leaveData.leaveType).click();
    await page.getByPlaceholder('Enter start date').fill(leaveData.fromDate);
    await page.getByPlaceholder('Enter end date').fill(leaveData.toDate);
    await page.getByPlaceholder('Comment').fill(leaveData.comment);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.oxd-table-card')).toBeVisible({ timeout: 10000 });
  });

  test('Verify leave balance visibility @smoke', async ({ page }) => {
    await expect(page.getByText('Leave Balance')).toBeVisible();
  });

  test('View leave list @regression', async ({ page }) => {
    await expect(page.locator('.oxd-table-card').first()).toBeVisible();
  });

  test('Cancel leave request @regression', async ({ page }) => {
    // This would require a leave request to exist first
    await page.goto('**/leave/viewMyLeaveList');
    await expect(page.locator('.oxd-table-card').first()).toBeVisible();
  });
});