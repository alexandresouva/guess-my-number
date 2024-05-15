'use strict';

let secretNumber = generateSecretNumber();
let score = 20;

const bodyEl = document.querySelector('body');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const checkBtnEl = document.querySelector('.check');
const againBtnEl = document.querySelector('.again');

scoreEl.textContent = score;
console.log(secretNumber);
checkBtnEl.addEventListener('click', checkNumber);
againBtnEl.addEventListener('click', resetGame);

function checkNumber() {
  const guess = Number(guessEl.value);
  if (!guess) {
    messageEl.textContent = '🤡 Choice a number.';
  } else if (guess === secretNumber) {
    updateDOMOnCorrectGuess();
  } else if (guess > secretNumber) {
    if (score > 1) {
      messageEl.textContent = '📈 Too high!';
      decreaseScore();
    } else {
      printGameOverMessage();
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      messageEl.textContent = '📉 Too low!';
      decreaseScore();
    } else {
      printGameOverMessage();
    }
  }
}

function generateSecretNumber() {
  return Math.trunc(Math.random() * 20 + 1);
}

function decreaseScore() {
  score--;
  scoreEl.textContent = score;
}

function printGameOverMessage() {
  messageEl.textContent = '🫤 Game over...';
  scoreEl.textContent = 0;
}

function updateDOMOnCorrectGuess() {
  messageEl.textContent = '🎉 Correct number!';
  numberEl.textContent = secretNumber;
  bodyEl.style.backgroundColor = '#60b347';
  numberEl.style.width = '30rem';
}

function resetGame() {
  score = 20;
  secretNumber = generateSecretNumber();
  console.log(secretNumber);
  messageEl.textContent = 'Start guessing...';
  scoreEl.textContent = score;
  guessEl.value = '';
  numberEl.textContent = '?';

  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
}
