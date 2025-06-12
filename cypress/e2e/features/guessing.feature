Feature: Player makes an incorrect guess
  As a player, I want feedback when my guess is incorrect, so that I can adjust my next attempt accordingly.

  Scenario: Player makes a guess that is too high
    Given the player has X attempts remaining (where X > 0)
    And the timer is running
    When the player inputs a guess higher than the secret number
    Then the system shows the message "Too high!"
    And the remaining attempts decrease by 1
    And the timer keeps running

  Scenario: Player makes a guess that is too low
    Given the player has X attempts remaining (where X > 0)
    And the timer is running
    When the player inputs a guess lower than the secret number
    Then the system shows the message "Too low!"
    And the remaining attempts decrease by 1
    And the timer keeps running

Feature: Player makes a correct guess
  As a player, I want to receive clear feedback when I guess correctly, so that I know I’ve won and can see my score.

  Scenario: Player guesses the correct number
    Given the player has made a correct guess
    And the timer stops immediately
    Then the message "🎉 Correct number!" is displayed
    And the secret number is revealed
    And the screen background color changes to green
    And the final score is calculated using the formula:
      remaining_attempts × 15 - elapsed_time_in_seconds
    And if the calculated score is less than 10, then the final score is 10
    And the final score is displayed to the player

Feature: Player loses after using all attempts
  As a player, I want to be informed when I lose after all my attempts, so that I can understand the outcome and the correct number.

  Scenario: Game over after exhausting all attempts without a correct guess
    Given the player has used all 5 attempts without guessing correctly
    Then the message "🫤 Game over..." is displayed
    And the timer stops immediately
    And the final score is zero
    And the secret number is revealed
