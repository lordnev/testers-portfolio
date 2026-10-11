# Test Case: TC-WS-03 - Product Search and Selection

**Priority:** Medium | **Status:** Passed

### Description
Verify that a user can find a specific product in the shop.

### Preconditions
- Browser is open.
- Navigated to Shop page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Search for "Headphones" | List of matching products is displayed |
| 2 | Click on "Hi-Fi Headphones" | Product details page is opened |

### Post-conditions
- Product is correctly identified and selected.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/ShopPage.ts`
