import { GameSelector } from '../common/selectors';

export function assertElementTextEquals(
  selector: GameSelector,
  expectedText: string | number
): void {
  cy.get(selector)
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const stringifiedText =
        typeof expectedText === 'number'
          ? expectedText.toString()
          : expectedText;
      expect(text.trim()).to.equal(stringifiedText);
    });
}
