# Test Case: TC-WS-01 - E2E Order Placement

**Priority:** High | **Status:** Passed

### Description
Verify the end-to-end order flow from product selection to order summary.

### Preconditions
- Browser is open.
- Site is accessible.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Select "Hi-Fi Headphones" | Product is added to cart |
| 2 | Proceed to Checkout | Billing and shipping forms are displayed |
| 3 | Fill in shipping details ("Wysyłka z procy") | Data is entered |
| 4 | Select "Przelew bankowy" as payment | Payment method selected |
| 5 | Submit order | Order success page is displayed |

### Post-conditions
- Order summary matches user email.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/ShopPage.ts`, `CheckoutPage.ts`
