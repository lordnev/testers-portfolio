# Test Case: TC-TI-09 - File Upload Confirmation

**Priority:** Medium | **Status:** Passed

### Description
Verify that a file can be successfully uploaded to the server.

### Preconditions
- Browser is open.
- Valid `.txt` file exists on disk.

### Test Steps
| Step | Action | Expected Result |
| :--- | :--- | :--- |
| 1 | Click "Choose File" and select file | File path is populated |
| 2 | Click "Upload" button | "File Uploaded!" message is displayed |

### Post-conditions
- File is uploaded successfully.

### Automation Reference
- **Spec File:** `tests/the-internet/the-internet.spec.ts`
- **Page Object:** `PageObjects/the-internet/UploadDownloadPage.ts`
