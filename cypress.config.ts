//Import required packaged in cypress.config.js
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    /*
    use this config same as official example: sometime work, sometimes not work
    //https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/browserify-ts/cypress.config.ts
    preprocessor(config, {
      */
    // browserify(config, {
    preprocessor(config, {
      typescript: require.resolve("typescript"),
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    /* origin config
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      */
    //enable cucumber
    // testFiles: '**/*.feature',
    // specPattern: 'cypress/e2e/step_definitions/**/*.feature',
    specPattern: "**/*.feature",

    setupNodeEvents,

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
    // baseUrl: "https://duckduckgo.com",
    baseUrl: 'https://dev.mathgpt.ai',

    //https://docs.cypress.io/guides/references/configuration
    //Time, in milliseconds, to consider a test "slow" during cypress run. A slow test will display in orange text in the default reporter.
    //A test that executes for longer than the slowTestThreshold time will be highlighted in yellow with the default spec reporter
    "slowTestThreshold": 5000,

    //https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/pretty-output.md
    reporter: require.resolve("@badeball/cypress-cucumber-preprocessor/pretty-reporter")
  },
  component: {
    "devServer": {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    "slowTestThreshold": 150,
    viewportWidth: 500,
    viewportHeight: 500,
  }
});

/*
//update cypress.config.ts{
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import { defineConfig } from "cypress";

async function setupNodeEvents(
 on: Cypress.PluginEvents,
 config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
 await addCucumberPreprocessorPlugin(on, config);
 on(
   "file:preprocessor",
   preprocessor(config, {
     typescript: require.resolve("typescript"),
   })
 );
 return config;
}
export default defineConfig({
 e2e: {
   //enable cucumber
   specPattern: "**//*.feature",
experimentalStudio: true,
defaultCommandTimeout: 30000,
chromeWebSecurity: false,
pageLoadTimeout: 60000,
viewportWidth: 1920,
viewportHeight: 1080,
baseUrl: 'https://dev.mathgpt.ai'
},
});

*/