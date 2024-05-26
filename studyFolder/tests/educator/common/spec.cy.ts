describe('template spec', () => {
  it('passes', () => {
    cy.visit('/login?role=educator');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#navbar > :nth-child(1) > :nth-child(2) > a').click();
    cy.get(':nth-child(1) > :nth-child(3) > a').click();
    cy.get('.pull-right > li > a').click();
    /* ==== End Cypress Studio ==== */
  })


})