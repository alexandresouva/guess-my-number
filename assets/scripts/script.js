// Checklist para subir no Git hub/Linkedin

/*
    1. Alterar a regra de negócio do game, deixá-lo mais intuitivo
    2. Diminuir número de tentativas
    3. Tornar o projeto responsivo
    4. Refatorar o que for possível, usando o princípio DRY - function updateElementOnScreen
    5. Adicionar Modal com instruções sobre o jogo
    6. Montar README no novo padrão
    7. Atualizar profile do Git Hub
    8. Atualizar profile do Linkedin
*/

'use strict';

let secretNumber = getSecretNumber();

let score = Number(document.querySelector('.score').textContent);
let highscore = Number(document.querySelector('.highscore').textContent);

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

function getSecretNumber() {
    return Math.trunc(Math.random() * 20);
}

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // When there is no value
    if(!guess){
        displayMessage('📛 No Number!');
        
        // When player wins
    } else if (guess === secretNumber) {

        document.querySelector('.number').textContent = secretNumber;
        displayMessage('✔ Correct Number!');  

        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        if(score > highscore){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

        // When guess is wrong
    } else if(guess !== secretNumber){
        if(score > 1){
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 To low!');
            score --;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    } 
});

// Reset the game

document.querySelector('.again').addEventListener('click', function() {

    score = 20;
    secretNumber = getSecretNumber();
    
    document.querySelector('.number').textContent = '?';
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});