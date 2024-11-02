Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('input[name="firstName"]').type('João')
    cy.get('input[name="lastName"]').type('Mendes')
    cy.get('input[type="email"]').type('joao.mendes@yahoo.com.br')
    cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso')
    cy.contains('button[type="submit"]', 'Enviar').click()
    
    


})