# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- **Playwright** - Fixed `.env` file path in `playwright.config.ts`. The config was looking for `.env` in the `Playwright/` subdirectory, but the file is located at the repository root. Changed `path.resolve(__dirname, '.env')` to `path.resolve(__dirname, '..', '.env')`.

### Added

- **Playwright** - New `ConsoleLog` PageObject (`Playwright/PageObjects/ConsoleLog.ts`) with `logOrderDetails(details)` method, extracting the order details console output from the test into a reusable class. Includes `OrderDetails` interface.

### Refactored

- **Playwright** - Updated `shop.spec.ts` to use the new `ConsoleLog` PageObject instead of inline `console.log`. The test now instantiates `ConsoleLog` in `beforeEach` and calls `consoleLog.logOrderDetails(details)`.
