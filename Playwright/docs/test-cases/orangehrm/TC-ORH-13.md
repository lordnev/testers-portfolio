# Test Case: TC-ORH-13 - My Page Profile Picture Verification

**Priority:** Low | **Status:** Passed

### Description
Verify that the user's profile picture is correctly displayed on "My Page".

### Preconditions
- User is logged in.
- Navigated to "My Page".

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Observe the profile image area | Profile picture is rendered |
| 2 | Check image visibility | Image is not broken and is visible |

### Post-conditions
- Profile picture is verified.

### Automation Reference
- **Spec File:** `tests/orangehrm/my.spec.ts`
- **Page Object:** `PageObjects/orangehrm/MyPage.ts`
