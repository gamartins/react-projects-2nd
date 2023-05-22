describe('Cypress', () => {
  beforeEach(() => {
    cy.intercept('GET', 'PacktPublishing/React-Projects-Second-Edition/hotels', { fixture: 'hotels.json' });
    cy.intercept('GET', 'PacktPublishing/React-Projects-Second-Edition/hotels/*', { fixture: 'hotel.json' });
    cy.intercept('GET', 'PacktPublishing/React-Projects-Second-Edition/hotels/*/reviews', []);
  });

  it('open the app and clicks on a hotel', () => {
    cy.visit('http://localhost:3000')

    cy.get('a').first().click();
    cy.location('pathname').should('include', 'hotel');
  });

  it('navidates to the form to add a review', () => {
    cy.visit('http://localhost:3000/hotel/1')
    cy.get('[data-cy=addReview]').contains('+ Add Review').click();

    cy.location('pathname').should('include', 'new');
  })

  it('fills in and submits the form', () => {
    cy.visit('http://localhost:3000/hotel/1/new');

    cy.get('form').within(() => {
      cy.get('input[name=title]').type('Test review');
      cy.get('input[name=description]').type('Is a test review by Cypress');
      cy.get('input[name=rating]').type(4);
      cy.get('button').click();
    });
  })
})
