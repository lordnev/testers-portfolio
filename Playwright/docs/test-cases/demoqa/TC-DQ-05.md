# Test Case: TC-DQ-05 - JS Alert Dismissal

**Priority:** Medium | **Status:** Passed

### Description
Verify that the system correctly handles the "Cancel" action on a JavaScript alert.

### Preconditions
- Browser is open.
- Navigated to Alerts page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Click for JS Confirm" button | Confirmation alert appears |
| 2 | Dismiss the alert (Click Cancel) | Alert is closed |
| 3 | Verify result text | Result displays "You selected Cancel" |

### Post-conditions
- Alert dismissal is recorded on the page.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/AlertsWindowsPage.ts`
