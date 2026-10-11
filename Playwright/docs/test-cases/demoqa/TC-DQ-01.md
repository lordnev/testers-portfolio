# Test Case: TC-DQ-01 - Form Submission with File Upload

**Priority:** Medium | **Status:** Passed

### Description
Verify that the DemoQA Practice Form can be submitted successfully with valid data and a PDF upload.

### Preconditions
- Browser is open.
- `sample-upload.pdf` is available in `test-data/`.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Fill in First Name, Last Name, and Email | Data is entered correctly |
| 2 | Select Gender and Date of Birth | Selection is made |
| 3 | Upload `sample-upload.pdf` | File is attached to the form |
| 4 | Click "Submit" | Form is submitted, summary is displayed |

### Post-conditions
- User data is verified in the submission summary.

### Automation Reference
- **Spec File:** `tests/demoqa/demoqa.spec.ts`
- **Page Object:** `PageObjects/demoqa/PracticeFormPage.ts`
