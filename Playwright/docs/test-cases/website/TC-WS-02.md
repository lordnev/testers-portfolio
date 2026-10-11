# Test Case: TC-WS-02 - Order Page Structure Verification

**Priority:** Low | **Status:** Passed

### Description
Verify that the Shop website contains the essential information pages.

### Preconditions
- Browser is open.
- Shop home page is loaded.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click on "Terms" link | Terms page is displayed |
| 2 | Click on "Policy" link | Policy page is displayed |
| 3 | Click on "Contact" link | Contact page is displayed |

### Post-conditions
- All three pages are verified to be reachable and render content.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/HomePage.ts`
