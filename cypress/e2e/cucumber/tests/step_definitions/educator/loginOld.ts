//Automation, DEV will use this file to transfer manual test cases to automation test cases
// import { Before, After, Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Before, After, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPageUI from '../../../pages/Educator/LoginPageUI';
import HomePageUI from '../../../pages/Educator/HomePageUI';

const loginPage = new LoginPageUI();
const homePageEdu = new HomePageUI();

Given(`This will run before each scenario`, () => {
  cy.log(
    "Background - This will run before each scenario"
  );
})

Given(`I visit the login page`, () => {
  // way 1: use data global defined in before hook using this.data....
  cy.visit("/login?role=educator")
})

When(`I enter valid username and password`, () => {
  cy.fixture('educator/testedEducator').then((testedEducator) => {
    //way 2: data local - use in this step only
    loginPage.emailInput.type(testedEducator.email)
    loginPage.passwordInput.type(testedEducator.password)
  })
})

When(`I click on login button`, () => {
  loginPage.loginButton.click()
})

Then(`I'm logged in successfully`, () => {
  cy.contains('Manage your courses and students, all in one place!').should('be.visible')
  cy.clearAllLocalStorage();
})

Then(`I enter invalid username or password, I should see error message`, () => {
  //
  cy.fixture('common/invalidLogins').then((invalidLogins) => {
    invalidLogins.forEach((login: any) => {
      // Clear and type email if not empty
      if (login.email !== "") {
        loginPage.emailInput.clear().type(login.email);
      } else {
        loginPage.emailInput.clear();
      }

      // Clear and type password if not empty
      if (login.password !== "") {
        loginPage.passwordInput.clear().type(login.password);
      } else {
        loginPage.passwordInput.clear();
      }

      // Click the login button only if both email and password are not empty
      if (login.email !== "" && login.password !== "") {
        loginPage.loginButton.click()
      }

      // Check for the first error message
      if (login.errorMessage1) {
        cy.get('.Message-content').should('be.visible').and('contain', login.errorMessage1);
      }

      // Check for the second error message, if present
      if (login.errorMessage3) {
        cy.get('[class^="FeedbackWrapper"]:first').should('be.visible').and('contain', login.errorMessage3);
      }
      // Check for the second error message, if present
      if (login.errorMessage4) {
        cy.get('[class^="FeedbackWrapper"]:last').should('be.visible').and('contain', login.errorMessage4);
      }
    });
  });
});