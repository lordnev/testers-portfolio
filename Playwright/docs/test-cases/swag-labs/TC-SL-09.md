# Test Case: TC-SL-09 - Logout from Swag Labs

**Priority:** Medium | **Status:** Passed

### Description
Verify that the user can successfully log out from the application.

### Preconditions
- User is logged in.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Open the side menu | Menu is displayed |
| 2 | Click "Logout" | User is redirected back to the login page |

### Post-conditions
- Session is closed.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/InventoryPage.ts`
