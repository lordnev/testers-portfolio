# Test Case: TC-SL-08 - Login with Performance Glitch User

**Priority:** Low | **Status:** Passed

### Description
Verify system stability when logging in with the `performance_glitch_user`.

### Preconditions
- Browser is open.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter "performance_glitch_user" and "secret_sauce" | Credentials entered |
| 2 | Click "Login" | User is eventually redirected to the inventory page |

### Post-conditions
- User is logged in despite the simulated delay.

### Automation Reference
- **Spec File:** `tests/Swag-Labs/swag-labs-login.spec.ts`
- **Page Object:** `PageObjects/Swag-Labs/LoginPage.ts`
