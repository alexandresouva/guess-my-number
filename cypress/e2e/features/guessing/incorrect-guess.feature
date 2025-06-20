Feature: Player makes an incorrect guess
  As a player, I want feedback when my guess is incorrect, so that I can adjust my next attempt accordingly.

  Scenario: I make a guess that is too high
    Given I am on the game page for guessing
      And I have at least 2 attempts remaining
    When I input a guess higher than the secret number
    Then the message "📈 Too high!" is displayed
      And my remaining attempts decrease by 1
      And the timer keeps running

  Scenario: I make a guess that is too low
    Given I am on the game page for guessing
      And I have at least 2 attempts remaining
    When I input a guess lower than the secret number
    Then the message "📉 Too low!" is displayed
      And my remaining attempts decrease by 1
      And the timer keeps running

