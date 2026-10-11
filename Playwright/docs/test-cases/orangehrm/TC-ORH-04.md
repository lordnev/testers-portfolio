# Test Case: TC-ORH-04 - User Search in Admin Module

**Priority:** Medium | **Status:** Passed

### Description
Verify that the administrator can successfully search for an existing user.

### Preconditions
- User is logged in as Admin.
- Navigated to Admin module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter "Admin" in the username search field | Search field is populated |
| 2 | Click "Search" button | The user "Admin" is displayed in the results table |

### Post-conditions
- Search results are correctly filtered.

### Automation Reference
- **Spec File:** `tests/orangehrm/admin.spec.ts`
- **Page Object:** `PageObjects/orangehrm/AdminPage.ts`
