# Test Case: TC-WS-06 - Admin Panel Access

**Priority:** High | **Status:** Passed

### Description
Verify that an administrator can successfully access the WP Admin panel.

### Preconditions
- Browser is open.
- Admin credentials are valid.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to `/wp-admin` | Login form is displayed |
| 2 | Enter admin credentials and login | Redirected to the WordPress Dashboard |
| 3 | Verify heading "Moje konto" | Heading is visible |

### Post-conditions
- Admin access is confirmed.

### Automation Reference
- **Spec File:** `tests/website/shop.spec.ts`
- **Page Object:** `PageObjects/website/LoginPage.ts`
