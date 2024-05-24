import { defineConfig } from "cypress";
// import { slowCypressDown } from 'cypress-slow-down'

export default defineConfig({
 e2e: {
  env: {
    // https://github.com/bahmutov/cypress-slow-down
    // https://github.com/bahmutov/cypress-slow-down/blob/main/cypress.config.js
    // commandDelay: 5000,
  },
   setupNodeEvents(on, config) {
     // implement node event listeners here
     // and load any plugins that require the Node environment
     console.log('Env', config.env)
   },
   //enable "record and playback" feature
   experimentalStudio: true,

   /*4000 by default, time, in milliseconds,
  to wait until most DOM based commands are considered timed out.*/
   defaultCommandTimeout: 30000,

   /*Whether to enable Chromium-based browser's Web Security
  for same-origin policy and insecure mixed content*/
   chromeWebSecurity: false,

   /*60000 by default time, in milliseconds,
  to wait for page transition events or cy.visit(), cy.go(), cy.reload()
  commands to fire their page load events.
  */
   pageLoadTimeout: 60000,

   //set viewport
   viewportWidth: 1920,
   viewportHeight: 1080,

   //set baseUrl
   baseUrl: 'https://dev.mathgpt.ai'
 },
});

