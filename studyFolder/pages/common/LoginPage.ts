//way 1: using export default
// export default class LoginPage {
//     elements = {
//         // emailInput: () => { cy.get(`input[name='email']`) },
//         // passwordInput: () => { cy.get(`input[name='password']`) },
//         // loginButton: () => { cy.get(`form.u-widthFull > .Button:nth-of-type(2)`) },
//         emailInput: () => cy.get(`input[name='email']`),
//         passwordInput: () => cy.get(`input[name='password']`),
//         loginButton: () => cy.get(`form.u-widthFull > .Button:nth-of-type(2)`),
//     }
// }


// way 2a: using module.exports
//Nhược điểm: Mỗi lần bạn gọi emailInput(), passwordInput(), hoặc loginButton(), 
//Cypress phải thực hiện một cuộc gọi mới đến DOM để lấy phần tử, điều này có thể làm chậm chương trình
// export default class LoginPage {
//     elements = {
//         emailInput: () => cy.get(`input[name='email']`),
//         passwordInput: () => cy.get(`input[name='password']`),
//         loginButton: () => cy.get(`form.u-widthFull > .Button:nth-of-type(2)`),
//     }
// }

export default class LoginPage {
    elements = {
        emailInput: () => cy.get(`input[name='email']`),
        passwordInput: () => cy.get(`input[name='password']`),
        loginButton: () => cy.get(`form.u-widthFull > .Button:nth-of-type(2)`),
    }
}

// module.exports = LoginPage;

// way 2b: using module.exports
//Nhược điểm: Cannot call cy.get() outside a running test. do đó không thể sử dụng cy.get() trong class
// export default class LoginPage {
//     elements = {
//         emailInput: cy.get(`input[name='email']`),
//         passwordInput: cy.get(`input[name='password']`),
//         loginButton: cy.get(`form.u-widthFull > .Button:nth-of-type(2)`),
//     }
// }
// module.exports = LoginPage;

