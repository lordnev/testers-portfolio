# Test Case: TC-WS-10 - Order Flow with Bank Transfer

**Priority:** High | **Status:** Passed

### Description
Verify that the order can be successfully placed using the "Przelew bankowy" (Bank Transfer) payment method.

### Preconditions
- Browser is open.
- Navigated to Checkout Payment page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Select "Przelew bankowy" | Radio button is selected |
| 2 | Click "Place Order" | Order is processed |
| 3 | Verify success message | Order confirmation is displayed |

### Post-conditions
- Order is placed with bank transfer method.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/CheckoutPage.ts`
