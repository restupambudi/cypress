import { faker } from "@faker-js/faker";

describe('Locations Functionality', () => {
    beforeEach(() => {
        cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
        cy.fixture('user').then(user => {
            cy.login(user.validUsername, user.validPassword);
        });
    })

    it('Should find a location', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/locations"] > p').click();
        cy.get(':nth-child(1) > .px-3 > .flex > .w-full').type('Location Test 23 Jan{enter}');
        cy.get('.table-data-cell > :nth-child(1) > div').contains('Location Test 23 Jan').click();
        cy.contains('Location Test 23 Jan').should('be.visible');
    })

    it('Should not find a location', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/locations"] > p').click();
        cy.get(':nth-child(1) > .px-3 > .flex > .w-full').type('Jakarta{enter}');
        cy.contains('No Data Found').should('be.visible');
    })

    it('Should download locations file', () => {
        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/locations"] > p').click();
        cy.get('.p-4 > :nth-child(1) > .cursor-pointer').click();
        cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
        cy.get('.swal2-confirm').click();
        cy.readFile('cypress/downloads/locations.csv').should('exist'); // Check if the file exists
        cy.readFile('cypress/downloads/locations.csv').then((content) => {
            expect(content).to.include('Location Test A'); // Validate file content
        });
    })

    it('Should create a new location', () => {
        const location_name = faker.location.county();
        const location_desc = faker.lorem.sentence();

        cy.get(':nth-child(2) > .nav-item').click();
        cy.get('[href="#/page/locations"] > p').click();
        cy.get('[class="text-sm text-white"]').contains('Choose Action').click();
        cy.get('[class="ml-2"]').contains('New Location').click();
        cy.get('[name="location.location"]').type(location_name);
        cy.get('[name="location.location_description"]').type(location_desc);
        cy.get('[name="location.location_type"]').select('Operating');
        cy.get('[name="location.location_status"]').select('Planned');
        cy.get('[type="submit"]').click();
        cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
        cy.contains('Success').should('be.visible');
        cy.get('[class="swal2-confirm btn btn-primary hover:text-white"]').click();
    })

    // it('Should delete a location', () => {
    //     cy.get(':nth-child(2) > .nav-item').click();
    //     cy.get('[href="#/page/locations"] > p').click();
    //     cy.get('.divide-y-2 > :nth-child(1) > :nth-child(1) > div').click();
    //     cy.get('[class="text-sm text-white"]').contains('Choose Action').click();
    //     cy.get('[class="ml-2"]').contains('Delete Location').click();
    //     cy.get('[class="css-8mmkcg"]').click();
    //     cy.get('#react-select-3-option-0').click({ force: true });
    //     cy.get('[type="submit"]').click();
    //     cy.get('[class="swal2-confirm swal2-styled swal2-default-outline"]').click();
    //     cy.contains('Success').should('be.visible');
    // })

})