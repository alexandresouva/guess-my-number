import { GameAlias } from '../common/aliases';
import { TestSelector } from '../common/selectors';

export function captureTextAndSaveAsAlias(
  selector: TestSelector,
  alias: GameAlias
): void {
  cy.get(selector)
    .invoke('text')
    .then((text) => cy.wrap(text.trim()).as(alias));
}
