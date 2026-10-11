# Test Case: TC-ORH-08 - Update Employee Details

**Priority:** Medium | **Status:** Passed

### Description
Verify that an existing employee's information can be successfully updated.

### Preconditions
- User is logged in as Admin.
- Navigated to PIM module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Search for an existing employee | Employee is found |
| 2 | Click "Edit" button | Edit form is displayed |
| 3 | Update "Last Name" field | New value is entered |
| 4 | Click "Save" button | Change is saved and confirmation is displayed |

### Post-conditions
- Employee record reflects the updated information.

### Automation Reference
- **Spec File:** `tests/orangehrm/pim.spec.ts`
- **Page Object:** `PageObjects/orangehrm/PimPage.ts`
