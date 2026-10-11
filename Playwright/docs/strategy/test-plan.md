# Test Plan

**Cycle:** Regression/Functional Baseline
**Date:** 2026-10-11
**Status:** Active

## 1. Introduction
This test plan outlines the specific activities for the current testing cycle of the Playwright automation project.

## 2. Test Scope
### 2.1 In-Scope
- **OrangeHRM**: Authentication, PIM, Recruitment, Admin, and Leave modules.
- **Swag Labs**: User login and full purchase journey.
- **DemoQA**: Text boxes, checkboxes, radio buttons, alerts, and practice forms.
- **The Internet**: Dynamic content, auth forms, frames, and shadow DOM.
- **Website (Shop)**: Order placement flow and admin login.

### 2.2 Out-of-Scope
- Performance testing (Load/Stress).
- Security penetration testing.
- Mobile browser testing (unless specified in config).

## 3. Test Environment
- **OS:** Windows 11
- **Browser:** Chromium (Latest)
- **Language:** TypeScript / Node.js
- **Base URL:** Application-specific (configured in `.env` or config)

## 4. Test Schedule
| Activity | Start Date | End Date | Responsibility |
| :--- | :--- | :--- | :--- |
| Test Script Development | 2026-10-01 | 2026-10-10 | Automation Engineer |
| Documentation Generation | 2026-10-11 | 2026-10-11 | QA Lead |
| Final Execution & Report | 2026-10-12 | 2026-10-12 | QA Lead |

## 5. Risk Assessment
| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Environment instability | High | Use of retries in `playwright.config.ts` |
| Hardcoded data failure | Medium | Shift to `.env` and dynamic `faker` data |
| Application UI changes | Medium | Page Object Model allows quick selector updates |

## 6. Pass/Fail Criteria
- **Pass**: Test executes without errors and all assertions are true.
- **Fail**: Any assertion failure or timeout.
- **Blocked**: Unable to execute due to an external dependency or bug.
