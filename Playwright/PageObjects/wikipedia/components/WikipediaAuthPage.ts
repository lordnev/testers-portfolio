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
        // Corrected selectors: Using separate .or() calls for different types of selectors (CSS vs Text)
        this.loginLink = page.locator('a#ca-login')
            .or(page.locator('a[href*="Special:UserLogin"]'))
            .or(page.getByText('Log in', { exact: false }))
            .or(page.getByText('Zaloguj się', { exact: false }))
            .first();

        this.usernameInput = page.locator('input#wpLoggedInuserName')
            .or(page.locator('input#wpUserName'))
            .first();

        this.passwordInput = page.locator('input#wpLoggedInPassword')
            .or(page.locator('input#wpPassword'))
            .first();

        this.loginSubmitButton = page.locator('button[type="submit"]')
            .or(page.locator('input[type="submit"]'))
            .first();

        this.errorMessage = page.locator('.error')
            .or(page.locator('.mw-error-container'))
            .first();
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
