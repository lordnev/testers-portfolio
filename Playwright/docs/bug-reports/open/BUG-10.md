# Bug Report: BUG-10 - Website (Shop): Checkout Button Unresponsive on Mobile Viewport

**Severity:** S2-Major
**Priority:** P2-High
**Status:** New
**Environment:** Chromium (Mobile Emulation), Windows 11, Website (Shop)

### Steps to Reproduce
1. Set viewport to "iPhone 12".
2. Navigate to Checkout page.
3. Attempt to click the "Place Order" button.

### Actual Result
The button is obscured by a footer element and is not clickable.

### Expected Result
The checkout button should be fully visible and accessible on all viewport sizes.

### Automation Reference
- **Affected Test:** `tests/website/shop.spec.ts`
