# Test Case: TC-TI-02 - JS Alert Confirmation

**Priority:** Medium | **Status:** Passed

### Description
Verify that the system correctly handles the "OK" action on a JavaScript alert.

### Preconditions
- Browser is open.
- Navigated to JS Alerts page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Click for JS Alert" button | JS alert appears |
| 2 | Accept the alert (Click OK) | Alert is closed |
| 3 | Verify result text | Result displays "You selected Ok" |

### Post-conditions
- Alert action is recorded on the page.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/JsAlertsPage.ts`
