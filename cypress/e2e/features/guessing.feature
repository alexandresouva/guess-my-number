Feature: Guessing the secret number
  As a player,
  I want to be notified whether my guess is correct or not,
  So that I can understand the game outcome and act accordingly.

  # Use tags to run specific tests, e.g. @wip (in progress), @smoke (core flow)
  # Run with: npm start && npx cypress run --env TAGS='@smoke'

  @smoke
  Scenario: I guess the correct number
    Given I am on the game page
      And I have at least 1 attempt remaining
    When I guess the correct number
    Then the message "🎉 Correct number!" is displayed
      And the secret number is revealed

  @smoke
  Scenario Outline: I make an incorrect guess
    Given I am on the game page
      And I have at least 2 attempts remaining
    When I submit a guess <comparison> than the secret number
    Then the message "<message>" is displayed
      And my remaining attempts are decreased by attempts that were used
      And the timer keeps running

  Examples:
    | comparison | message       |
    | higher     | 📈 Too high!  |
    | lower      | 📉 Too low!   |

  # -------------------------
  # The detailed scenario below is only for BDD purposes and can be more effective for communication with stakeholders.
  # However, in terms of automation, the scenario outline is a preferable approach because it reduces code duplication.

  # @smoke
  # Scenario: I make a guess that is too high
  #   Given I am on the game page
  #     And I have at least 2 attempts remaining
  #   When I submit a guess higher than the secret number
  #   Then the message "📈 Too high!" is displayed
  #     And my remaining attempts are decreased by attempts that were used
  #     And the timer keeps running

  # @smoke
  # Scenario: I make a guess that is too low
  #   Given I am on the game page
  #     And I have at least 2 attempts remaining
  #   When I submit a guess lower than the secret number
  #   Then the message "📉 Too low!" is displayed
  #     And my remaining attempts are decreased by attempts that were used
  #     And the timer keeps running
