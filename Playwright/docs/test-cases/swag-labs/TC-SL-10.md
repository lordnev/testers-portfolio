# Test Case: TC-SL-10 - Inventory Sort Descending

**Priority:** Low | **Status:** Passed

### Description
Verify that products can be sorted by price in descending order.

### Preconditions
- User is logged in.
- On the Inventory page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | : same as before |
| 1 | Select "Price (high to low)" from the sort dropdown | List is updated |
| 2 | Verify the first product's price | The most expensive product is at the top |

### Post-conditions
- Inventory list is sorted correctly.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/InventoryPage.ts`
