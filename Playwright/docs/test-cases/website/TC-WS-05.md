# Test Case: TC-WS-05 - Order Summary Verification

**Priority:** High | **Status:** Passed

### Description
Verify that the order summary accurately reflects the placed order details.

### Preconditions
- User has just completed a purchase.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Observe the Order Summary page | Order ID, Date, and Total are visible |
| 2 | Verify user email in summary | Email matches the one used during checkout |

### Post-conditions
- Order confirmation is verified.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/CheckoutPage.ts`
