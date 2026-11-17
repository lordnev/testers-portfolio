# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Swag-Labs\login.spec.ts >> Swag Labs Login Tests >> Verify error message visibility @ui
- Location: tests\Swag-Labs\login.spec.ts:37:7

# Error details

```
TypeError: loginPage.isErrorVisible is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - main [ref=e5]:
    - form "Login" [ref=e9]:
      - textbox "Username" [ref=e11]: invalid
      - textbox "Password" [ref=e15]: invalid
      - alert [ref=e19]:
        - button "Dismiss error" [ref=e20] [cursor=pointer]
        - text: "Epic sadface: Username and password do not match any user in this service"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/test-fixtures';
  2  | import { SWAG_LABS_USERS, type SwagLabsUserType } from '../utils/test-data-generators';
  3  | 
  4  | test.describe('Swag Labs Login Tests', () => {
  5  |   test.describe.configure({ retries: 1 });
  6  | 
  7  |   test.beforeEach(async ({ loginPage }) => {
  8  |     await loginPage.goto();
  9  |   });
  10 | 
  11 |   // Test all user types
  12 |   for (const [userType, userData] of Object.entries(SWAG_LABS_USERS) as [SwagLabsUserType, typeof SWAG_LABS_USERS[keyof typeof SWAG_LABS_USERS]][]) {
  13 |     test(`Login with ${userData.description} (${userType}) @smoke @data-driven`, async ({ loginPage, page }) => {
  14 |       await loginPage.login(userData.username, userData.password);
  15 | 
  16 |       if (userData.expectsSuccess) {
  17 |         await expect(page).toHaveURL(/.*inventory/);
  18 |       } else {
  19 |         const error = await loginPage.getErrorMessage();
  20 |         expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  21 |       }
  22 |     });
  23 |   }
  24 | 
  25 |   test('Login with empty credentials @negative', async ({ loginPage, page }) => {
  26 |     await loginPage.login('', '');
  27 |     const error = await loginPage.getErrorMessage();
  28 |     expect(error).toContain('Epic sadface: Username is required');
  29 |   });
  30 | 
  31 |   test('Login with invalid password @negative', async ({ loginPage, page }) => {
  32 |     await loginPage.login('standard_user', 'wrong_password');
  33 |     const error = await loginPage.getErrorMessage();
  34 |     expect(error).toContain('Epic sadface: Username and password do not match');
  35 |   });
  36 | 
  37 |   test('Verify error message visibility @ui', async ({ loginPage }) => {
  38 |     await loginPage.login('invalid', 'invalid');
> 39 |     const isErrorVisible = await loginPage.isErrorVisible();
     |                                            ^ TypeError: loginPage.isErrorVisible is not a function
  40 |     expect(isErrorVisible).toBe(true);
  41 |   });
  42 | 
  43 |   test('Clear credentials after failed login @ui', async ({ loginPage, page }) => {
  44 |     await loginPage.login('invalid', 'invalid');
  45 |     await loginPage.clearCredentials();
  46 | 
  47 |     const usernameValue = await loginPage.page.locator('[data-test="username"]').inputValue();
  48 |     const passwordValue = await loginPage.page.locator('[data-test="password"]').inputValue();
  49 | 
  50 |     expect(usernameValue).toBe('');
  51 |     expect(passwordValue).toBe('');
  52 |   });
  53 | });
```