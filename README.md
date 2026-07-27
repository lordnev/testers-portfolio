# Portfolio Testera Automatyzującego

Witaj w moim portfolio! Ten projekt to zbiór projektów i przykładów testów automatycznych, stworzonych z użyciem popularnych narzędzi do testowania aplikacji webowych (end-to-end). 

## Struktura Repozytorium

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
