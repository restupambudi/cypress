describe('Locations Functionality', () => {
    beforeEach(() => {
        cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
        cy.fixture('user').then(user => {
            cy.login(user.validUsername, user.validPassword);
        });
    })

    it('should find a location', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/locations"] > p').click();
        cy.get(':nth-child(1) > .px-3 > .flex > .w-full').type('Location Test 23 Jan{enter}');
        cy.get('.table-data-cell > :nth-child(1) > div').contains('Location Test 23 Jan').click();
        cy.contains('Location Test 23 Jan').should('be.visible');
    })

    it('should not find a location', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/locations"] > p').click();
        cy.get(':nth-child(1) > .px-3 > .flex > .w-full').type('Jakarta{enter}');
        cy.contains('No Data Found').should('be.visible');
    })

})