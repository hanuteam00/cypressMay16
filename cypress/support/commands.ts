/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
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
      //Custom command to select DOM element by data-cy attribute. (eg: cy.dataCy('greeting'))
      loginUI(email: any, password: any): Chainable<void>;
      getFaker(): Chainable<any>;
      writeToJson(fileNamePath: any, data1: any, data2: any, data3: any, data4: any, data5: any, data6: any): void;
      generateTestData(): Chainable<void>;
      loginMay22(): Chainable<void>;
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

Cypress.Commands.add("loginMay22", () => {
  cy.visit('/login?role=educator'); // Assuming your login page is at '/login'
  // Enter username and password
  cy.get(`input[name='email']`).type('manh+edu1@gotitapp.co')
  cy.get(`input[name='password']`).type('Aa123456@')
  // Click on the login button
  cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
  // Assert that login was successful
  cy.get(`div[class^='GreetingHeading']`).should("contain", "Welcome");
})

//way 2: "module":"CommonJS" or no "module" in tsconfig.json + no import (eg: import { faker } from "@faker-js/faker";), only const { faker } = require("@faker-js/faker");

// declare namespace Cypress {
//   interface Chainable<Subject> {
//     loginUI(email: any, password: any): Chainable<Subject>;
//     getFaker(): Chainable<any>;
//     writeToJson(fileNamePath:any, data1:any, data2:any, data3:any, data4:any, data5:any, data6:any): void;
//     // faker: typeof faker;
//   }
// }


// Cypress.Commands.add("loginUI", { prevSubject: false }, (email, password) => {
Cypress.Commands.add("loginUI", (email, password) => {
  cy.visit("/login?role=educator"); // Assuming your login page is at '/login'
  // Enter username and password
  cy.get(`input[name='email']`).type(email);
  cy.get(`input[name='password']`).type(password);
  // Click on the login button
  cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
});

// Define a custom command to access faker
Cypress.Commands.add('getFaker', () => {
  return cy.wrap(faker);
});

// cypress/support/index.ts
// Cypress.Commands.add('dataCy', (value) => {
//     return cy.get(`[data-cy=${value}]`)
// })

// Command to write data to a JSON file after successful registration
Cypress.Commands.add(
  "writeToJson",
  (fileNamePath, data1, data2, data3, data4, data5, data6) => {
    // Add data to json file
    const filename = fileNamePath;
    // cy.log('filename: ', filename)
    // cy.log('fileNamePath: ', fileNamePath)
    cy.readFile(filename).then((data) => {
      data.push({
        randEmail: data1,
        randPassword: data2,
        firstName: data3,
        lastName: data4,
        randPhone: data5,
        randDOB: data6,
      });
      cy.writeFile(filename, data);
    });
  }
);

// Command to generate test data
Cypress.Commands.add("generateTestData", () => {
  //work with commands.js file
  // Define filename for the JSON file
  const filename1 = "cypress/fixtures/data.json";

  // Function to generate a random password
  let generateRandomPassword = () => {
    const uppercaseLetter = /[A-Z]/;
    const number = /[0-9]/;

    let password = "";

    // Generate the first character as an uppercase letter
    //Split the String into an Array of characters before using the arrayElement method
    password += faker.helpers.arrayElement(("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split(''));

    // Generate the rest of the characters
    for (let i = 1; i < 8; i++) {
      const randomChar = faker.string.alphanumeric(1);
      // Ensure that at least one character is a number and one is uppercase
      if (password.match(uppercaseLetter) === null && i < 7) {
        //Split the String into an Array of characters before using the arrayElement method
        password += faker.helpers.arrayElement(("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split(''));
      } else if (password.match(number) === null && i < 7) {
        //Split the String into an Array of characters before using the arrayElement method
        password += faker.helpers.arrayElement(("0123456789").split(''));
      } else {
        password += randomChar;
      }
    }

    return password;
  };
  /* typescript way
  // Define filename for the JSON file
  const filename1 = "cypress/fixtures/data.json";
 
  let generateRandomPassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const otherCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    let password = "";
 
    // Ensure the initial character is an uppercase letter
    password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    
    let hasNumber = false;
 
    // Generate the rest of the password
    for (let i = 1; i < 8; i++) {
        if (!hasNumber && i === 6) {
            // Ensure at least one number is included in the password
            password += numbers.charAt(Math.floor(Math.random() * numbers.length));
            hasNumber = true;
        } else {
            // Add a random character from all possible characters
            password += otherCharacters.charAt(Math.floor(Math.random() * otherCharacters.length));
        }
    }
 
    return password;
    
}
*/

  // Usage
  let randPassword = generateRandomPassword();

  // Function to generate a random first name with only alphabetic characters
  const generateRandomFirstName = () => {
    let firstName = faker.name.firstName();

    // Remove any non-alphabetic characters
    firstName = firstName.replace(/[^a-zA-Z]/g, "");

    return firstName;
  };

  // Usage
  const randFirstName = generateRandomFirstName();
  console.log(randFirstName);

  // Function to generate a random last name with only alphabetic characters
  const generateRandomLastName = () => {
    let lastName = faker.name.lastName();

    // Remove any non-alphabetic characters
    lastName = lastName.replace(/[^a-zA-Z]/g, "");

    return lastName;
  };

  // Usage
  const randLastName = generateRandomLastName();
  console.log(randLastName);

  // Generate random phone number
  let randPhone = faker.phone
    .number("04########")
    .replace(/[^a-zA-Z0-9 ]/g, "");

  // Generate random email address
  let randEmail = randFirstName + randLastName + "@mailnesia.com";

  // Function to format date as DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to generate random birthdate
  const generateRandomBirthdate = () => {
    // Generate a random date of birth within a reasonable range (e.g., 18-80 years old)
    const minDate = new Date(new Date().getFullYear() - 80, 0, 1);
    const maxDate = new Date(new Date().getFullYear() - 18, 11, 31);
    const randomBirthdate = faker.date.between(minDate, maxDate);
    return formatDate(randomBirthdate);
  };

  // Usage
  let randDOB = generateRandomBirthdate();

  // Read data from JSON file and append new data
  cy.readFile(filename1).then((data) => {
    data.push({
      randEmail: randEmail,
      randPassword: randPassword,
      randFirstName: randFirstName,
      randLastName: randLastName,
      randPhone: randPhone,
      randDOB: randDOB,
    });
    // Write data back to JSON file
    cy.writeFile(filename1, data);
  });
});