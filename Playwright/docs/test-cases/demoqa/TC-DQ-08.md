# Test Case: TC-DQ-08 - Item Selection in List

**Priority:** Low | **Status:** Passed

### Description
Verify that multiple items can be selected from a list in the Interactions module.

### Preconditions
- Browser is open.
- Navigated to Interactions page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Select item 1 | Item 1 is marked as selected |
| 2 | Select item 3 | Item 3 is also marked as selected |
| 3 | Verify states | Both items are selected |

### Post-conditions
- List selection is verified.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/InteractionsPage.ts`
