# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-09-19

### Added

- **Cypress** - Comprehensive E2E test suite for `the-internet.herokuapp.com` consisting of 60 professional test cases.
- **Cypress** - Implementation of the Page Object Model (POM) pattern with multiple page classes to ensure maintainability and scalability.
- **Playwright** - Comprehensive E2E test suite for `the-internet.herokuapp.com` implementing advanced browser features (Shadow DOM, Geolocation mocking, JS Error interception, HTTP status validation).
- **Cypress & Playwright** - Coverage for diverse web interactions including:
    - Authentication (Login)
    - Dynamic Content & Loading
    - JavaScript Alerts & Frames
    - File Uploads, Drag and Drop, and Hovers
    - Window handling, Cookies, and Session persistence
    - Complex UI elements like Sortable Tables, Custom Dropdowns, and Pagination.

## [1.1.0] - 2026-07-30

### Changed

- **Playwright** - Fixed `.env` file path in `playwright.config.ts`. The config was looking for `.env` in the `Playwright/` subdirectory, but the file is located at the repository root. Changed `path.resolve(__dirname, '.env')` to `path.resolve(__dirname, '..', '.env')`.

### Refactored

- **Playwright** - Updated `shop.spec.ts` to use the new `ConsoleLog` PageObject instead of inline `console.log`. The test now instantiates `ConsoleLog` in `beforeEach` and calls `consoleLog.logOrderDetails(details)`.

## [1.0.0] - 2025-01-01

### Added

- Initial release of the testers portfolio project with Cypress and Playwright test suites.
