# Bug Report: BUG-06 - OrangeHRM Job Description Truncation

**Severity:** S3-Minor
**Priority:** P3-Medium
**Status:** New
**Environment:** Chromium, Windows 11, OrangeHRM

### Steps to Reproduce
1. Navigate to Job module.
2. Add a new job vacancy.
3. Enter a very long description (> 2000 characters).
4. Save and view the vacancy.

### Actual Result
The description is truncated at 2000 characters without any warning to the user.

### Expected Result
The system should either support longer descriptions or provide a character limit warning.

### Automation Reference
- **Affected Test:** `tests/orangehrm/job.spec.ts`
