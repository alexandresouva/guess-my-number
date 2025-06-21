import { TestSelector } from '../common/selectors';

export function expectElementToHaveText(
  selector: TestSelector,
  expectedText: string
): void {
  cy.get(selector)
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(expectedText);
    });
}
