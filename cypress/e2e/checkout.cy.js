import { faker } from "@faker-js/faker";

describe('Checkout Functionality with Faker', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.fixture('user').then(user => {
            cy.login(user.validUsername, user.validPassword);
        });
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
    })

    it('should complete checkout with auto-generated data', () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode();

        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type(firstName);
        cy.get('[data-test="lastName"]').type(lastName);
        cy.get('[data-test="postalCode"]').type(zipCode);
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.contains('Thank you for your order!').should('be.visible');
    })
    
})