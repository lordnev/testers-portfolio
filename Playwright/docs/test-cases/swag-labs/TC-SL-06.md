# Test Case: TC-SL-06 - Login with Problem User

**Priority:** Low | **Status:** Passed

### Description
Verify the system behavior when logging in with the `problem_user` profile.

### Preconditions
- Browser is open.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to login page | Login page is displayed |
| 2 | Enter "problem_user" and "secret_sauce" | Credentials entered |
| 3 | Click "Login" | User is logged in, but inventory images may be broken |

### Post-conditions
- User is on the inventory page.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs-login.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/LoginPage.ts`
