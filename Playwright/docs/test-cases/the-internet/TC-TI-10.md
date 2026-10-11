# Test Case: TC-TI-10 - Multi-Window Context Switch

**Priority:** Medium | **Status:** Passed

### Description
Verify that the framework can switch between multiple browser windows/tabs.

### Preconditions
- Browser is open.
- Navigated to Multiple Windows page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Click Here" to open new window | New window/tab is opened |
| 2 | Switch context to the new window | Context is successfully switched |
| 3 | Verify text in new window | Text matches expected value |

### Post-conditions
- Multi-window handling is verified.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/MultipleWindowsPage.ts`
