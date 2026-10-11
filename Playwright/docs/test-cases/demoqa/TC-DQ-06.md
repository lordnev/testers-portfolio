# Test Case: TC-DQ-06 - Date Picker Selection

**Priority:** Medium | **Status:** Passed

### Description
Verify that a specific date can be selected using the Date Picker widget.

### Preconditions
- Browser is open.
- Navigated to Widgets page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Open Date Picker | Calendar is displayed |
| 2 | Select Month "January" and Year "2025" | Month and Year are updated |
| 3 | Select Day "15" | Date is selected |
| 4 | Verify selected date | Date displays as "01/15/2025" |

### Post-conditions
- Selected date is correct.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/WidgetsPage.ts`
