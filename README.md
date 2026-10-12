# Portfolio Testera Automatyzującego

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)

Witaj w moim portfolio! Ten projekt to zbiór profesjonalnych przykładów testów automatycznych E2E stworzonych z użyciem najpopularniejszych frameworków: **Cypress** oraz **Playwright**.

## 🚀 Przegląd Projektów

Repozytorium zawiera kompleksowe suite testowe dla czterech różnych środowisk, demonstrując szeroki wachlarz technik automatyzacji:

### 1. OrangeHRM
Kompleksowe testy systemu HR.
- **Zakres**: Moduły Admin, PIM, Leave, Performance, Recruitment, My oraz Job.
- **Implementacja**: Pełny wzorzec **Page Object Model (POM)** w obu frameworkach.
- **Techniki**: Testy administracyjne, zarządzanie danymi pracowniczymi i przepływy procesowe.

### 2. DemoQA (`demoqa.com`)
Zaawansowane testy interakcji z elementami UI.
- **Zakres**: Text boxes, Checkboxes, Radio buttons, Select options, Alerts, Windows, Widgets (Date Picker), oraz zaawansowane interakcje (Drag & Drop, Resizable, Selectable).
- **Implementacja**: Pełny wzorzec **Page Object Model (POM)** w obu frameworkach.
- **Techniki**: Obsługa ukrytych elementów, walka z nakładkami reklamowymi (custom ad-blocker), oraz precyzyjne sterowanie myszą.

### 3. The Internet (`the-internet.herokuapp.com`)
Kompleksowy poligon testowy dla automatyzatora.
- **Zakres**: Ponad 60 scenariuszy testowych.
- **Techniki**: Shadow DOM, mockowanie geolokalizacji, przechwytywanie błędów JS, walidacja statusów HTTP i obsługa iFrame'ów.

### 4. Swag Labs (SauceDemo)
Kompleksowe testy przepływów biznesowych (Business Flows).
- **Zakres**: Parametryzowane logowanie i pełny proces zakupowy (End-to-End Purchase Flow).
- **Implementacja**: Struktura POM zapewniająca wysoką skalowalność.

### 5. API Testing
Automatyzacja testów warstwy usługowej.
- **Zakres**: Walidacja endpointów REST API, testy statusów HTTP, weryfikacja schematów odpowiedzi oraz danych w formacie JSON.
- **Techniki**: Testy integracyjne, obsługa metod GET/POST/PUT/DELETE oraz walidacja logiki biznesowej po stronie serwera.


## 📂 Struktura Repozytorium

```
testers-portfolio/
├── .env                        # Zmienne środowiskowe (URL, dane logowania)
├── CHANGELOG.md                # Historia zmian projektu
├── README.md                   # Dokumentacja główna
├── Cypress/                    # Projekt w Cypress (TypeScript)
│   └── cypress/
│       ├── docs/                # 📄 Dokumentacja testowa (Strategie, Test Case'y, Bug Reporty, Raporty)
│       ├── e2e/                # Scenariusze testowe
│       │   ├── demoqa.cy.ts     # Testy DemoQA
│       │   ├── orangehrm.cy.ts  # Testy OrangeHRM
│       │   ├── shop.cy.ts       # Testy Shop
│       │   ├── swag-labs.cy.ts # E2E Purchase Flow
│       │   └── the-internet.cy.ts # Suite 60 testów
│       └── support/              # Custom commands i konfiguracja
│           └── commands.js
│           └── e2e.js
├── Playwright/                 # Projekt w Playwright (TypeScript)
│   ├── docs/                    # 📄 Dokumentacja testowa (Strategie, Test Case'y, Bug Reporty, Raporty)
│   ├── playwright.config.ts    # Konfiguracja globalna
│   ├── PageObjects/            # Page Objects (POM)
│   │   └── demoqa/              # POM dla DemoQA
│   │   └── orangehrm/           # POM dla OrangeHRM
│   │   └── Swag-Labs/          # POM dla Swag Labs
│   │   └── the-internet/        # POM dla The Internet
│   │   └── website/            # POM dla Website
│   └── tests/                  # Scenariusze testowe
│       ├── demoqa/              # Testy DemoQA
│       ├── orangehrm/           # Testy OrangeHRM
│       ├── Swag-Labs/           # Testy Swag Labs
│       ├── the-internet/        # Testy The Internet
│       └── website/            # Testy Website
└── api-tests/                  # Testy API
```

## 📄 Dokumentacja QA (Standardy Branżowe)

W ramach portfolio przygotowałem pełną dokumentację testową dla obu frameworków, odwzorowując proces pracy profesjonalnego testera QA:

### 🛠️ Playwright Docs
- **Strategia i Plan**: [Strategia Testowania](Playwright/docs/strategy/test-strategy.md) | [Plan Testów](Playwright/docs/strategy/test-plan.md)
- **Test Case'y**: Zbiór szczegółowych scenariuszy w `/Playwright/docs/test-cases/`
- **Raporty Błędów**: Rejestr defektów w `/Playwright/docs/bug-reports/open/`
- **Podsumowanie**: [Profesjonalny Raport z Wykonania (Summary Report)](Playwright/docs/summaries/test-summary-report.md)

### 🛠️ Cypress Docs
- **Strategia i Plan**: [Strategia Testowania](Cypress/cypress/docs/strategy/test-strategy.md) | [Plan Testów](Cypress/cypress/docs/strategy/test-plan.md)
- **Test Case'y**: Zbiór szczegółowych scenariuszy w `/Cypress/cypress/docs/test-cases/`
- **Raporty Błędów**: Rejestr defektów w `/Cypress/cypress/docs/bug-reports/open/`
- **Podsumowanie**: [Profesjonalny Raport z Wykonania (Summary Report)](Cypress/cypress/docs/summaries/test-summary-report.md)


## 🛠 Technologie

- **Cypress** - Framework E2E uruchamiany w przeglądarce.
- **Playwright** - Nowoczesny framework wspierający wiele silników (Chromium, Firefox, WebKit).
- **TypeScript** - Dla silnego typowania i lepszej jakości kodu.
- **Node.js (>=18)** - Środowisko uruchomieniowe.

## 🏃 Jak uruchomić testy?

### Cypress
```bash
cd Cypress
npm install
npx cypress open   # Tryb UI (Launchpad)
npx cypress run    # Tryb headless (konsola)
```

### Playwright
```bash
cd Playwright
npm install
npx playwright test        # Wszystkie testy (headless)
npx playwright test --ui    # Tryb interaktywny UI
```

## 📜 Zmiany i Dokumentacja
Pełna historia rozwoju projektu znajduje się w pliku [CHANGELOG.md](CHANGELOG.md).
