# Bug Report: BUG-12 - Swag Labs: Cart Badge not updating on Remove

**Severity:** S3-Minor
**Priority:** P3-Medium
**Status:** New
**Environment:** Chromium, Windows 11, Swag Labs

### Steps to Reproduce
1. Add two items to the cart.
2. Navigate to the Cart page.
3. Click "Remove" on one item.

### Actual Result
The item is removed from the list, but the cart badge (number) on the header does not update until the page is refreshed.

### Expected Result
The cart badge should decrement immediately upon removing an item.

### Automation Reference
- **Affected Test:** `tests/Swag-Labs/swag-labs.spec.ts`
