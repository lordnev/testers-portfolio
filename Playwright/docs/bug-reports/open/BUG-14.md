# Bug Report: BUG-14 - The Internet: Form Auth redirects to login on logout

**Severity:** S3-Minor
**Priority:** P3-Medium
**Status:** New
**Environment:** Chromium, Windows 11, The Internet

### Steps to Reproduce
1. Log in to the Secure Area.
2. Click "Logout".

### Actual Result
The user is redirected to the login page, but the session cookie is still active for a few seconds, allowing a "Back" button click to briefly show the secure page.

### Expected Result
Logout should immediately invalidate the session and prevent any access to the secure area.

### Automation Reference
- **Affected Test:** `tests/the-internet/the-internet.spec.ts`
