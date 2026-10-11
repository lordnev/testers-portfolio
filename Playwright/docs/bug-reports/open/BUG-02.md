# Bug Report: BUG-02 - Non-existent PDF Download Button

**Severity:** S2-Major
**Priority:** P2-High
**Status:** New
**Environment:** Chromium, Windows 11, Swag Labs

### Steps to Reproduce
1. Run `tests/Swag-Labs/swag-labs.spec.ts`.
2. Observe the `try-catch` block surrounding the PDF download action.

### Actual Result
The test attempts to download a PDF that does not exist on the live site, leading to a caught exception. This is a demonstration of a capability, not a functional test of the site.

### Expected Result
The test suite should only contain tests for existing functionality. Demo tests should be moved to a separate "demo" directory or removed from the main E2E flow.

### Automation Reference
- **Failed Test:** `tests/Swag-Labs/swag-labs.spec.ts`
