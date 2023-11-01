beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

const myEmail = 'tester@gmail.com'
const phonenumber = '568903847'
let password = '0000'
const firstName = 'testername'
const lastName = 'testerlastname'
const userName = 'testerusername'

describe('Section 1: Functional tests', () => {
    it('Passwords should not match in order to prevent form submission', ()=>{
        cy.get('#username').type(userName);
        cy.get('#email').type(myEmail);
        cy.get('input[data-cy="name"]').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('input[data-testid="phoneNumberTestId"]').type(phonenumber);
        cy.get('input[name="password"]').type(password);
        cy.get('[name="confirm"]').type('857575499');
       
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('not.be.enabled');
        cy.get('h2').contains('Password').click();
    
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible');

        // Assert that error message is visible
        cy.get('#password_error_message')
            .should('be.visible')
            .should('contain', 'Passwords do not match!');
    });

    it('Passwords should match in order to submit the form', () => {
        cy.get('#username').type(userName);
        cy.get('#email').type(myEmail);
        cy.get('input[data-cy="name"]').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('input[data-testid="phoneNumberTestId"]').type(phonenumber);
        cy.get('input[name="password"]').type(password);
        cy.get('[name="confirm"]').type(password);

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();

        // Assert that successful message is visible
        cy.get('#success_message').should('be.visible');

        // Assert that error message is not visible
        cy.get('#password_error_message')
            .should('not.be.visible')
            .should('contain', 'Passwords do not match!');
    });
    
    it('User should submit form with all fields added', ()=>{
        cy.get('#username').type(userName);
        cy.get('#email').type(myEmail);
        cy.get('input[data-cy="name"]').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('input[data-testid="phoneNumberTestId"]').type(phonenumber);
        cy.get('input[name="password"]').type(password);
        cy.get('[name="confirm"]').type(password);
        cy.get('[type="radio"]').check();
        cy.get('[type="checkbox"]').check();
        cy.get('select#cars').select('audi');
        cy.get('select#animal').select('Cow');
      
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible');
    });

    it('User should submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type(userName);
        cy.get('#email').type(myEmail);
        cy.get('input[data-cy="name"]').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('input[data-testid="phoneNumberTestId"]').type(phonenumber);
        cy.get('input[name="password"]').type(password);
        cy.get('[name="confirm"]').type(password);

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();

        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible');
    });

    it('Verify that the submit button is not enabled when some mandatory field is not present', () => {
        //Field with phonenumber is not present
        cy.get('#username').type(userName);
        cy.get('#email').type(myEmail);
        cy.get('input[data-cy="name"]').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('input[name="password"]').type(password);
        cy.get('[name="confirm"]').type(password);

        // Assert that submit button is not enabled
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('not.be.enabled');
    });
});

describe('Section 2: Visual tests', () => {
    it('Logo should be correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100);
    });

    it('The second logo should be correct and has the correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal 116
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan',87);
   });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2);

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2');
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click();
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html');
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2');
    });

    it('Check navigation part, second link to Cerebrum Hub homepage', () => {
        cy.get('nav').children().should('have.length', 2);

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2');

        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click();

        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/');

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2');
    });

    it('Check that radio button list is correct and select 1 element', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });

    it('Check that the list of checkboxes is correct and select 2 elements', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')

        // Select 2 elements
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    });

    it('Car dropdown is correct. Should make a screenshot', () => {
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        cy.get('#cars').children().should('have.length', 4);
        cy.get('#cars').find('option').should('have.length', 4);
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo');
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        });
    });

    it('Check that the dropdown of favorite animals is correct. Shoud make a screenshot', () => {
        //Verify that the animal dropdown has six choices.
        cy.get('#animal').find('option').should('have.length', 6);

        //Verify all values in the dropdown.
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog');
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat');;
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake');
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo');
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow');
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse');

        // Advanced level how to check the content of the animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        });

        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
    });
});