import { After } from '@badeball/cypress-cucumber-preprocessor';

After(function (scenario) {
  const safeName = scenario.pickle.name.replace(/[/\\?%*:|"<>]/g, '-');
  const screenshotName = `${Cypress.spec.name} -- ${safeName}`;

  cy.screenshot(screenshotName, { capture: 'runner' });
});
