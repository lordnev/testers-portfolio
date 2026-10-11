# Test Case: TC-DQ-03 - Radio Button Single Selection

**Priority:** Medium | **Status:** Passed

### Description
Verify that only one radio button can be selected at a time.

### Preconditions
- Browser is open.
- Navigated to Radio Buttons page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Select "Male" radio button | "Male" is checked |
| 2 | Select "Female" radio button | "Female" is checked, "Male" is automatically deselected |

### Post-conditions
- Only one option remains selected.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/TextBoxPage.ts`
