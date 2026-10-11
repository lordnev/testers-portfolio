# Test Case: TC-DQ-09 - Email Field Error State

**Priority:** Medium | **Status:** Passed

### Description
Verify that the email field displays an error state when an invalid email format is entered.

### Preconditions
- Browser is open.
- Navigated to Text Box page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter "invalid-email" in email field | Field is populated |
| 2 | Click outside the field or Tab | Field is validated |
| 3 | Verify CSS state | Field is highlighted in red (error state) |

### Post-conditions
- Validation error is visually confirmed.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/TextBoxPage.ts`
