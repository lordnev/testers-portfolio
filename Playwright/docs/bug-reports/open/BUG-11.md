# Bug Report: BUG-11 - OrangeHRM: Leave Balance Calculation Error

**Severity:** S2-Major
**Priority:** P2-High
**Status:** New
**Environment:** Chromium, Windows 11, OrangeHRM

### Steps to Reproduce
1. Log in as an employee.
2. Apply for a 2-day leave.
3. Check "Leave Balance" immediately after submission.

### Actual Result
The leave balance is not updated immediately; it requires a page refresh to show the deducted days.

### Expected Result
The leave balance should be updated dynamically via AJAX or upon successful form submission.

### Automation Reference
- **Affected Test:** `tests/orangehrm/leave.spec.ts`
