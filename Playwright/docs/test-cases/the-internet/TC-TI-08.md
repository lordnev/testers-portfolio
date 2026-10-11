# Test Case: TC-TI-08 - Hover Caption Verification

**Priority:** Low | **Status:** Passed

### Description
Verify that hovering over an element displays the correct caption.

### Preconditions
- Browser is open.
- Navigated to Hovers page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Hover over the first image | Caption "user1" is displayed |
| 2 | Hover over the second image | Caption "user2" is displayed |

### Post-conditions
- Captions are verified.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/HoversPage.ts`
