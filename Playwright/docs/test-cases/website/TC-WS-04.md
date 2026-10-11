# Test Case: TC-WS-04 - Guest Checkout Attempt

**Priority:** Medium | **Status:** Passed

### Description
Verify the system behavior when trying to proceed to checkout without selecting a product.

### Preconditions
- Browser is open.
- Navigated to Shop page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate directly to Checkout page | System redirects to Shop or displays "Cart is empty" |

### Post-conditions
- Checkout is blocked for empty carts.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/CheckoutPage.ts`
