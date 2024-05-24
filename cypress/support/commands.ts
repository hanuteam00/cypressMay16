/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      verifyPageElements(jsonPath: any): Chainable<void>;
      writeGeneratedEducator(jsonPath: any): Chainable<void>;
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.overwrite(
  "type",
  (originalFn, subject, text, options = {}) => {
    options.delay = 100;
    // return originalFn(subject, text); -> not work
    //@ts-ignore
    return originalFn(subject, text, options);
  }
);

Cypress.Commands.add("verifyPageElements", (jsonPath: any) => {
  cy.fixture(jsonPath).then((data) => {
    const texts = data.texts;
    const links = data.links;

    // Verify texts
    texts.forEach((text: string) => {
      cy.contains(text).should("exist");
    });

    // Verify links
    links.forEach((link: string) => {
      cy.contains("a", link).should("exist");
    });
  });
});

Cypress.Commands.add("writeGeneratedEducator", (jsonPath) => {
  cy.readFile(jsonPath).then((data) => {
    const rand = new Date().getTime();
    data.push({
      email: `engineer+record${rand}@gotitapp.co`,
      password: "Aa123456@",
      firstname: "engineer",
      lastname: `record${rand}`,
      currentTime: rand,
    });
    cy.writeFile(jsonPath, data);
  });
});

/*
Cypress.Commands.add(
  "delay",
  { prevSubject: "optional" },
  (subject, ms = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(subject);
      }, ms);
    });
  }
);

const commandsToWrap = [
    'visit',
    'click',
    'type',
    'select',
    'check',
    'uncheck',
    'clear',
    'reload',
    'contains',
    'get',
    'find',
    'children',
    'trigger',
    // Add more commands as needed
  ];
  
  commandsToWrap.forEach(command => {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      // Call the original Cypress command
      const result = originalFn(...args);
  
      // Add a delay after the command
      return cy.delay().then(() => result);
    });
  });
  */
