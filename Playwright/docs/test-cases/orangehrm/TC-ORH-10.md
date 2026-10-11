# Test Case: TC-ORH-10 - Recruitment Candidate Search

**Priority:** Low | **Status:** Passed

### Description
Verify that the administrator can search for candidates using specific criteria.

### Preconditions
- User is logged in as Admin.
- Navigated to Recruitment module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter "Admin" in search field | Search field is populated |
| 2 | Click "Search" button | Candidates matching "Admin" are displayed in the table |

### Post-conditions
- List is filtered by search term.

### Automation Reference
- **Spec File:** `tests/orangehrm/recruitment.spec.ts`
- **Page Object:** `PageObjects/orangehrm/RecruitmentPage.ts`
