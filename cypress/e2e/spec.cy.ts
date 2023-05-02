/// <reference types="cypress" />

import '@cypress/code-coverage/support';

describe('All links works', () => {
  it('checks About link works', () => {
    cy.visit('/');

    cy.get('a').contains('About').click();

    cy.url().should('include', '/about');
  });
  it('checks NotFound link works', () => {
    cy.visit('/wrongWay');

    cy.contains('NotFound');

    cy.contains('Back').click();

    cy.url().should('include', '/');
  });

  it('checks Add Card link works', () => {
    cy.visit('/');

    cy.get('a').contains('Add card').click();

    cy.url().should('include', '/add');
  });

  it('checks Main link works', () => {
    cy.visit('/add');

    cy.get('a').contains('Main').click();

    cy.url().should('include', '/');
  });

  it('End of block', () => {
    expect(true).to.equal(true);
  });
});

describe('Searching and modal window checks', () => {
  it('search works', () => {
    cy.visit('/');

    cy.get('[placeholder="Search..."]').type('iPhone 9{enter}');

    cy.get('[placeholder="Search..."]').should('have.value', 'iPhone 9');

    cy.contains('iPhone 9').click();
  });

  it('Find some cards works', () => {
    cy.visit('/');

    cy.get('[placeholder="Search..."]').type('Samsung');

    cy.get('button').contains('Search').click();

    cy.wait(1000);

    cy.get('[data-testid="clickedCard"]').should('have.length', 2);
  });

  it('modal window works', () => {
    cy.visit('/');

    cy.contains('iPhone 9').click();

    cy.get('div').contains('Detailed information').should('have.class', '_modal__title_1e88y_38');
  });

  it('modal window carusel works', () => {
    cy.visit('/');

    cy.contains('iPhone 9').click();

    cy.get('button').contains('Next').click();

    cy.get('button').contains('Prev').click();
  });

  it('close modal window button works', () => {
    cy.visit('/');

    cy.contains('iPhone 9').click();

    cy.get('._modal__close-icon_1e88y_45').click();

    cy.wait(200);

    cy.contains('Detailed information').should('not.exist');
  });

  it('End of block', () => {
    expect(true).to.equal(true);
  });
});

describe('Card form checks', () => {
  it('Errors works', () => {
    cy.visit('/add');

    cy.contains('Create').click();

    cy.wait(200);

    cy.contains('Add title').should('exist');
  });

  it('form fills correctly', () => {
    cy.visit('/add');

    cy.get('[data-testid="title"]').type('Some title');

    cy.get('[data-testid="price"]').type('1000');

    cy.get('[data-testid="brand"]').type('Some brand');

    cy.get('[data-testid="area"]').type('Some description');

    cy.get('[data-testid="check"]').click();

    cy.get('[data-testid="date"]').type('2023-04-04');

    cy.get('[type="radio"]').last().check();

    cy.get('[data-testid="category"]').select('laptops');

    cy.get('input[type=file]').selectFile('src/assets/download.png', { force: true });

    cy.contains('Create').click();

    cy.wait(200);

    cy.contains('Card created!');
  });

  it('End of block', () => {
    expect(true).to.equal(true);
  });
});
