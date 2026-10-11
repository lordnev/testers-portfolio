# Bug Report: BUG-05 - PIM Employee Update Failure on Special Characters

**Severity:** S3-Minor
**Priority:** P3-Medium
**Status:** New
**Environment:** Chromium, Windows 11, OrangeHRM

### Steps to Reproduce
1. Navigate to PIM module.
2. Select an existing employee.
3. Update the Last Name to include special characters (e.g., "O'Connor-Śmietana").
4. Click "Save".

### Actual Result
The system saves the record but renders the special characters incorrectly in the employee list (encoding issue).

### Expected Result
All Unicode characters should be rendered correctly in the UI.

### Automation Reference
- **Affected Test:** `tests/orangehrm/pim.spec.ts`
