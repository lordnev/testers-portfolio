# Test Case: TC-ORH-03 - Invalid Login Attempt

**Priority:** High | **Status:** Passed

### Description
Verify that the system prevents login when an incorrect password is provided.

### Preconditions
- Browser is open.
- User has a registered account.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to OrangeHRM login page | Login page is displayed |
| 2 | Enter valid username | Username field is populated |
| 3 | Enter an invalid password | Password field is populated |
| 4 | Click "Login" button | Error message "Invalid credentials" is displayed |

### Post-conditions
- User remains on the login page.

### Automation Reference
- **Spec File:** `tests/orangehrm/auth.spec.ts`
- **Page Object:** `PageObjects/orangehrm/LoginPage.ts`
