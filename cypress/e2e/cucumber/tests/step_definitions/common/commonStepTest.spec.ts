import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from "../../../pages/Common/LoginPage/LoginPage.spec";
const login = new LoginPage();

Given("I navigate to the Website", () => {
    login.enterURL();
});

When("I entered valid credential", (datatable: DataTable) => {
    datatable.hashes().forEach((element) => {
        login.enterUserNamePassword(element.email, element.validpassword);
    });
});

When("User click on sign in button", () => {
    login.clickSubmitButton();
});

Then("Validate the title after login", () => {
    login.verifyPageTitle();
});   