# Test Case: TC-WS-08 - Shopping Cart Persistence

**Priority:** Medium | **Status:** Passed

### Description
Verify that items in the shopping cart persist after a page refresh.

### Preconditions
- User is logged in.
- At least one item is added to the cart.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Refresh the browser page | Page reloads |
| 2 | Check the cart badge | Badge still shows the correct number of items |

### Post-conditions
- Cart state is persisted.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/ShopPage.ts`
