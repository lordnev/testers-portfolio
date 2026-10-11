# Test Case: TC-DQ-02 - Checkbox Multiple Selection

**Priority:** Low | **Status:** Passed

### Description
Verify that multiple checkboxes can be selected simultaneously.

### Preconditions
- Browser is open.
- Navigated to Checkboxes page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click Checkbox 1 | Checkbox 1 is marked as checked |
| 2 | Click Checkbox 2 | Checkbox 2 is also marked as checked |
| 3 | Verify both states | Both checkboxes are checked |

### Post-conditions
- Multiple selections are maintained.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/TextBoxPage.ts` (Checkboxes section)
