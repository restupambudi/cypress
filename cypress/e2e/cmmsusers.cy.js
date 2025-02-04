describe('Users Functionality', () => {
    beforeEach(() => {
        cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
        cy.fixture('user').then(user => {
            cy.login(user.validUsername, user.validPassword);
        });
    })

    it('Should filter all active users', () => {
        cy.get(':nth-child(5) > .nav-item').click();
        cy.get('[href="#/page/security/users"] > p').click();
        cy.get('select.w-full.border-none.text-body-small.fw-normal').eq(0).select('Active');   
        cy.get('div.text-red-main').should('not.exist');
    })

    it('Should filter all inactive users', () => {
        cy.get(':nth-child(5) > .nav-item').click();
        cy.get('[href="#/page/security/users"] > p').click();
        cy.get('select.w-full.border-none.text-body-small.fw-normal').eq(0).select('Active');   
        cy.get('div.text-green-main').should('not.exist');
    })

})