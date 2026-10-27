import { Page, Locator } from '@playwright/test';

export class WikipediaAuthPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginSubmitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: /Log in/i }).or(page.locator('a#ca-login')).or(page.locator('a[href*="Special:UserLogin"]')).first();
        this.usernameInput = page.getByLabel(/Username/i).or(page.locator('input#wpUserName').first());
        this.passwordInput = page.getByLabel(/Password/i).or(page.locator('input#wpPassword').first());
        this.loginSubmitButton = page.getByRole('button', { name: /Log in/i }).or(page.locator('button[type="submit"]').first());
        this.errorMessage = page.locator('.error').or(page.locator('.mw-error-container').first());
    }

    async login(user: string, pass: string) {
        await this.loginLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.loginLink.click();
        await this.page.waitForLoadState('networkidle');

        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginSubmitButton.click();
    }
}
