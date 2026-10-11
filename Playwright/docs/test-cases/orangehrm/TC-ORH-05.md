# Test Case: TC-ORH-05 - Add Job Vacancy

**Priority:** Medium | **Status:** Passed

### Description
Verify that the admin can successfully add a new job vacancy.

### Preconditions
- User is logged in as Admin.
- Navigated to Job module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Add" button | Add Job vacancy form is displayed |
| 2 | Enter job title (e.g., "QA Automation Engineer") | Job title is entered |
| 3 | Enter job description | Description is entered |
| 4 | Click "Save" button | Vacancy is successfully saved and added to the list |

### Post-conditions
- New job vacancy is visible in the job list.

### Automation Reference
- **Spec File:** `tests/orangehrm/job.spec.ts`
- **Page Object:** `PageObjects/orangehrm/JobPage.ts`
