# Test Case: TC-WS-09 - Checkout Field Validation (Empty Zip)

**Priority:** Medium | **Status:** Passed

### Description
Verify that the checkout process prevents submission when the Zip code is missing.

### Preconditions
- User is on the Checkout Information page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter First and Last Name | Fields populated |
| 2 | Leave Zip Code empty | Field remains empty |
| 3 | Click "Continue" | Validation error is displayed |

### Post-conditions
- Form submission is blocked.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/CheckoutPage.ts`
