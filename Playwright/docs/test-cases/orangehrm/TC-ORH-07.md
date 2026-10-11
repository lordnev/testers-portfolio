# Test Case: TC-ORH-07 - User Search for Non-existent User

**Priority:** Low | **Status:** Passed

### Description
Verify that the system correctly handles a search for a username that does not exist in the system.

### Preconditions
- User is logged in as Admin.
- Navigated to Admin module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter "NonExistentUser123" in search field | Search field is populated |
| 2 | Click "Search" button | "No Records Found" message is displayed |

### Post-conditions
- No user records are shown in the results table.

### Automation Reference
- **Spec File:** `tests/orangehrm/admin.spec.ts`
- **Page Object:** `PageObjects/orangehrm/AdminPage.ts`
