beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: visual tests', ()=> {
    it('Radio buttons and its content', () => {
        // Verify radio buttons
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never').and('not.be.checked')
        
        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        
        // Check the content of the frequency of receiving newsletter
        // Find all radio buttons and their associated labels
        // Assert the content of radio buttons once all labels are collected
       
    });
    it('Country and city dropdown, dependencies between two dropdown', () => {
        // Check the content of the Country dropdown
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['','object:3', 'object:4', 'object:5'])
        })

        // The selected country should give the corresponding result in the form of the correct city

        it('Select Spain and verify city options', () => {
            cy.get('#country').select('Spain')
            cy.get('#city').should('not.be.empty')
            cy.get('#city option:not(:empty)').then(($options) => {
                const cityOptions = Array.from($options).map((option) => option.textContent);
                expect(cityOptions).to.deep.equal(['Malaga', 'Madrid', 'Valencia', 'Corralejo']);
            });
        });

        it('Next select Estonia and verify city options', () => {
            cy.get('#city').should('not.be.empty')
            cy.get('#city option:not(:empty)').then(($options) => {
                const cityOptions = Array.from($options).map((option) => option.textContent);
                expect(cityOptions).to.deep.equal(['Tallinn', 'Haapsalu', 'Tartu']);
            }); 
        })
        it('Next select Austria and verify city options', () => {
            cy.get('#city').should('not.be.empty')
            cy.get('#city option:not(:empty)').then(($options) => {
                const cityOptions = Array.from($options).map((option) => option.textContent);
                expect(cityOptions).to.deep.equal(['Vienna', 'Salzburg', 'Innsbruck']);
            });
        })
    })
})

//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
it('This is my first test', () => {
    // verify radio buttons and its content
    cy.get('input[type="radio"]').should('have.length', 4)
    cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never').and('not.be.checked')
});