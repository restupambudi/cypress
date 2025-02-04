describe('Login Functionality', () => {
    beforeEach(() => {
        cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
    })

    it('Login with valid credentials', () => {
        cy.fixture('user').then(user => {
            cy.get('[name="username"]').type(user.validUsername);
            cy.get('[name="password"]').type(user.validPassword);
            cy.get('[type="submit"]').click();
            cy.contains('Dashboard').should('be.visible');
        });
    })

    it('Login with invalid credentials', () => {
        cy.fixture('user').then(user => {
            cy.get('[name="username"]').type(user.invalidUsername);
            cy.get('[name="password"]').type(user.invalidPassword);
            cy.get('[type="submit"]').click();
            cy.contains('signin: invalid username / email or password').should('be.visible');
        });
    })

    it('Should not log in because of password is empty', () => {
        cy.fixture('user').then(user => {
            cy.get('[name="username"]').type(user.invalidUsername);
            cy.get('[type="submit"]').should('be.disabled');
        });
    })

    it('Should log out from the system', () => {
        cy.fixture('user').then(user => {
            cy.get('[name="username"]').type(user.validUsername);
            cy.get('[name="password"]').type(user.validPassword);
            cy.get('[type="submit"]').click();
            cy.get('.sidebar-footer > .nav-item').click();
            cy.contains('Logout').click();
            cy.contains('Login').should('be.visible');
        });
    })
    
})