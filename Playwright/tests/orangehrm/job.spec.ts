import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { JobPage } from '../../PageObjects/orangehrm/JobPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM Job Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let jobPage: JobPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        jobPage = new JobPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await page.goto('**/admin/viewJobTitles');
    });

    test('Job Vacancy List Load', async () => {
        await expect(jobPage.jobTable).toBeVisible();
    });

    test('Add Job Vacancy', async () => {
        await jobPage.addJobVacancy('QA Automation Engineer', 'Experience with Playwright');
        await expect(jobPage.jobTable).toBeVisible();
    });

    test('Job Search', async ({ page }) => {
        await page.locator('input[placeholder="Job Title"]').fill('QA');
        await page.locator('button[type="submit"]').click();
        await expect(jobPage.jobTable).toBeVisible();
    });

    test('Job Description Verification', async () => {
        await jobPage.verifyJobExists('QA Automation Engineer');
    });
});
