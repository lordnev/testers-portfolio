# Test Case: TC-SL-07 - Checkout Overview Verification

**Priority:** Medium | **Status:** Passed

### Description
Verify that the order summary is correctly displayed on the Checkout Overview page.

### Preconditions
- User has completed the information step of the checkout.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Observe the Order Summary section | Product name and price are visible |
| 2 | Verify Total amount | Total price is correctly calculated |

### Post-conditions
- Order details are verified before final submission.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/CheckoutPage.ts`
