/// <reference types="cypress" />

import '@cypress/code-coverage/support';

describe('Links', () => {
  it('checks About link works', () => {
    // Given
    cy.visit('/');

    cy.wait(3000);
    // When
    cy.get('a').contains('About').click();
    // Then
    cy.url().should('include', '/about');
  });
  it('Does not do much', () => {
    expect(true).to.equal(true);
  });
});
