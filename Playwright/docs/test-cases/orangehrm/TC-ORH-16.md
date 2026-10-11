# Test Case: TC-ORH-16 - Logout Process

**Priority:** High | **Status:** Passed

### Description
Verify that the user can successfully log out of the system.

### Preconditions
- User is logged in.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click on the user profile dropdown | Dropdown menu is displayed |
| 2 | Click "Logout" | User is redirected to the login page |

### Post-conditions
- Session is terminated.

### Automation Reference
- **Spec File:** `tests/orangehrm/auth.spec.ts`
- **Page Object:** `PageObjects/orangehrm/LoginPage.ts`
