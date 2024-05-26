/// <reference types ="cypress"/>

export default class LoginPage {
    enterURL() {
        cy.visit(
            "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        );
        return this;
    }
    enterUserNamePassword(username, password) {
        cy.get('[id="input-email"]').type(username);
        cy.get('[id="input-password"]').type(password);
        return this;
    }
    clickSubmitButton() {
        cy.get('[type="submit"]').eq(0).click();
        return this;
    }
    verifyPageTitle() {
        return cy.title().should("eq", "Search -");
    }
    clickOnLogo() {
        cy.get('[title="Poco Electro"]').click();
        cy.wait(2000);
        return this;
    }
    scrollToTheProduct() {
        cy.get('[title="iPod Touch"]').eq(0).scrollIntoView().click();
        return this;
    }
}

/*
/// <reference types ="cypress"/>
class LoginPage {
    enterURL() {
        cy.visit(
            "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        );
    }
    enterUserNamePassword(username, password) {
        cy.get('[id="input-email"]').type(username);
        cy.get('[id="input-password"]').type(password);
        return this;
    }
    // clickSubmitButton(username, password) {
    clickSubmitButton() {
        cy.get('[type="submit"]').eq(0).click();
        return this;
        //return this;: Đây là một kỹ thuật lập trình được gọi là Method Chaining (chuỗi phương thức). 
        //Khi một phương thức trả về this, nó trả về một tham chiếu đến đối tượng hiện tại, 
        //cho phép bạn gọi nhiều phương thức trên cùng một đối tượng mà không cần phải tham chiếu đến đối tượng sau mỗi lần gọi. Ví dụ:
        //login.enterUserNamePassword('username', 'password').clickSubmitButton();
    }

    verifyPageTitle() {
        return cy.title().should("eq", "Search -");
        //Trong trường hợp này, phương thức verifyPageTitle trả về một Promise từ cy.title().should("eq", "Search -").'
        //Promise này sẽ được giải quyết khi tiêu đề của trang hiện tại bằng "Search -".
        //Điều này cho phép bạn chờ đợi cho đến khi tiêu đề trang đúng như mong đợi trước khi tiếp tục với các bước tiếp theo trong bài kiểm tra của bạn.
    }
    clickOnLogo() {
        cy.get('[title="Poco Electro"]').click();
        cy.wait(2000);
    }
    scrollToTheProduct() {
        cy.get('[title="iPod Touch"]').eq(0).scrollIntoView().click();
    }
}
const login = new LoginPage();
export default login;
*/