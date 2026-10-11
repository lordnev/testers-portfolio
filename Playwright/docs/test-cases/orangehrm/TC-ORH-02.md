# Test Case: TC-ORH-02 - PIM Employee Creation

**Priority:** Medium | **Status:** Passed

### Description
Verify that the administrator can successfully add a new employee to the PIM module.

### Preconditions
- User is logged in as Admin.
- Navigated to PIM module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Add Employee" button | Add Employee form is displayed |
| 2 | Enter first name and last name | Fields are populated |
| 3 | Click "Save" button | Employee is created and added to the list |

### Post-conditions
- New employee record exists in the system.

### Automation Reference
- **Spec File:** `tests/orangehrm/pim.spec.ts`
- **Page Object:** `PageObjects/orangehrm/PimPage.ts`
