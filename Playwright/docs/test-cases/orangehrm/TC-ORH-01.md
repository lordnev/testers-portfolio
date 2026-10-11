# Test Case: TC-ORH-01 - Successful Login

**Priority:** High | **Status:** Passed

### Description
Verify that a user can successfully log into the OrangeHRM system using valid credentials.

### Preconditions
- Browser is open.
- User has a valid account.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to OrangeHRM login page | Login page is displayed |
| 2 | Enter valid username | Username field is populated |
| 3 | Enter valid password | Password field is populated |
| 4 | Click "Login" button | User is redirected to the Dashboard page |

### Post-conditions
- User is authenticated and on the Dashboard.

### Automation Reference
- **Spec File:** `tests/orangehrm/auth.spec.ts`
- **Page Object:** `PageObjects/orangehrm/LoginPage.ts`
