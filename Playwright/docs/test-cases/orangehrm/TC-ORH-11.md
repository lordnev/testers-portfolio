# Test Case: TC-ORH-11 - Recruitment Status Update

**Priority:** Medium | **Status:** Passed

### Description
Verify that a candidate's status can be successfully updated (e.g., from "Applied" to "Interview").

### Preconditions
- User is logged in as Admin.
- Navigated to Recruitment module.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Select a candidate from the list | Candidate is selected |
| 2 | Open status dropdown | Dropdown list is displayed |
| 3 | Select "Interview" | Status is updated |
| 4 | Verify change | Candidate's status reflects "Interview" |

### Post-conditions
- Candidate record is updated in the database.

### Automation Reference
- **Spec File:** `tests/orangehrm/recruitment.spec.ts`
- **Page Object:** `PageObjects/orangehrm/RecruitmentPage.ts`
