# Test Case: TC-TI-07 - Horizontal Slider Adjustment

**Priority:** Low | **Status:** Passed

### Description
Verify that the horizontal slider can be adjusted to a specific value.

### Preconditions
- Browser is open.
- Navigated to Horizontal Slider page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Move slider to a specific position | Slider handle moves |
| 2 | Verify the displayed value | Value (e.g., 3.5) is correctly displayed |

### Post-conditions
- Slider value is updated.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/HorizontalSliderPage.ts`
