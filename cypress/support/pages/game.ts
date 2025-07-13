import { DEFAULT_GAME_STATE, PAGES } from '../common/constants';
import { SELECTORS } from '../common/selectors';
import {
  generateSecretNumber,
  stubMathRandom
} from '../helpers/game-page.helper';
import { assertElementTextEquals } from '../helpers/assertions.helper';
import { GameState } from '../models/game.model';

export class GamePage {
  readonly #secretNumber = generateSecretNumber();
  #attemptsUsed = 0;

  visit(): void {
    cy.visit(PAGES.GAME, {
      onBeforeLoad: (win) => {
        stubMathRandom(win, this.#secretNumber);
      }
    });
  }

  #submitGuess(guess: number): void {
    cy.get(SELECTORS.GUESS_INPUT).clear().type(String(guess));
    cy.get(SELECTORS.CHECK_BUTTON).click();
  }

  submitCorrectGuess(): void {
    this.#submitGuess(this.#secretNumber);
  }

  submitGuessHigherThanSecret(): void {
    this.#submitGuess(this.#secretNumber + 1);
    this.#attemptsUsed += 1;
  }

  submitGuessLowerThanSecret(): void {
    this.#submitGuess(this.#secretNumber - 1);
    this.#attemptsUsed += 1;
  }

  submitWrongGuesses(guesses: number): void {
    Cypress._.times(guesses, () => {
      const isGreater = Math.random() < 0.5;
      if (isGreater) {
        this.submitGuessHigherThanSecret();
      } else {
        this.submitGuessLowerThanSecret();
      }
    });
  }

  assertRemainingAttempts(
    expectedAttempts: number,
    comparison: 'gte' | 'eq' = 'eq'
  ): void {
    cy.get(SELECTORS.ATTEMPTS)
      .invoke('text')
      .then((text) => {
        const attempts = Number(text.trim());
        expect(attempts).to.be[comparison](expectedAttempts);
      });
  }

  assertGameMessageIsDisplayed(message: string): void {
    assertElementTextEquals(SELECTORS.GAME_MESSAGE, message);
  }

  assertSecretNumberIsRevealed(): void {
    assertElementTextEquals(SELECTORS.SECRET_NUMBER, this.#secretNumber);
  }

  assertTimerIsStopped(): void {
    cy.get(SELECTORS.TIMER)
      .should('be.visible')
      .invoke('text')
      .then((text) => Number(text.trim()))
      .then((timerValue) => {
        cy.wait(1000).then(() => {
          cy.get(SELECTORS.TIMER)
            .invoke('text')
            .then((newText) => {
              const newTimerValue = Number(newText.trim());
              expect(newTimerValue).to.eq(timerValue);
            });
        });
      });
  }

  assertScoreIsDisplayed(score: number, comparison: 'eq' | 'gte' = 'eq'): void {
    cy.get(SELECTORS.SCORE)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const scoreNumber = Number(text.trim());
        expect(scoreNumber).to.be[comparison](score);
      });
  }

  assertHighscoreIsCorrect(): void {
    cy.get(SELECTORS.SCORE)
      .invoke('text')
      .then((finalScoreText) => {
        const finalScore = Number(finalScoreText.trim());
        cy.get(SELECTORS.HIGHSCORE)
          .should('be.visible')
          .invoke('text')
          .then((highscoreText) => {
            const highscore = Number(highscoreText.trim());
            expect(highscore).to.be.gte(finalScore);
          });
      });
  }

  assertAttemptsAreDecreased(): void {
    const initialAttempts = Number(DEFAULT_GAME_STATE.attempts);

    cy.get(SELECTORS.ATTEMPTS)
      .invoke('text')
      .then((text) => {
        const remainingAttempts = Number(text.trim());
        const expectedAttempts = initialAttempts - this.#attemptsUsed;

        expect(remainingAttempts).to.eq(expectedAttempts);
      });
  }

  assertTimerIsRunning(): void {
    cy.get(SELECTORS.TIMER)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const initialTime = Number(text.trim());
        cy.wait(1000).then(() => {
          cy.get(SELECTORS.TIMER)
            .invoke('text')
            .then((newText) => {
              const newTime = Number(newText.trim());
              expect(newTime).to.be.greaterThan(initialTime);
            });
        });
      });
  }

  assertNoMoreGuessesAllowed(): void {
    cy.get(SELECTORS.GUESS_INPUT).should('be.disabled');
    cy.get(SELECTORS.CHECK_BUTTON).should('be.disabled');
  }

  assertGameState({
    highscore,
    secretNumber,
    score,
    timer,
    attempts
  }: GameState): void {
    if (highscore) {
      assertElementTextEquals(SELECTORS.HIGHSCORE, highscore);
    }

    assertElementTextEquals(SELECTORS.SECRET_NUMBER, secretNumber);
    assertElementTextEquals(SELECTORS.SCORE, score);
    assertElementTextEquals(SELECTORS.TIMER, timer);
    assertElementTextEquals(SELECTORS.ATTEMPTS, attempts);

    this.assertGameMessageIsDisplayed('Start guessing...');

    cy.get(SELECTORS.CHECK_BUTTON).should('be.enabled');
    cy.get(SELECTORS.GUESS_INPUT).should('be.enabled').and('have.value', '');
  }

  assertHighscoreWasNotCleaned(): void {
    cy.get(SELECTORS.HIGHSCORE)
      .invoke('text')
      .then((text) => {
        const highscore = Number(text.trim());
        expect(highscore).to.be.gte(10);
      });
  }

  clickOnRestartButton(): void {
    cy.get(SELECTORS.RESTART_BUTTON).click();
  }
}
