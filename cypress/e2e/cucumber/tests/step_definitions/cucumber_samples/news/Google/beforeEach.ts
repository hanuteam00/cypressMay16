beforeEach(() => {
  cy.log(
    "beforeEach Google - This will run before every scenario of Google.feature test, but NEVER for Facebook/Google feature files"
  );
});
