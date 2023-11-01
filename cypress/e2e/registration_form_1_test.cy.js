beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

describe('Test suite for validation', () => {
    it('User should submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777');
        cy.get('input#firstName').type('testname');
        cy.get('input#lastName').type('testlastname');
        cy.get('input[name="password"]').type('857575495');
        cy.get('[name="confirm"]').type('857575495');
        cy.get('#username').type('testusername');

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();

        // Assert that both input and password error messages are not shown
        cy.get('#input_error_message').should('not.be.visible');

        // Assert that success message is visible
        cy.get('#success_message').should('be.visible');
    });

    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe');
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040');
        cy.get('input[name="password"]').type('MyPass');
        cy.get('[name="confirm"]').type('MyPass123');
        cy.get('[name="confirm"]').type('{enter}');

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom');

        // Assert that password error message is visible, and message should contain 'Passwords do not match!
        cy.get('#password_error_message')
            .should('be.visible')
            .should('contain', 'Passwords do not match!');

        // Asserting that Submit button is disabled, success message is not visible
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');

        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match');
    });

    it('User cannot submit data when username is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040');
        cy.get('input[name="password"]').type('MyPass');
        cy.get('[name="confirm"]').type('MyPass');

        // Scroll back to username input field
        cy.get('#username').scrollIntoView();
        cy.get('#username').clear().type('  ');
        cy.get('h2').contains('Password').click();

        // Asserting that Submit button is disabled, success message is not visible
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');

        // Assert that correct error message is visible
        cy.get('#input_error_message') 
            .should('be.visible')
            .should('contain', 'Mandatory input field is not valid or empty!');

        // Assert that username has tooltip with error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field');

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible');
        cy.get('#input_error_message').should('have.css', 'display', 'block');
    });

    it('User cannot submit data when phone number is absent', () => {
        // Assert that submit button is not enabled and that successful message is not visible
        cy.get('[data-testid="phoneNumberTestId"]').clear();
        cy.get('input[name="password"]').type('857575495');
        cy.get('[name="confirm"]').type('857575495');

        // Scroll back to username input field
        cy.get('#username').scrollIntoView();
        cy.get('#username').type('Something');
        cy.get('h2').contains('Password').click();

        // Asserting that Submit button is disabled, success message is not visible
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');
    });

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777');
        cy.get('input#firstName').type('nastja');
        cy.get('input#lastName').type('vassiiscool');
        cy.get('input[name="password"]').type('857575495');
        cy.get('[name="confirm"]').clear();
        cy.get('#username').type('Something');

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click();

        // Asserting that Submit button is disabled, success message is not visible
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');

        // Assert that both input and password error messages are not shown
        cy.get('#password_error_message').should('have.css', 'display', 'none');
    });

    it('User cannot add letters to phone number', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('abc',{ force: true });
        cy.get('input[name="password"]').type('857575495');
        cy.get('[name="confirm"]').type('857575495');
        cy.get('#username').type('Something');

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click();

        // Asserting that Submit button is disabled, success message is not visible
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');
    });
})