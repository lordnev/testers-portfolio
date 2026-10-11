# Test Case: TC-SL-04 - Cart Item Verification

**Priority:** Medium | **Status:** Passed

### Description
Verify that the items added to the cart are correctly listed on the Cart page.

### Preconditions
- User is logged in.
- At least one item has been added to the cart.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to the Cart page | Cart page is displayed |
| 2 | Verify the product name in the list | Added product is visible in the cart |

### Post-conditions
- Cart contents are verified.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/CartPage.ts`
