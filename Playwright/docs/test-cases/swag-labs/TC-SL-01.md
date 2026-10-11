# Test Case: TC-SL-01 - End-to-End Purchase Flow

**Priority:** High | **Status:** Passed

### Description
Verify that a user can complete a full purchase journey from login to checkout.

### Preconditions
- Browser is open.
- Valid standard user account exists.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Log into Swag Labs | Inventory page is displayed |
| 2 | Add "Sauce Labs Backpack" to cart | Item is added, cart badge updates to '1' |
| 3 | Navigate to Cart page | Added item is visible in the cart |
| 4 | Click "Checkout" and enter shipping info | Information page is submitted |
| 5 | Click "Finish" | "Thank you for your order!" message is displayed |

### Post-conditions
- Order is successfully placed.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/InventoryPage.ts`, `CartPage.ts`, `CheckoutPage.ts`
