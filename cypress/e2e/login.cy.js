describe('Login Functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    })

    it('should log in with valid credentials', () => {
        cy.fixture('user').then(user => {
            cy.get('[data-test="username"]').type(user.validUsername);
            cy.get('[data-test="password"]').type(user.validPassword);
            cy.get('[data-test="login-button"]').click();
            cy.contains('Products').should('be.visible');
        });
    })

    it('should not log in with invalid credentials', () => {
        cy.fixture('user').then(user => {
            cy.get('[data-test="username"]').type(user.invalidUsername);
            cy.get('[data-test="password"]').type(user.invalidPassword);
            cy.get('[data-test="login-button"]').click();
            cy.contains('Username and password do not match').should('be.visible');
        });
    })
    
})