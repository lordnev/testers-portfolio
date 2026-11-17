# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Swag-Labs\login.spec.ts >> Swag Labs Login Tests >> Verify error message visibility @ui
- Location: tests\Swag-Labs\login.spec.ts:37:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test="error-container"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-test="error-container"]')

```

```yaml
- text: Swag Labs
- main:
  - form "Login":
    - textbox "Username": invalid
    - textbox "Password": invalid
    - alert:
      - button "Dismiss error"
      - text: "Epic sadface: Username and password do not match any user in this service"
    - button "Login"
  - heading "Accepted usernames are:" [level=4]
  - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  - heading "Password for all users:" [level=4]
  - text: secret_sauce
```

# Test source

```ts
  1  | import { Page, expect, Locator } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |     private readonly page: Page;
  5  |     private readonly usernameInput: Locator;
  6  |     private readonly passwordInput: Locator;
  7  |     private readonly loginButton: Locator;
  8  |     private readonly errorMessage: Locator;
  9  |     private readonly errorContainer: Locator;
  10 | 
  11 |     constructor(page: Page) {
  12 |         this.page = page;
  13 |         this.usernameInput = page.locator('[data-test="username"]');
  14 |         this.passwordInput = page.locator('[data-test="password"]');
  15 |         this.loginButton = page.locator('[data-test="login-button"]');
  16 |         this.errorMessage = page.locator('[data-test="error"]');
  17 |         this.errorContainer = page.locator('[data-test="error-container"]');
  18 |     }
  19 | 
  20 |     async goto() {
  21 |         await this.page.goto('https://www.saucedemo.com/');
  22 |         await this.waitForLoad();
  23 |     }
  24 | 
  25 |     async waitForLoad() {
  26 |         await this.usernameInput.waitFor({ state: 'visible' });
  27 |         await this.loginButton.waitFor({ state: 'visible' });
  28 |     }
  29 | 
  30 |     async login(username: string, password: string) {
  31 |         await this.usernameInput.clear();
  32 |         await this.usernameInput.fill(username);
  33 |         await this.passwordInput.clear();
  34 |         await this.passwordInput.fill(password);
  35 |         await this.loginButton.click();
  36 |     }
  37 | 
  38 |     async getErrorMessage(): Promise<string | null> {
  39 |         return await this.errorMessage.textContent();
  40 |     }
  41 | 
  42 |     async isErrorVisible(): Promise<boolean> {
  43 |         return await this.errorContainer.isVisible();
  44 |     }
  45 | 
  46 |     async clearCredentials() {
  47 |         await this.usernameInput.clear();
  48 |         await this.passwordInput.clear();
  49 |     }
  50 | 
  51 |     async expectErrorMessage(message: string) {
> 52 |         await expect(this.errorContainer).toBeVisible();
     |                                           ^ Error: expect(locator).toBeVisible() failed
  53 |         await expect(this.errorMessage).toContainText(message);
  54 |     }
  55 | 
  56 |     async expectSuccess() {
  57 |         await expect(this.page).toHaveURL(/.*inventory/);
  58 |     }
  59 | 
  60 |     async verifyPageElements() {
  61 |         await expect(this.usernameInput).toBeVisible();
  62 |         await expect(this.passwordInput).toBeVisible();
  63 |         await expect(this.loginButton).toBeVisible();
  64 |     }
  65 | }
  66 | 
```