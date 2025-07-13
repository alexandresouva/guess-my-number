export function generateSecretNumber(): number {
  return Math.floor(Math.random() * 24) + 2;
}

export function stubMathRandom(
  window: Cypress.AUTWindow,
  secretNumber: number
): void {
  const stubValue = (secretNumber - 1) / 25;
  cy.stub(window.Math, 'random').returns(stubValue);
}
