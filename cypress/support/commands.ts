/* eslint-disable @typescript-eslint/no-namespace */
import { AliasValues } from './common/aliases';

declare global {
  namespace Cypress {
    interface Chainable {
      getByAlias<T>(alias: AliasValues): Chainable<T>;
    }
  }
}

Cypress.Commands.add('getByAlias', <T>(alias: string): Cypress.Chainable<T> => {
  return cy.get<T>(`@${alias}`);
});
