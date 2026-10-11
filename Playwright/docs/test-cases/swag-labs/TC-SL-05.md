# Test Case: TC-SL-05 - Checkout Information Submission

**Priority:** High | **Status:** Passed

### Description
Verify that the user can successfully submit their shipping information during checkout.

### Preconditions
- User is on the Checkout Information page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter First Name | Field is populated |
| 2 | Enter Last Name | Field is populated |
| 3 | Enter Zip Code | Field is populated |
| 4 | Click "Continue" | User is redirected to the Checkout Overview page |

### Post-conditions
- Shipping details are saved for the order.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/CheckoutPage.ts`
