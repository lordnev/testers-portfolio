import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { RecruitmentPage } from '../../PageObjects/orangehrm/RecruitmentPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM Recruitment Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let recruitmentPage: RecruitmentPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        recruitmentPage = new RecruitmentPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await page.goto('**/recruitment/viewCandidates');
    });

    test('Candidate List Load', async () => {
        await expect(recruitmentPage.candidateTable).toBeVisible();
    });

    test('Add Candidate', async () => {
        const firstName = 'Recruit';
        const lastName = 'User' + Math.floor(Math.random() * 1000);
        const email = `${lastName}@example.com`;
        await recruitmentPage.addCandidate(firstName, lastName, email);
        await expect(recruitmentPage.candidateTable).toBeVisible();
    });

    test('Update Candidate Status', async () => {
        await recruitmentPage.updateCandidateStatus('Admin', 'Interview');
        await expect(recruitmentPage.candidateTable).toBeVisible();
    });

    test('Candidate Search', async ({ page }) => {
        await page.locator('input[placeholder="Candidate Name"]').fill('Admin');
        await page.locator('button[type="submit"]').click();
        await expect(recruitmentPage.candidateTable).toBeVisible();
    });

    test('Filter Candidates by Status', async ({ page }) => {
        await page.locator('.oxd-select-text').first().click();
        await page.locator('div:has-text("Applied")').click();
        await page.locator('button[type="submit"]').click();
        await expect(recruitmentPage.candidateTable).toBeVisible();
    });

    test('Invalid Candidate Data Validation', async () => {
        await recruitmentPage.addCandidateBtn.click();
        await recruitmentPage.saveBtn.click();
        await expect(recruitmentPage.page.locator('.oxd-alert-content-text')).toBeVisible();
    });
});
