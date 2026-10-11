# Test Case: TC-SL-03 - Product Addition to Cart

**Priority:** High | **Status:** Passed

### Description
Verify that a product can be added to the shopping cart and the cart badge updates.

### Preconditions
- User is logged in.
- On the Inventory page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Add to cart" for a product | Product is added to cart |
| 2 | Observe the cart badge in the header | Badge number increments by 1 |

### Post-conditions
- Item is stored in the cart.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/InventoryPage.ts`
