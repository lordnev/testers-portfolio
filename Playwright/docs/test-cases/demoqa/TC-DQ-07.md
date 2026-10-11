# Test Case: TC-DQ-07 - Drag and Drop Interaction

**Priority:** Medium | **Status:** Passed

### Description
Verify that an element can be successfully dragged and dropped into a target area.

### Preconditions
- Browser is open.
- Navigated to Interactions page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Drag element "source" | Element is picked up |
| 2 | Drop element into "target" | Element is released in target area |
| 3 | Verify result text | Result displays "Dropped!" |

### Post-conditions
- Drag and drop action is verified.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/InteractionsPage.ts`
