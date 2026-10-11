# Test Case: TC-DQ-04 - Dropdown Selection

**Priority:** Medium | **Status:** Passed

### Description
Verify that a value can be selected from the dropdown menu.

### Preconditions
- Browser is open.
- Navigated to Select Options page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Open the dropdown menu | List of options is displayed |
| 2 | Select "React" | "React" is selected and visible in the field |

### Post-conditions
- The selection is correctly applied.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/TextBoxPage.ts`
