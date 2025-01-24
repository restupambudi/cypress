describe('My First Test', () => {
  it('Visits the kitchen sink', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@gmail.com')

    // Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@gmail.com')

    cy.get('.action-email').clear()

    // Delay each keypress by 0.1 sec
    cy.get('.action-email').type('slow.typing@email.com', {delay: 100})

    // cy.get('.action-disabled').type('disabled error checking', {force: true})
    // cy.get('.action-disabled').should('have.value', 'disabled error checking')

    
    // .focus()
    // cy.get('.action-focus').focus()


    // .submit()
    cy.get('.action-form')
      .find('[type="text"]').type('HALLOFF')

    cy.get('.action-form').submit()

    cy.get('.action-form').next().should('contain', 'Your form has been submitted!')


    // .dblclick()
    cy.get('.action-div').dblclick()
    cy.get('.action-div').should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')


    // .rightclick()
    cy.get('.rightclick-action-div').rightclick()
    cy.get('.rightclick-action-div').should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')


    // .check()
    // .check() with check all
    // cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check()
    // cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked')

    // cy.get('.action-radios [type="radio"]').not('[disabled]').check()
    // cy.get('.action-radios [type="radio"]').not('[disabled]').should('be.checked')

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]').check('radio1')
    cy.get('.action-radios [type="radio"]').not('[disabled]').should('be.checked')
  
    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2'])
    cy.get('.action-multiple-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked')

    // Ignore error checking prior to checking
    cy.get('.action-radios [type="radio"]').check('radio3', { force : true })
    cy.get('.action-radios [type="radio"]').should('be.checked')


    // .uncheck()
    // .uncheck() with all uncheck
    // cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck()
    // cy.get('.action-check [type="checkbox"]').not('[disabled]').should('be.not.checked')
  
    // .uncheck() accepts a value argument
    // cy.get('.action-check [type="checkbox"]').check('checkbox1')
    // cy.get('.action-check [type="checkbox"]').uncheck('checkbox1')
    // cy.get('.action-check [type="checkbox"][value="checkbox1"]').should('be.not.checked')

    // .uncheck() accepts an array of values 
    cy.get('.action-check [type="checkbox"]').uncheck(['checkbox1', 'checkbox3'])
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should('be.not.checked')
    cy.get('.action-check [type="checkbox"][value="checkbox3"]').should('be.not.checked')

    // Ignore error checking prior to unchecking
    cy.get('.action-check [type="checkbox"]').uncheck('checkbox2', { force : true })
    cy.get('.action-check [type="checkbox"][value="checkbox2"]').should('be.not.checked')


    // .select()
    // No option should be selected
    cy.get('.action-select').should('have.value', '--Select a fruit--')
    
    // Select option(s) with matching text context
    cy.get('.action-select').select('apples')
    cy.get('.action-select').should('have.value', 'fr-apples')

    // Select option(s) with matching value
    cy.get('.action-select').select('fr-bananas')
    cy.get('.action-select').should('have.value', 'fr-bananas')


    // .scrollIntoView()
    cy.get('#scroll-horizontal button').scrollIntoView()
    cy.get('#scroll-horizontal button').should('be.visible')
  })
})