# Test Case: TC-ORH-12 - Performance Review Load

**Priority:** Low | **Status:** Passed

### Description
Verify that the Performance module correctly loads the list of reviews.

### Preconditions
- User is logged in.
- Navigated to Performance module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click on "Performance" in the menu | Performance page is displayed |
| 2 | Observe the review list table | Table is rendered and visible |

### Post-conditions
- User can view existing performance reviews.

### Automation Reference
- **Spec File:** `tests/orangehrm/performance.spec.ts`
- **Page Object:** `PageObjects/orangehrm/PerformancePage.ts`
