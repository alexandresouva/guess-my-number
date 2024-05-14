'use strict';

const secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;

const checkBtnEl = document.querySelector('.check');
const scoreEl = document.querySelector('.score');
const messageEl = document.querySelector('.message');

scoreEl.textContent = score;
document.querySelector('.number').textContent = secretNumber;
checkBtnEl.addEventListener('click', checkNumber);

function checkNumber() {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    messageEl.textContent = '🤡 Choice a number.';
  } else if (guess === secretNumber) {
    messageEl.textContent = '🎉 Correct number!';
  } else if (guess > secretNumber) {
    if (score > 1) {
      messageEl.textContent = '📈 Too high!';
      decreaseScore();
    } else {
      printGameOver();
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      messageEl.textContent = '📉 Too low!';
      decreaseScore();
    } else {
      printGameOver();
    }
  }
}

function decreaseScore() {
  score--;
  scoreEl.textContent = score;
}

function printGameOver() {
  messageEl.textContent = '🫤 Game over...';
  scoreEl.textContent = 0;
}
