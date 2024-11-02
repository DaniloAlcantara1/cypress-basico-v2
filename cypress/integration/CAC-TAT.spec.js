/// <reference types="Cypress" />

const user = {}



describe('Central de Atendimento ao Cliente TAT', function () {
    it('verifica o título da aplicação', function () {
        cy.visit('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
})

describe('preenche os campos obrigatórios e envia o formulário', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')

    })

    it('1 -preenche os campos obrigatórios e envia o formulário', function () {

        cy.get('input[name="firstName"]').type('João')
        cy.get('input[name="lastName"]').type('Mendes')
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com.br')
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso')
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('1 extra - preenche os campos obrigatórios e envia o formulário com delay', function () {

        const longtext = 'É preciso escolher um caminho que não tenha fim, mas, ainda assim, caminhar sempre na expectativa de encontrá-lo.'
        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com.br', { delay: 0 })
        cy.get('textarea[name="open-text-area"]').type(longtext, { delay: 0 })
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('2 extra - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes.com', { delay: 0 })
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('3 extra - campo de telefone só aceita números e continua vazio se preenchido com valor não numerico', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })

        cy.get('#phone')
            .type('abcdefghijk')
            .should('be.empty')

        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('4 extra - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        cy.get('input[type="number"]').type('abcdefghijk').should('be.empty')
        cy.get('#phone-checkbox').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button[type="submit"]', 'Enviar').click()


        cy.get('.error').should('be.visible')
    })



    it('5 extra - preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('input[name="firstName"]')
            .type('João', { delay: 0 })
            .should('have.value', 'João')
            .clear()
            .should('be.empty')

        cy.get('input[name="lastName"]')
            .type('Mendes', { delay: 0 })
            .should('have.value', 'Mendes')
            .clear()
            .should('be.empty')

        cy.get('input[type="email"]')
            .type('joao.mendes@yahoo.com', { delay: 0 })
            .should('have.value', 'joao.mendes@yahoo.com')
            .clear()
            .should('be.empty')

        cy.get('input[type="number"]')
            .type('11955449973')
            .should('have.value', '11955449973')
            .clear()
            .should('be.empty')

        cy.get('textarea[name="open-text-area"]')
            .type('Meu segundo teste no curso', { delay: 0 })
            .should('have.value', 'Meu segundo teste no curso')
            .clear()
            .should('be.empty')

        cy.get('input[value="phone"]').check()
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('6 extra - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('7 extra - envia o formuário com sucesso usando um comando customizado', function () {

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('span[class="success"]').should('be.visible')

    })

    it('8 extra - identificar elemento usando contains', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        //cy.get('input[type="number"]').type('1194444444').should('be.empty')
        cy.get('input[value="phone"]').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        cy.get('input[type="number"]').type('1194444444').should('be.empty')
        cy.get('select').select('YouTube').should('have.value', 'youtube')
        cy.get('input[value="phone"]').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })


    it('seleciona um produto (Mentoria) por seu valor (value)', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        cy.get('input[type="number"]').type('1194444444').should('be.empty')
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
        cy.get('input[value="phone"]').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Blog) por seu índice', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        cy.get('input[type="number"]').type('1194444444').should('be.empty')
        cy.get('select').select(1).should('have.value', 'blog')
        cy.get('input[value="phone"]').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('marca o tipo de atendimento "Feedback"', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        cy.get('input[type="number"]').type('1194444444').should('be.empty')
        cy.get('select').select(1).should('have.value', 'blog')

        cy.get('input[type="radio"]').check('feedback').should('be.checked')

        cy.get('input[value="phone"]').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('marca cada tipo de atendimento', function () {

        cy.get('input[name="firstName"]').type('João', { delay: 0 })
        cy.get('input[name="lastName"]').type('Mendes', { delay: 0 })
        cy.get('input[type="email"]').type('joao.mendes@yahoo.com', { delay: 0 })
        cy.get('input[type="number"]').type('1194444444').should('be.empty')
        cy.get('select').select(1).should('have.value', 'blog')

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

        cy.get('input[value="phone"]').check()
        cy.get('textarea[name="open-text-area"]').type('Meu segundo teste no curso', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {

        cy.get('#check input[type="checkbox"]')
            .as('checkboxes')
            .check().should('be.checked')
            .last().uncheck().should('not.be.checked')

    })

    it.only('realiza upload de arquivo em formulario', () => {

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/O FILME.png')
            .then(input => {
                expect(input[0].files[0].name).to.equal('O FILME.png')
            })
    })

    it.only('realiza upload de arquivo em formulario com drag and drop', () => {

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/O FILME.png', {action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('O FILME.png')
            })
    })

    it('realiza upload de arquivo em formulario com fixture', () => {
        cy.fixture('O FILME.png', {encoding: null}).as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile({
                contents: '@exampleFile',
                fileName: 'O FILME.png'
            })
            .then(input => {
                expect(input[0].files[0].name).to.equal('O FILME.png')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{

        cy.get('a[target="_blank"]').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    




})




