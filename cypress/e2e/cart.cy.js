describe('Cart Functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.fixture('user').then(user => {
            cy.login(user.validUsername, user.validPassword);
        });
    })

    it('should add a product to the cart', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.contains('Sauce Labs Backpack').should('be.visible');
    })

    it('should remove a product from the cart', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.contains('awawaw').should('not.exist');
    })
    
})