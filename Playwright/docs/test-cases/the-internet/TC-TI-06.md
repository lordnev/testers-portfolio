# Test Case: TC-TI-06 - Number Input Arrow Navigation

**Priority:** Low | **Status:** Passed

### Description
Verify that number input fields can be manipulated using increment/decrement arrows.

### Preconditions
- Browser is open.
- Navigated to Inputs page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click the "Up" arrow in number field | Value increments by 1 |
| 2 | Click the "Down" arrow in number field | Value decrements by 1 |
| 3 | Verify final value | Value matches expected count |

### Post-conditions
- Number field is updated.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/InputsPage.ts`
