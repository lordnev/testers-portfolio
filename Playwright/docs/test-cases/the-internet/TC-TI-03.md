# Test Case: TC-TI-03 - Basic Authentication Flow

**Priority:** Medium | **Status:** Passed

### Description
Verify that the system allows access to the secure area using Basic Auth.

### Preconditions
- Browser is open.
- Valid credentials: `tomsmith` / `SuperSecretPassword!`.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to Basic Auth page | Auth prompt is triggered |
| 2 | Enter valid credentials | Access is granted |
| 3 | Verify page content | Page displays "Welcome to the Basic Auth Page" |

### Post-conditions
- User is authenticated.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/FormAuthPage.ts` (Basic Auth section)
