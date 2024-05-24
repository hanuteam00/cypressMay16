//@ts-check
/// <reference types="cypress" />

//similar to Test Suite
describe("Test Suite 1 - Successful Login", () => {
  //similar to Test Group
  context("Test Group 1 - Successful Login", () => {
    //similar to Test Case
    it.only("TC1 - login successfully with correct credentials using read file", () => {
      cy.readFile("cypress/fixtures/educator/testedEducator.json").then((data) => {
        cy.visit("/login?role=educator");
        cy.get(`input[name='email']`).type(data.email);
        cy.get(`input[name='password']`).type(data.password);
        cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
        cy.get(`div[class^='GreetingHeading']`).should("contain", "Welcome");
        cy.get(`div[class='u-marginTopExtraSmall']`).should(
          "contain",
          "Manage your courses and students, all in one place!"
        );
        cy.clearAllLocalStorage();
      });
    });
    //similar to Test Case
    it("TC2 - login successfully with correct credentials", () => {
      //{baseURL}/login?role=educator
      cy.visit("/login?role=educator");
      // Enter username and password
      cy.get(`input[name='email']`).type("engineer+edu1@gotitapp.co");
      cy.get(`input[name='password']`).type("Aa123456@");
      // Click on the login button
      cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
      // Assert/verify that login was successful
      cy.get(`div[class^='GreetingHeading']`).should("contain", "Welcome");
      cy.get(`div[class='u-marginTopExtraSmall']`).should(
        "contain",
        "Manage your courses and students, all in one place!"
      );
    });
  });
});

describe("Test Suite 2 - Failed Login", () => {
  context("Test Group 2 - Login with wrong credentials", () => {
    it("TC3 - login unsuccessfully with incorrect username", () => {
      cy.visit("/login?role=educator");
      cy.get(`input[name='email']`).type("ABC+edu1@gotitapp.co"); // Enter wrong username
      cy.get(`input[name='password']`).type("Aa123456@");
      cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
      cy.get(`.Message-content`).should(
        "contain",
        "Invalid email or password. Please try again!"
      );
    });
    it("TC4 - login unsuccessfully with incorrect password", () => {
      cy.visit("/login?role=educator");
      cy.get(`input[name='email']`).type("manh+edu1@gotitapp.co");
      cy.get(`input[name='password']`).type("Aa123456@@@@@@"); // Enter wrong password
      cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
      cy.get(`.Message-content`).should(
        "contain",
        "Invalid email or password. Please try again!"
      );
    });
  });
});
