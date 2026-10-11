# Bug Report: BUG-08 - DemoQA: Date Picker Month Selection Bug

**Severity:** S2-Major
**Priority:** P2-High
**Status:** New
**Environment:** Chromium, Windows 11, DemoQA

### Steps to Reproduce
1. Open Date Picker widget.
2. Select a month from the dropdown.
3. Quickly change the year.

### Actual Result
The selected month sometimes reverts to the current month when the year is changed, causing the date to be incorrect.

### Expected Result
The selected month should persist regardless of the year change.

### Automation Reference
- **Affected Test:** `tests/demoqa/demoqa.spec.ts`
