# Test Plan - Cypress Regression Cycle

**Cycle:** Baseline Regression
**Date:** 2026-10-11
**Status:** Active

## 1. Introduction
This plan outlines the activities for the Cypress automation baseline.

## 2. Test Scope
### 2.1 In-Scope
- All critical paths in OrangeHRM, Swag Labs, DemoQA, The Internet, and Shop.
- User authentication and authorization.
- Core E2E business flows.

### 2.2 Out-of-Scope
- Cross-browser testing (focused on Chrome/Electron).
- API testing (unless explicitly integrated).

## 3. Test Environment
- **OS:** Windows 11
- **Browser:** Chrome (Cypress Default)
- **Tool:** Cypress v13+
- **Node.js:** v20.x

## 4. Schedule
| Activity | Start Date | End Date |
| :--- | :--- | :--- |
| Scripting | 2026-10-01 | 2026-10-10 |
| Documentation | 2026-10-11 | 2026-10-11 |
| Execution | 2026-10-12 | 2026-10-12 |

## 5. Risk Assessment
| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Flaky tests due to async | High | Use of `cy.intercept()` and proper assertions |
| Environment downtime | Medium | Local environment hosting where possible |
| Data corruption | Medium | Use of unique IDs in test data |

## 6. Pass/Fail Criteria
- **Pass**: 100% of critical assertions pass.
- **Fail**: Any critical path failure or unhandled exception.
