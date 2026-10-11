# Test Case: TC-ORH-09 - PIM Required Field Validation

**Priority:** Medium | **Status:** Passed

### Description
Verify that the system prevents saving a new employee without mandatory fields.

### Preconditions
- User is logged in as Admin.
- Navigated to PIM module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Add Employee" button | Form is displayed |
| 2 | Leave "First Name" empty | Field remains empty |
| 3 | Click "Save" button | Validation error "Required" is displayed under First Name |

### Post-conditions
- Employee is not created.

### Automation Reference
- **Spec File:** `tests/orangehrm/pim.spec.ts`
- **Page Object:** `PageObjects/orangehrm/PimPage.ts`
