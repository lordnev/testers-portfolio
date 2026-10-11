# Test Case: TC-TI-04 - Add/Remove Elements Flow

**Priority:** Low | **Status:** Passed

### Description
Verify that elements can be dynamically added and removed from the page.

### Preconditions
- Browser is open.
- Navigated to Add/Remove Elements page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Add Element" button | A new "Delete" button appears |
| 2 | Click "Delete" button | The "Delete" button is removed from the page |
| 3 | Verify page state | No buttons are visible |

### Post-conditions
- DOM updates correctly.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/AddRemoveElementsPage.ts`
