# Test Case: TC-ORH-15 - PIM Complex Search Criteria

**Priority:** Medium | **Status:** Passed

### Description
Verify that the PIM module allows searching for employees using multiple criteria.

### Preconditions
- User is logged in as Admin.
- Navigated to PIM module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter First Name "John" | Field is populated |
| 2 | Enter Employment Status "Permanent" | Status is selected |
| 3 | Click "Search" button | Only employees matching both criteria are displayed |

### Post-conditions
- Filtered results are displayed correctly.

### Automation Reference
- **Spec File:** `tests/orangehrm/pim.spec.ts`
- **Page Object:** `PageObjects/orangehrm/PimPage.ts`
