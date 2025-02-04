import { faker } from "@faker-js/faker";

describe('Assets Functionality', () => {
    beforeEach(() => {
        cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
        cy.fixture('user').then(user => {
            cy.login(user.validUsername, user.validPassword);
        });
    })

    it('Should find an asset', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get(':nth-child(1) > .px-4 > .border-none').type('ABC-X Asset{enter}');
        cy.get('.table-data-cell > :nth-child(1) > div').contains('ABC-X Asset').click();
        cy.contains('Assets ID : 49').should('be.visible');
    })

    it('Should not find an asset', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get(':nth-child(1) > .px-4 > .border-none').type('!@#{enter}');
        cy.contains('No Data Found').should('be.visible');
    })

    it('Should download assets file', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get('.p-4 > :nth-child(1) > .cursor-pointer').click();
        cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
        cy.get('.swal2-confirm').click();
        cy.readFile('cypress/downloads/assets.csv').should('exist'); // Check if the file exists
        cy.readFile('cypress/downloads/assets.csv').then((content) => {
            expect(content).to.include('ABC-D'); // Validate file content
        });
    })

    it('Should create a new asset', () => {
        const asset_name = faker.word.noun();
        const asset_desc = faker.lorem.sentence();
        const kks_num = faker.string.numeric(4);
        const ex_code = faker.string.numeric(4);

        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get('[class="text-sm text-white"]').contains('Choose Action').click();
        cy.get('[class="ml-2"]').contains('New Assets').click();
        cy.get('[name="asset_num"]').type(asset_name);
        cy.get('[name="asset_description"]').type(asset_desc);
        cy.get('[name="kks_number"]').type(kks_num);
        cy.get('[name="existing_code"]').type(ex_code);
        cy.get(':nth-child(5) > .w-full > .css-lsal45-control > .css-1wy0on6').click();
        cy.get('#react-select-2-option-0').click();
        cy.get(':nth-child(7) > .w-full > .css-lsal45-control > .css-1wy0on6').click();
        cy.get('#react-select-4-option-0').click();
        cy.get(':nth-child(6) > .row > :nth-child(3) > .css-b62m3t-container > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
        cy.get('#react-select-6-option-0').click();
        cy.get('[type="submit"]').click();
        cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
        cy.contains('Success').should('be.visible');
        cy.get('[class="swal2-confirm btn btn-primary hover:text-white"]').click();
    })

    it('Should update an asset', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get('.divide-y-2 > :nth-child(1) > :nth-child(1) > div').click();
        cy.get('[class="text-sm text-white"]').contains('Choose Action').click();
        cy.get('[class="ml-2"]').contains('Update/Edit Assets').click();
        cy.get('[name="asset_description"]').type('Description edited');
        cy.get('[type="submit"]').click();
        cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
        cy.contains('Success').should('be.visible');
        cy.get('[class="swal2-confirm btn btn-primary hover:text-white"]').click();
        cy.contains('Description edited').should('be.visible');
    })

    it('Should delete an asset', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get('.divide-y-2 > :nth-child(1) > :nth-child(1) > div').click();
        cy.get('[class="text-sm text-white"]').contains('Choose Action').click();
        cy.get('[class="ml-2"]').contains('Delete Assets').click();
        cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
        cy.contains('Success').should('be.visible');
        cy.get('[class="swal2-confirm swal2-styled"]').click();
    })

    it('Should not create a new asset because the mandatory field is empty', () => {
        const asset_name = faker.word.noun();
        const kks_num = faker.string.numeric(4);
        const ex_code = faker.string.numeric(4);

        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/assets"] > p').click();
        cy.get('[class="text-sm text-white"]').contains('Choose Action').click();
        cy.get('[class="ml-2"]').contains('New Assets').click();
        cy.get('[name="asset_num"]').type(asset_name);
        cy.get('[name="kks_number"]').type(kks_num);
        cy.get('[name="existing_code"]').type(ex_code);
        cy.get(':nth-child(5) > .w-full > .css-lsal45-control > .css-1wy0on6').click();
        cy.get('#react-select-2-option-0').click();
        cy.get(':nth-child(7) > .w-full > .css-lsal45-control > .css-1wy0on6').click();
        cy.get('#react-select-4-option-0').click();
        cy.get(':nth-child(6) > .row > :nth-child(3) > .css-b62m3t-container > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
        cy.get('#react-select-6-option-0').click();
        cy.get('[type="submit"]').should('be.disabled');
    })

})