Feature: Game ends after a win or loss
  As a player,
  I want to be informed when the game ends, whether by guessing correctly or by using all my attempts,
  so that I can understand the outcome and the correct number.

  Scenario: I exhaust all attempts without a correct guess
    Given I am on the game page
      And I have made all 5 incorrect guesses
    Then the game is over
      And the message "🫤 Game over!" is displayed
      And my final score is 0

  Scenario: I won after making the correct guess
    Given I am on the game page
    When I guess the correct number
    Then the game is over
      And my final score is at least 10
      And And the highscore reflects the highest score so far
