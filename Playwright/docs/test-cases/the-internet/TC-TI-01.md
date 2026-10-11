# Test Case: TC-TI-01 - Shadow DOM Interaction

**Priority:** Low | **Status:** Passed

### Description
Verify that the framework can pierce through the Shadow DOM to verify text content.

### Preconditions
- Browser is open.
- Navigated to Shadow DOM page.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Locate the shadow host element | Element is found |
| 2 | Access the inner shadow root content | Text within shadow DOM is accessible |
| 3 | Verify the specific text content | Content matches expected value |

### Post-conditions
- Shadow DOM content is successfully verified.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/ShadowDomPage.ts`
