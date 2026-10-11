# Bug Report: BUG-03 - Hardcoded Test Data Dependency

**Severity:** S2-Major
**Priority:** P2-High
**Status:** New
**Environment:** Chromium, Windows 11, OrangeHRM

### Steps to Reproduce
1. Review tests in `tests/orangehrm/admin.spec.ts` and `tests/orangehrm/pim.spec.ts`.
2. Search for the string "Admin" used as a search criterion.

### Actual Result
Multiple test suites rely on a hardcoded user named "Admin" being present in the system. If this user is deleted, multiple unrelated tests will fail.

### Expected Result
Tests should use dynamic data or a guaranteed setup script to ensure the required test user exists before execution.

### Automation Reference
- **Affected Tests:** `tests/orangehrm/admin.spec.ts`, `tests/orangehrm/pim.spec.ts`, `tests/orangehrm/recruitment.spec.ts`
