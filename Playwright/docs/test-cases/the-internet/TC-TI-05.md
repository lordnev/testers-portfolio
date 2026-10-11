# Test Case: TC-TI-05 - Dynamic Controls Toggle

**Priority:** Low | **Status:** Passed

### Description
Verify that elements can be enabled and disabled dynamically.

### Preconditions
- Browser is open.
- Navigated to Dynamic Controls page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Remove" button | Button is removed and "It's gone!" appears |
| 2 | Click "Add" button | Button is added and "It's back!" appears |
| 3 | Click "Disable" button | Input field becomes disabled |

### Post-conditions
- Element states are correctly toggled.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/DynamicControlsPage.ts`
