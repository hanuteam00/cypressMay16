#BA, PM, Manual QA, QC will use this file to write manual test cases

Feature: Login App

    Background:
        Given This will run before each scenario
    Scenario: TC1: Login successfully with valid credentials
        When I visit the login page
        When I enter valid username and password
        When I click on login button
        Then I'm logged in successfully

    Scenario: TC2: Login unsuccessfully with invalid credentials
        When I visit the login page
        Then I enter invalid username or password, I should see error message