import { loginPage } from '../../pages/Swag-Labs/LoginPage';
import { inventoryPage } from '../../pages/Swag-Labs/InventoryPage';
import { cartPage } from '../../pages/Swag-Labs/CartPage';
import { checkoutPage } from '../../pages/Swag-Labs/CheckoutPage';

describe('Swag Labs E2E Purchase Flow', () => {
    const generateRandomUser = () => ({
        firstName: `User_${Math.floor(Math.random() * 1000)}`,
        lastName: `Last${Math.floor(Math.random() * 1000)}`,
        zipCode: Math.floor(10000 + Math.random() * 90000).toString(),
    });

    it('Complete purchase flow: login, add product, check cart, and checkout', () => {
        const product = 'Sauce Labs Backpack';

        // 1. Login
        loginPage.goto();
        loginPage.login('standard_user', 'secret_sauce');
        cy.url().should('include', 'inventory.html');

        // 2. Add product to cart
        inventoryPage.addProductToCart(product);
        inventoryPage.getCartBadgeCount().should('eq', '1');

        // 3. Check cart
        inventoryPage.goToCart();
        cartPage.isProductInCart(product);

        // 4. Checkout
        cartPage.proceedToCheckout();

        const randomUser = generateRandomUser();
        checkoutPage.fillCheckoutInformation(randomUser);
        checkoutPage.continueToOverview();
        checkoutPage.finishPurchase();

        // 5. Final Verification
        checkoutPage.getCompletionMessage().should('contain', 'Thank you for your order!');

        // 6. Download PDF (Demonstration of capability)
        // Note: we use a conditional or try-catch like approach in Cypress by checking existence
        // because the button doesn't exist on the real site.
        cy.get('body').then(($body) => {
            if ($body.find('[data-test="download-invoice"]').length > 0) {
                checkoutPage.downloadInvoice();
            } else {
                cy.log('Note: PDF download button missing as expected on real site.');
            }
        });
    });
});
