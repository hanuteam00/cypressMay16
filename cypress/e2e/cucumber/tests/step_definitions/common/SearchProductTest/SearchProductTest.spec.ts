/// <reference types="cypress" />
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

import login from "../../../../pages/Common/LoginPage/LoginPage.spec";
import searchProduct from "../../../../pages/Common/SearchProductPage/SearchProductPage.spec";
 
When("User search the product", () => {
 searchProduct.SearchProduct("VAIO");
});
 
Then("Validate the product after search", () => {
 searchProduct.verifyProduct("Sony VAIO");
});