# Bug Report: BUG-04 - Security Risk: Missing Environment Variables for Login

**Severity:** S1-Critical
**Priority:** P1-Immediate
**Status:** New
**Environment:** Chromium, Windows 11, Website (Shop)

### Steps to Reproduce
1. Open `tests/website/shop.spec.ts`.
2. Examine the `loginPage.login()` call.
3. Check the `LoginPage` Page Object in `PageObjects/website/LoginPage.ts`.

### Actual Result
The login method is called without arguments, suggesting credentials may be hardcoded within the Page Object or handled insecurely.

### Expected Result
Credentials must be passed from environment variables (`.env`) to the login method to prevent sensitive data from being committed to version control.

### Automation Reference
- **Affected Test:** `tests/website/shop.spec.ts`
- **Affected POM:** `PageObjects/website/LoginPage.ts`
