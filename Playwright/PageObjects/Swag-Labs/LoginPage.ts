import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly errorContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorContainer = page.locator('[data-test="error-container"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
        await this.waitForLoad();
    }

    async waitForLoad() {
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.loginButton.waitFor({ state: 'visible' });
    }

    async login(username: string, password: string) {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible(): Promise<boolean> {
        return await this.errorContainer.isVisible();
    }

    async clearCredentials() {
        await this.usernameInput.clear();
        await this.passwordInput.clear();
    }

    async expectErrorMessage(message: string) {
        await expect(this.errorContainer).toBeVisible();
        await expect(this.errorMessage).toContainText(message);
    }

    async expectSuccess() {
        await expect(this.page).toHaveURL(/.*inventory/);
    }

    async verifyPageElements() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}
