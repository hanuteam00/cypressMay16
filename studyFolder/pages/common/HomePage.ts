export class LoginPage {
    elements = {
        // emailInput: () => { cy.get(`input[name='email']`) },
        // passwordInput: () => { cy.get(`input[name='password']`) },
        // loginButton: () => { cy.get(`form.u-widthFull > .Button:nth-of-type(2)`) },
        emailInput: () => cy.get(`input[name='email']`),
        passwordInput: () => cy.get(`input[name='password']`),
        loginButton: () => cy.get(`form.u-widthFull > .Button:nth-of-type(2)`),
    }
}

// module.exports = new LoginPage()