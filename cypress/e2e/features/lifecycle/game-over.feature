Feature: Player loses after using all attempts
  As a player, I want to be informed when I lose after all my attempts, so that I can understand the outcome and the correct number.

  Scenario: I exhaust all attempts without a correct guess
    Given I am on the game page for guessing
      And I have used all 5 attempts without guessing correctly
    Then the message "🫤 Game over..." is displayed
      And the timer stops immediately
      And my final score is zero
      And the secret number is revealed
      And I can't make any more guesses

  Scenario: I won after making the correct guess
    Given I am on the game page for guessing
    When I guess the correct number
    Then I can't make any more guesses
