# Test Case: TC-DQ-10 - Practice Form Field Validation

**Priority:** Medium | **Status:** Passed

### Description
Verify that mandatory fields in the Practice Form are correctly validated.

### Preconditions
- Browser is open.
- Navigated to Practice Form page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Leave all fields empty | Form is empty |
| 2 | Click "Submit" | All mandatory fields are highlighted in red |

### Post-conditions
- Form submission is prevented.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/PracticeFormPage.ts`
