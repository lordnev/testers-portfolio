# Test Case: TC-ORH-14 - Job Vacancy Search

**Priority:** Low | **Status:** Passed

### Description
Verify that the administrator can search for vacancies by title.

### Preconditions
- User is logged in as Admin.
- Navigated to Job module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter "QA" in search field | Search field is populated |
| 2 | Click "Search" button | Only jobs containing "QA" are displayed |

### Post-conditions
- Job list is correctly filtered.

### Automation Reference
- **Spec File:** `tests/orangehrm/job.spec.ts`
- **Page Object:** `PageObjects/orangehrm/JobPage.ts`
