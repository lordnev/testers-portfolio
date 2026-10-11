# Bug Report: BUG-13 - DemoQA: Email Validation accepts missing TLD

**Severity:** S2-Major
**Priority:** P2-High
**Status:** New
**Environment:** Chromium, Windows 11, DemoQA

### Steps to Reproduce
1. Navigate to the Practice Form.
2. Enter an email like "test@company" (missing .com, .pl, etc.).
3. Click Submit.

### Actual Result
The form is submitted without any validation error for the missing Top-Level Domain (TLD).

### Expected Result
The system should validate that the email follows the standard `user@domain.tld` format.

### Automation Reference
- **Affected Test:** `tests/demoqa/demoqa.spec.ts`
