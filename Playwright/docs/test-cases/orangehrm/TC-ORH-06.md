# Test Case: TC-ORH-06 - Apply for Leave

**Priority:** High | **Status:** Passed

### Description
Verify that an employee can submit a leave request.

### Preconditions
- User is logged in.
- Navigated to Leave module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Apply" button | Leave application form is displayed |
| 2 | Select "Sick Leave" from dropdown | Leave type is selected |
| 3 | Select start and end dates | Dates are selected |
| 4 | Click "Apply" button | Leave request is submitted successfully |

### Post-conditions
- Leave request appears in the "My Leave" list.

### Automation Reference
- **Spec File:** `tests/orangehrm/leave.spec.ts`
- **Page Object:** `PageObjects/orangehrm/LeavePage.ts`
