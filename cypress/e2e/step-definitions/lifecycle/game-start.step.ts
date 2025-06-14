import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the game page', () => {
  cy.visit('http://localhost:4200/game');
});

Then('I have 5 attempts available', () => {
  cy.get('[data-testid=attempts-available]')
    .should('be.visible')
    .and('have.text', '5');
});

Then('the message displayed is "Start guessing..."', () => {
  cy.get('[data-testid=game-message]')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('Start guessing...');
    });
});

Then('the game is in its initial state', () => {
  cy.get('[data-testid=secret-number]').should('have.text', '?');
  cy.get('[data-testid=score]').should('have.text', '0');
  cy.get('[data-testid=highscore]').should('have.text', '0');
  cy.get('[data-testid=timer]').should('have.text', '0.00');

  cy.get('body')
    .should('have.css', 'background-color', 'rgb(34, 34, 34)')
    .and('have.css', 'color', 'rgb(238, 238, 238)');
});
