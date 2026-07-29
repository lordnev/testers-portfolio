import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';

test.describe('Testy sklepu - Portfolio Testerskie', () => {

  test('Weryfikacja obecności kluczowych podstron (Regulamin, Polityka, Kontakt)', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Krok 1: Przejście na stronę główną
    await homePage.goto();
    
    // Krok 2: Weryfikacja czy strony istnieją i linki są widoczne
    await homePage.checkRegulaminExists();
    await homePage.checkPolitykaPrywatnosciExists();
    await homePage.checkKontaktExists();
  });

  test('Logowanie do panelu WP Admin - dostępność formularza logowania', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Krok 1: Przejście na stronę logowania do WP-Admin
    await loginPage.goto();
    
    // Krok 2: Weryfikacja widoczności pól do logowania (login, hasło, przycisk)
    await loginPage.checkLoginFieldsVisible();
  });

  test('Weryfikacja widoczności produktów w sklepie', async ({ page }) => {
    const shopPage = new ShopPage(page);
    
    // Krok 1: Przejście do widoku sklepu
    await shopPage.goto();
    
    // Krok 2: Weryfikacja czy produkty się ładują i są widoczne
    await shopPage.checkProductsVisible();
  });

});
