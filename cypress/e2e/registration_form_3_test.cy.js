beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
const nameUser = 'testername'
const myEmail = 'tester@gmail.com'

describe('Section 1: visual tests', ()=> {
    it('Verify newsletter radio buttons and its content', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never').and('not.be.checked')
        
        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });

    it('Country and city dropdown, dependencies between two dropdown', () => {
        // Check the content of the Country dropdown
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['','object:3', 'object:4', 'object:5'])
        });

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
        });

        it('Next select Austria and verify city options', () => {
            cy.get('#city').should('not.be.empty')
            cy.get('#city option:not(:empty)').then(($options) => {
                const cityOptions = Array.from($options).map((option) => option.textContent);
                expect(cityOptions).to.deep.equal(['Vienna', 'Salzburg', 'Innsbruck']);
            });
        });
    });

    it('Logo should be correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 166
        cy.get('img').invoke('height').should('be.lessThan', 167)
            .and('be.greaterThan', 100);
    });
});

describe('Section 2: functional tests', () => {
    it('All fields should be filled in order to submit the form', () => {
        cy.get('#name').clear().type(nameUser);
        cy.get('input[type="email"]').type(myEmail);
        
        //Select Spain for that test
        cy.get('#country').select('Spain')
        cy.get('#city').should('not.be.empty').select('Madrid');

        //Select the frequency of receiving newsletter
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        
        //Select date of birth
        cy.get('#birthday').type('2023-08-08');

        //Select privacy police and cookie
        cy.get('input[type="checkbox"]').click({ multiple: true });

        //Upload a file
        cy.get('input[type="file"]').selectFile('load_this_file_reg_form_3.txt')

        //Submit the form
        //the form has two submit buttoms, this is bug,but we're not doing a report in this project
        //so I had to write this script to reach the right button
        cy.get('input[type="submit"]').should('have.length', 2)
        cy.get('input[type="submit"]').eq(0).should('not.be.checked')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').contains('Submission received').should('be.visible')
    });

    it('Only mandatory fields should be filled in order to submit the form', () => {
        cy.get('#name').clear().type(nameUser);
        cy.get('input[type="email"]').type(myEmail);
        cy.get('#country').select('Estonia');
        cy.get('#city').should('not.be.empty').select('Tartu');
        cy.get('input[type="radio"]').should('have.length', 4);
        cy.get('input[type="radio"]').eq(0).check().should('be.checked');
        cy.get('input[type="radio"]').eq(1).check().should('be.checked');
        cy.get('input[type="radio"]').eq(0).should('not.be.checked');
        cy.get('input[type="checkbox"]').click({ multiple: true });

        //Submit the form
        cy.get('input[type="submit"]').should('have.length', 2)
        cy.get('input[type="submit"]').eq(0).should('not.be.checked')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').contains('Submission received').should('be.visible')
    });

    it('Mandatory field is absent to prevent the form submission', () => {
        //email field is absent
        cy.get('#name').clear().type(nameUser);
        cy.get('#country').select('Estonia');
        cy.get('#city').should('not.be.empty').select('Tartu');
        cy.get('input[type="checkbox"]').click({ multiple: true });
        //Submit button should be not enabled
        cy.get('input[type="submit"]').should('have.length', 2);
        cy.get('input[type="submit"]').eq(0).should('not.be.checked');
        cy.get('input[type="submit"]').eq(1).should('not.be.enabled');
    });

    it('Verify the link Accept our cookie policy is opens, then return back', () => {
        cy.get('button').should('have.text', 'Accept our cookie policy').click();
        cy.go('back');
    });
});