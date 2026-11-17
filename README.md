# Portfolio Testera Automatyzującego

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.62+-green)](https://playwright.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-15.19+-green)](https://cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

# 👋 O mnie

Jestem pasjonatem zapewniania jakości oprogramowania, który łączy analityczne podejście z techniczną biegłością w automatyzacji. Moim celem jest dostarczanie produktów najwyższej jakości poprzez precyzyjne projektowanie scenariuszy testowych oraz budowanie skalowalnych i utrzymywalnych frameworków automatyzacyjnych.

Wierzę, że rola testera to nie tylko znajdowanie błędów, ale przede wszystkim analiza wymagań i zapobieganie ich powstawaniu. Dzięki dbałości o szczegóły i systematyczności, potrafię skutecznie identyfikować krytyczne defekty w złożonych systemach.

### 🛠️ Moje Kompetencje

- **Automatyzacja E2E**: Tworzenie kompleksowych suite'ów testowych w **Cypress** oraz **Playwright** z zaawansowanymi wzorcami (POM, Fixtures, Custom Commands).
- **Testowanie API**: Zaawansowana walidacja endpointów REST, weryfikacja schematów JSON, testy integracyjne i kontraktowe.
- **Analiza i Dokumentacja**: Projektowanie strategii testowania, planów testów, szczegółowych przypadków testowych (Test Cases) oraz profesjonalnych raportów z błędów.
- **CI/CD & Infrastructure**: GitHub Actions, Allure Reporting, Parallel Execution, Docker-ready configurations.
- **Narzędzia i Standardy**: Biegła obsługa **Git**, **Jira**, **SQL** oraz praca w metodyce **Scrum**.
- **Języki**: TypeScript, JavaScript, SQL.

### 🎓 Kursy i Certyfikaty

- **ISTQB Certified Tester Fundation Level (CTFL) Syllabus Version v4.0**.

### 🌟 Umiejętności

- **Twarde**: Projektowanie Test Case'ów, Bug Reporting, API Testing, CI/CD (GitHub Actions), SQL Profiling, POM, Fixtures, Test Data Generation.
- **Miękkie**:
  - **Analityczne myślenie**: Zdolność do szybkiego znajdowania luk w dokumentacji i wymaganiach.
  - **Komunikatywność**: Skuteczna współpraca z deweloperami i Product Ownerami w celu szybkiej naprawy błędów.
  - **Szybka adaptacja**: Umiejętność błyskawicznej nauki nowych narzędzi i technologii.
  - **Dbałość o detale**: Precyzyjne podejście do weryfikacji UI/UX i logiki biznesowej.

### 🌐 Obecność w sieci

- **WWW**: [adamowicz.pro](https://adamowicz.pro) – prywatna strona internetowa.
- **WWW**: [adamowicz.it](https://adamowicz.it) – autorska strona łącząca poradniki technologiczne z refleksjami nad biznesem, produktywnością.
- **LinkedIn**: [linkedin/badamowicz](https://www.linkedin.com/in/badamowicz/)
- **Portfolio**: [github/lordnev](https://github.com/lordnev/testers-portfolio)


# 🧪 Portfolio testerskie

Ten Projekt to zbiór profesjonalnych przykładów testów automatycznych E2E stworzonych z użyciem najpopularniejszych frameworków: **Cypress** oraz **Playwright**.

## 🚀 Przegląd Projektów

Repozytorium zawiera kompleksowe suite testowe dla sześciu różnych środowisk, demonstrując szeroki wachlarz technik automatyzacji:

### 1. OrangeHRM
Kompleksowe testy systemu HR (demo.orangehrmlive.com).
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

### 4. Swag Labs / SauceDemo (`saucedemo.com`)
Kompleksowe testy przepływów biznesowych (Business Flows).
- **Zakres**: Parametryzowane logowanie i pełny proces zakupowy (End-to-End Purchase Flow).
- **Implementacja**: Struktura POM zapewniająca wysoką skalowalność.

### 5. Wikipedia (`wikipedia.org`)
Testy stabilności i elastyczności selektorów w dużym, dynamicznym portalu.
- **Zakres**: 20 scenariuszy testowych obejmujących wyszukiwanie, autoryzację, nawigację oraz weryfikację treści.
- **Implementacja**: Zaawansowany wzorzec **POM** z podziałem na komponenty strony.
- **Techniki**: Obsługa wielu wersji interfejsu (Vector 2022), elastyczne selektory (multi-selectors) oraz synchronizacja stanu sieci.

### 6. API Testing
Automatyzacja testów warstwy usługowej.
- **Zakres**: Walidacja endpointów REST API (JSONPlaceholder, ReqRes), testy statusów HTTP, weryfikacja schematów odpowiedzi oraz danych w formacie JSON.
- **Techniki**: Testy integracyjne, obsługa metod GET/POST/PUT/PATCH/DELETE oraz walidacja logiki biznesowej po stronie serwera.

### 7. Shop / Website Tests
Testy sklepu internetowego (WordPress/WooCommerce).
- **Zakres**: Weryfikacja podstron, logowanie, koszyk, checkout, metody płatności.
- **Implementacja**: POM z obsługą dynamicznych elementów.


## 📂 Struktura Repozytorium

```
testers-portfolio/
├── .env.example                # Przykład zmiennych środowiskowych
├── .github/workflows/          # GitHub Actions CI/CD
│   └── test.yml               # Pipeline testowy (Playwright + Cypress + Allure)
├── CHANGELOG.md               # Historia zmian projektu
├── README.md                  # Dokumentacja główna
├── Cypress/                   # Projekt w Cypress (TypeScript)
│   ├── cypress/
│   │   ├── docs/               # 📄 Dokumentacja testowa (Strategie, Test Case'y, Bug Reporty, Raporty)
│   │   ├── e2e/               # Scenariusze testowe (z tagami @smoke, @regression, @e2e, @api)
│   │   │   ├── api/           # Testy API (JSONPlaceholder, ReqRes)
│   │   │   ├── demoqa/        # Testy DemoQA
│   │   │   ├── orangehrm/     # Testy OrangeHRM
│   │   │   ├── shop/          # Testy Shop
│   │   │   ├── swag-labs/     # Testy Swag Labs
│   │   │   ├── the-internet/  # Suite 60+ testów
│   │   │   └── wikipedia/     # Testy Wikipedia (POM)
│   │   ├── fixtures/          # Dane testowe
│   │   ├── pages/             # Page Objects (POM) - TypeScript
│   │   │   ├── Swag-Labs/
│   │   │   ├── demoqa/
│   │   │   ├── orangehrm/
│   │   │   ├── shop/
│   │   │   ├── the-internet/
│   │   │   └── wikipedia/
│   │   ├── support/           # Custom commands i konfiguracja
│   │   │   ├── commands.ts    # Custom Cypress commands
│   │   │   └── e2e.ts         # Global hooks
│   │   ├── results/           # Wyniki testów (JUnit, Mochawesome)
│   │   ├── screenshots/       # Zrzuty ekranu
│   │   └── videos/            # Nagrania wideo
│   ├── cypress.config.ts      # Konfiguracja Cypress
│   ├── package.json
│   └── tsconfig.json
├── Playwright/                # Projekt w Playwright (TypeScript)
│   ├── docs/                  # 📄 Dokumentacja testowa
│   ├── tests/
│   │   ├── fixtures/          # Custom test fixtures
│   │   │   └── test-fixtures.ts
│   │   ├── utils/             # Shared utilities
│   │   │   ├── api-helpers.ts      # API Client classes
│   │   │   └── test-data-generators.ts # Faker-based data generation
│   │   ├── Swag-Labs/         # Testy Swag Labs
│   │   ├── api-jasonplaceholder/ # Testy JSONPlaceholder API
│   │   ├── api-reqres.in/     # Testy ReqRes API
│   │   ├── demoqa/            # Testy DemoQA
│   │   ├── orangehrm/         # Testy OrangeHRM
│   │   ├── the-internet/      # Testy The Internet (60+ testów)
│   │   ├── website/           # Testy Shop
│   │   └── wikipedia/         # Testy Wikipedia (modułowe: home, search, content, auth)
│   ├── PageObjects/           # Page Objects (POM)
│   │   ├── Swag-Labs/
│   │   ├── demoqa/
│   │   ├── orangehrm/
│   │   ├── the-internet/
│   │   ├── website/
│   │   └── wikipedia/
│   ├── global-setup.ts        # Global test setup
│   ├── global-teardown.ts     # Global test teardown
│   ├── playwright.config.ts   # Konfiguracja Playwright (multi-browser, Allure, retries)
│   └── package.json
└── .env.example               # Template zmiennych środowiskowych
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

- **Cypress 15.19+** - Framework E2E uruchamiany w przeglądarce.
- **Playwright 1.62+** - Nowoczesny framework wspierający wiele silników (Chromium, Firefox, WebKit).
- **TypeScript 5.0+** - Dla silnego typowania i lepszej jakości kodu.
- **Node.js (>=18)** - Środowisko uruchomieniowe.
- **@faker-js/faker** - Generowanie danych testowych.
- **Allure Report** - Profesjonalne raportowanie.
- **GitHub Actions** - CI/CD Pipeline.


## 🏃 Jak uruchomić testy?

### Wymagania wstępne
```bash
# Skopiuj plik środowiskowy i uzupełnij wartości
cp .env.example .env
```

### Cypress
```bash
cd Cypress
npm install

# Tryb UI (Launchpad - interaktywny)
npm run test:open

# Tryb headless (konsola)
npm run test

# Tylko testy smoke
npm run test:smoke

# Tylko testy regression
npm run test:regression

# Tylko testy API
npm run test:api

# CI mode z raportami
npm run test:ci
```

### Playwright
```bash
cd Playwright
npm install
npx playwright install --with-deps  # Instalacja przeglądarek (raz)

# Wszystkie testy (headless)
npm run test

# Tryb interaktywny UI
npm run test:ui

# Debug mode
npm run test:debug

# Tylko testy smoke
npm run test:smoke

# Tylko testy regression
npm run test:regression

# Tylko testy E2E
npm run test:e2e

# Tylko testy API
npm run test:api

# CI mode z raportami
npm run test:ci

# Raport HTML
npm run report

# Raport Allure
npm run report:allure
```

## 🏷️ Tagowanie Testów

Oba frameworki używają spójnego systemu tagowania:

| Tag | Opis | Użycie |
|-----|------|--------|
| `@smoke` | Testy krytyczne, szybkie | Każdy commit, PR |
| `@regression` | Pełny zestaw regresji | Nightly, Release |
| `@e2e` | Pełne przepływy biznesowe | Release |
| `@api` | Testy API | Każdy commit |
| `@ui` | Testy interfejsu | Regression |
| `@negative` | Testy negatywne | Regression |
| `@data-driven` | Testy parametryzowane | Regression |
| `@performance` | Testy wydajnościowe | Manual/Scheduled |

### Filtrowanie testów
```bash
# Playwright
npx playwright test --grep @smoke
npx playwright test --grep "@smoke|@regression"

# Cypress
npm run test:smoke
npm run test:regression
```

## 📊 Raportowanie

### Playwright
- **HTML Report**: `npm run report` lub `npx playwright show-report`
- **Allure Report**: `npm run report:allure`
- **JUnit XML**: `test-results/results.xml`
- **JSON Results**: `test-results/results.json`

### Cypress
- **Mochawesome HTML**: `cypress/reports/`
- **JUnit XML**: `cypress/results/junit-*.xml`
- **Allure**: `allure generate cypress/allure-results -o allure-report`
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`

## 🔄 CI/CD Pipeline

Pipeline GitHub Actions (`.github/workflows/test.yml`) uruchamia:

1. **Playwright Tests** - Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
2. **Cypress Tests** - Chrome, Firefox, Edge
3. **Allure Report Generation** - Konsolidacja wyników
4. **Artifacts Upload** - Raporty, screenshots, videos, traces

### Ręczne uruchamianie (workflow_dispatch)
```bash
# Przez GitHub UI: Actions → Test Suite → Run workflow
# Można wybrać: all, smoke, regression, api, e2e
```

## 🔐 Zmienne Środowiskowe

Skopiuj `.env.example` do `.env` i uzupełnij:

```bash
# Base URLs
BASE_URL=https://reqres.in
CYPRESS_BASE_URL=https://www.saucedemo.com

# OrangeHRM Demo
ORANGEHRM_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123

# ReqRes API
REQRES_API_KEY=reqres-free-v1
REQRES_LOGIN=eve.holt@reqres.in
REQRES_PASSWORD=cityslicka
```

W CI/CD (GitHub Actions) ustaw jako **Repository Secrets**:
- `BASE_URL`, `CYPRESS_BASE_URL`
- `ORANGEHRM_URL`, `ORANGEHRM_USERNAME`, `ORANGEHRM_PASSWORD`
- `REQRES_API_KEY`, `REQRES_LOGIN`, `REQRES_PASSWORD`

## 📜 Zmiany i Dokumentacja

Pełna historia rozwoju projektu znajduje się w pliku [CHANGELOG.md](CHANGELOG.md).

## 🎯 Profesjonalne Standardy w Projekcie

### Playwright
- ✅ Custom Fixtures (Page Objects, Authenticated Pages, API Clients, Test Data)
- ✅ Type-safe Page Objects z prywatnymi selektorami
- ✅ ApiClient z walidacją odpowiedzi i error handling
- ✅ Faker.js do generowania danych testowych
- ✅ Multi-browser testing (Chromium, Firefox, WebKit, Mobile)
- ✅ Allure + HTML + JUnit reporting
- ✅ Global setup/teardown
- ✅ Parallel execution z konfiguracją CI
- ✅ Trace viewer, screenshots, video on failure

### Cypress
- ✅ TypeScript Page Objects z enkapsulacją selektorów
- ✅ Custom Commands (login, waitForNetworkIdle, step, getByTestId)
- ✅ Session-based login dla szybkości
- ✅ Task-based test data generation
- ✅ Tag-based test filtering (@smoke, @regression, etc.)
- ✅ Multi-reporter (Mochawesome + JUnit + Allure)
- ✅ Retry logic (2 retries w CI)
- ✅ Screenshots/Videos on failure
- ✅ Accessibility testing ready (cypress-axe)

### Wspólne
- ✅ Spójna struktura katalogów
- ✅ Spójne tagowanie testów
- ✅ Centralne zarządzanie danymi testowymi (Faker)
- ✅ Environment-based configuration
- ✅ CI/CD Pipeline z Allure reporting
- ✅ Professional Git workflow