# Bug Report: BUG-07 - Swag Labs: Inventory Page Load Delay

**Severity:** S3-Minor
**Priority:** P3-Medium
**Status:** New
**Environment:** Chromium, Windows 11, Swag Labs

### Steps to Reproduce
1. Use `performance_glitch_user` to log in.
2. Observe the time it takes for the inventory list to render.

### Actual Result
The inventory page takes significantly longer (> 5s) to load compared to `standard_user`, leading to occasional timeout failures in automation.

### Expected Result
Load times should be consistent across different user profiles, or timeouts should be dynamically adjusted.

### Automation Reference
- **Affected Test:** `tests/Swag-Labs/swag-labs-login.spec.ts`
