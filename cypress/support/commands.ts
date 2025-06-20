/* eslint-disable @typescript-eslint/no-namespace */
import { GameAlias } from './common/aliases';

declare global {
  namespace Cypress {
    interface Chainable {
      getByAlias<T>(alias: GameAlias): Chainable<T>;
    }
  }
}

Cypress.Commands.add('getByAlias', <T>(alias: string): Cypress.Chainable<T> => {
  return cy.get<T>(`@${alias}`);
});
