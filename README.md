# Portfolio Testera Automatyzującego

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)

Witaj w moim portfolio! Ten projekt to zbiór projektów i przykładów testów automatycznych, stworzonych z użyciem popularnych narzędzi do testowania aplikacji webowych (end-to-end). 

## Struktura Repozytorium

Repozytorium jest podzielone na katalogi odpowiadające różnym frameworkom testowym:

*   **[Cypress](./Cypress/)** - projekt z testami napisanymi we frameworku Cypress (JavaScript). Znajdziesz tam standardową strukturę testów E2E w katalogu `cypress/e2e`.
*   **[Playwright](./Playwright/)** - projekt z testami wykorzystującymi Playwright (TypeScript/JavaScript), z przykładowymi testami w katalogu `tests/`.


```
testers-portfolio/
├── Cypress/                    # Testy E2E w Cypress (JavaScript)
│   ├── cypress/
│   │   ├── e2e/                # Testy end-to-end
│   │   ├── fixtures/           # Dane testowe
│   │   └── support/            # Komendy i konfiguracja wsparcia
│   ├── cypress.config.js       # Konfiguracja Cypress
│   └── package.json
└── Playwright/                 # Testy E2E w Playwright (TypeScript)
    ├── tests/                  # Testy end-to-end
    ├── playwright.config.ts    # Konfiguracja Playwright
    └── package.json
```

Repozytorium jest podzielone na katalogi odpowiadające różnym frameworkom testowym:

*   **[Cypress](./Cypress/)** - projekt z testami napisanymi we frameworku Cypress (JavaScript). Znajdziesz tam standardową strukturę testów E2E w katalogu `cypress/e2e`.
*   **[Playwright](./Playwright/)** - projekt z testami wykorzystującymi Playwright (TypeScript/JavaScript), z przykładowymi testami w katalogu `tests/`.


## Technologie

W ramach tego portfolio wykorzystano:
*   **Cypress** - framework do testów E2E uruchamiany bezpośrednio w przeglądarce.
*   **Playwright** - nowoczesny framework od Microsoft pozwalający na testy E2E w środowiskach wielu przeglądarek (Chromium, Firefox, WebKit).
*   **Node.js** - środowisko uruchomieniowe.
*   **JavaScript / TypeScript** - języki programowania wykorzystane do pisania skryptów testowych.

## Jak zacząć?

Oba projekty (Cypress oraz Playwright) posiadają swoje własne zależności zdefiniowane w odpowiednich plikach `package.json`. Aby je uruchomić, przejdź do wybranego katalogu.

### Uruchomienie testów Cypress

```bash
cd Cypress
npm install
npx cypress open   # Otwiera okno interfejsu (Cypress Launchpad)
# lub
npx cypress run    # Uruchamia testy w trybie headless w konsoli
```

### Uruchomienie testów Playwright

```bash
cd Playwright
npm install
npx playwright test        # Uruchamia testy w trybie headless
# lub
npx playwright test --ui   # Uruchamia testy w wygodnym trybie UI
```


## Wymagania wstępne

*   **Node.js** w wersji **>= 18**
*   **npm** (dołączony z Node.js)

### Uruchomienie testów Cypress

```bash
cd Cypress
npm install
npx cypress open   # Otwiera okno interfejsu (Cypress Launchpad)
# lub
npx cypress run    # Uruchamia testy w trybie headless w konsoli
```

### Uruchomienie testów Playwright

```bash
cd Playwright
npm install
npx playwright test        # Uruchamia testy w trybie headless (wszystkie przeglądarki)
# lub
npx playwright test --ui   # Uruchamia testy w wygodnym trybie UI
```

Po uruchomieniu testów w trybie headless, raport HTML z wynikami jest generowany automatycznie w katalogu `playwright-report/`. Aby go wyświetlić:

```bash
npx playwright show-report
```
