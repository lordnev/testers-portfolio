# Portfolio Testera Automatyzującego

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)

Witaj w moim portfolio! Ten projekt to zbiór profesjonalnych przykładów testów automatycznych E2E stworzonych z użyciem najpopularniejszych frameworków: **Cypress** oraz **Playwright**.

## 🚀 Przegląd Projektów

Repozytorium zawiera kompleksowe suite testowe dla trzech różnych środowisk, demonstrując szeroki wachlarz technik automatyzacji:

### 1. DemoQA (`demoqa.com`)
Zaawansowane testy interakcji z elementami UI.
- **Zakres**: Text boxes, Checkboxes, Radio buttons, Select options, Alerts, Windows, Widgets (Date Picker), oraz zaawansowane interakcje (Drag & Drop, Resizable, Selectable).
- **Implementacja**: Pełny wzorzec **Page Object Model (POM)** w obu frameworkach.
- **Techniki**: Obsługa ukrytych elementów, walka z nakładkami reklamowymi (custom ad-blocker), oraz precyzyjne sterowanie myszą.

### 2. The Internet (`the-internet.herokuapp.com`)
Kompleksowy poligon testowy dla automatyzatora.
- **Zakres**: Ponad 60 scenariuszy testowych.
- **Techniki**: Shadow DOM, mockowanie geolokalizacji, przechwytywanie błędów JS, walidacja statusów HTTP i obsługa iFrame'ów.

### 3. Swag Labs (SauceDemo)
Testy przepływów biznesowych (Business Flows).
- **Zakres**: Parametryzowane logowanie i pełny proces zakupowy (End-to-End Purchase Flow).
- **Implementacja**: Struktura POM zapewniająca wysoką skalowalność.

## 📂 Struktura Repozytorium

```
testers-portfolio/
├── .env                        # Zmienne środowiskowe (URL, dane logowania)
├── CHANGELOG.md                # Historia zmian projektu
├── README.md                   # Dokumentacja główna
├── Cypress/                    # Projekt w Cypress (TypeScript)
│   └── cypress/
│       ├── e2e/                # Scenariusze testowe
│       │   ├── demoqa.cy.ts     # Testy DemoQA
│       │   ├── swag-labs.cy.ts # E2E Purchase Flow
│       │   └── the-internet.cy.ts # Suite 60 testów
│       └── pages/              # Page Objects (POM)
│           └── demoqa/          # POM dla DemoQA
│           └── Swag-Labs/       # POM dla Swag Labs
│           └── the-internet/    # POM dla The Internet
└── Playwright/                 # Projekt w Playwright (TypeScript)
    ├── playwright.config.ts    # Konfiguracja globalna
    ├── PageObjects/            # Page Objects (POM)
    │   └── demoqa/              # POM dla DemoQA
    │   └── ShopPage.ts, LoginPage.ts, etc.
    └── tests/                  # Scenariusze testowe
        ├── demoqa/              # Testy DemoQA
        └── the-internet/        # Testy The Internet
```

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
