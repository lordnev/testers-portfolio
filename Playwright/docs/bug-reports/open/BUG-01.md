# Bug Report: BUG-01 - Missing Navigation Methods in DashboardPage

**Severity:** S3-Minor
**Priority:** P3-Medium
**Status:** New
**Environment:** Chromium, Windows 11, OrangeHRM

### Steps to Reproduce
1. Open `tests/orangehrm/performance.spec.ts`.
2. Observe the use of `page.goto()` to reach the Performance module.
3. Check `PageObjects/orangehrm/DashboardPage.ts`.

### Actual Result
The `DashboardPage` object does not have a method to navigate to the Performance module, forcing the test to use raw URL navigation.

### Expected Result
The `DashboardPage` should provide a `navigateToPerformance()` method to maintain the Page Object Model (POM) consistency.

### Automation Reference
- **Failed Test:** `tests/orangehrm/performance.spec.ts`
- **Missing in:** `PageObjects/orangehrm/DashboardPage.ts`
