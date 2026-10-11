# Test Case: TC-SL-02 - Locked Out User Login

**Priority:** High | **Status:** Passed

### Description
Verify that a locked-out user cannot log into Swag Labs.

### Preconditions
- Browser is open.
- Use `locked_out_user` credentials.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to Swag Labs login page | Login page is displayed |
| 2 | Enter "locked_out_user" | Username is entered |
| 3 | Enter "secret_sauce" | Password is entered |
| 4 | Click "Login" button | Error message "Epic sadface: Sorry, this user has been locked out." is displayed |

### Post-conditions
- User is not redirected to the inventory page.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs-login.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/LoginPage.ts`
