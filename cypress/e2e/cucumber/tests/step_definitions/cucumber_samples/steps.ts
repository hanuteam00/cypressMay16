import { When } from '@badeball/cypress-cucumber-preprocessor';

When('a step', () => {
  // Here you can write the code that should be executed when this step is run
  // For example, you might want to visit a webpage, click a button, etc.
  // Here's an example where we visit a webpage:
  cy.visit('http://example.com');
});