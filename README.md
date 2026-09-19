# Portfolio Testera Automatyzującego

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)

Witaj w moim portfolio! Ten projekt to zbiór projektów i przykładów testów automatycznych, stworzonych z użyciem popularnych narzędzi do testowania aplikacji webowych (end-to-end). 

## Struktura Repozytorium

Repozytorium jest podzielone na katalogi odpowiadające różnym frameworkom testowym:

*   **[Cypress](./Cypress/)** - projekt z testami napisanymi we frameworku Cypress (TypeScript). Znajdziesz tam standardową strukturę testów E2E w katalogu `cypress/e2e`, w tym kompleksowy zestaw 60 testów dla strony the-internet.herokuapp.com z wykorzystaniem wzorca Page Object Model.
*   **[Playwright](./Playwright/)** - projekt z testami wykorzystującymi Playwright (TypeScript), obejmujący testy E2E dla sklepu internetowego, implementację zaawansowanego logowania detali zamówień do konsoli (ConsoleLog) oraz pełną konfigurację środowiskową (.env).


```
testers-portfolio/
├── .env                        # Zmienne środowiskowe (BASE_URL, WP_ADMIN_URL, SHOP_URL, WP_USERNAME, WP_PASSWORD)
├── .gitignore                  # Git ignore
├── CHANGELOG.md                # Changelog zmian
├── README.md                   # Dokumentacja projektu
├── Cypress/                    # Testy E2E w Cypress (JavaScript)
│   ├── cypress.config.js       # Konfiguracja Cypress
│   ├── package.json            # Zależności Cypress
│   ├── package-lock.json       # Lock file zależności
│   └── cypress/
│       ├── e2e/                # Testy end-to-end
│       │   ├── shop.cy.ts      # Testy sklepu (TypeScript)
│       │   └── test.cy.js      # Przykładowy test (JavaScript)
│       ├── fixtures/           # Dane testowe
│       │   └── example.json
│       ├── pages/              # Page Objects
│       │   ├── HomePage.ts
│       │   ├── LoginPage.ts
│       │   └── ShopPage.ts
│       └── support/            # Komendy i konfiguracja wsparcia
│           ├── commands.js
│           └── e2e.js
└── Playwright/                 # Testy E2E w Playwright (TypeScript)
    ├── .gitignore              # Git ignore (Playwright)
    ├── package.json            # Zależności Playwright
    ├── package-lock.json       # Lock file zależności
    ├── playwright.config.ts    # Konfiguracja Playwright
    ├── PageObjects/            # Page Objects
    │   ├── CheckoutPage.ts
    │   ├── ConsoleLog.ts
    │   ├── HomePage.ts
    │   ├── LoginPage.ts
    │   ├── ProductPage.ts
    │   └── ShopPage.ts
    ├── tests/                  # Testy end-to-end
    │   └── website/
    │       └── shop.spec.ts    # Testy sklepu
    ├── playwright-report/      # Raport HTML (generowany)
    └── test-results/           # Wyniki testów (generowane)
```

Repozytorium jest podzielone na katalogi odpowiadające różnym frameworkom testowym:

*   **[Cypress](./Cypress/)** - projekt z testami napisanymi we frameworku Cypress (TypeScript). Znajdziesz tam standardową strukturę testów E2E w katalogu `cypress/e2e`, w tym kompleksowy zestaw 60 testów dla strony the-internet.herokuapp.com z wykorzystaniem wzorca Page Object Model.
*   **[Playwright](./Playwright/)** - projekt z testami wykorzystującymi Playwright (TypeScript), obejmujący testy E2E dla sklepu internetowego, implementację zaawansowanego logowania detali zamówień do konsoli (ConsoleLog) oraz pełną konfigurację środowiskową (.env).


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

## Konfiguracja środowiska (.env)

Playwright wykorzystuje plik `.env` znajdujący się w katalogu głównym repozytorium (`testers-portfolio/.env`). Plik ten przechowuje zmienne środowiskowe, takie jak:

*   `BASE_URL` - adres URL aplikacji testowanej
*   `WP_ADMIN_URL` - adres URL panelu administracyjnego WordPressa
*   `SHOP_URL` - adres URL sklepu
*   `WP_USERNAME` - nazwa użytkownika do logowania
*   `WP_PASSWORD` - hasło do logowania

Plik jest automatycznie ładowany w `playwright.config.ts` poprzez `dotenv.config()`.

## Struktura PageObjects

Testy Playwright korzystają z wzorca Page Object Model. Klasy PageObjects znajdują się w katalogu `Playwright/PageObjects/` i obejmują:

*   `HomePage` - strona główna
*   `LoginPage` - strona logowania
*   `ShopPage` - strona sklepu
*   `ProductPage` - strona produktu
*   `CheckoutPage` - strona zamówień
*   `ConsoleLog` - logowanie szczegółów zamówień do konsoli

## Zmiany

Zobacz [CHANGELOG.md](CHANGELOG.md) dla pełnej listy zmian.
