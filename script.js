'use strict';

//ELEMENTS
const dice = document.querySelector('.dice');
//Player One
const playerOne = document.querySelector('.player--0');
const playerOneOverall = document.querySelector('#score--0');
const playerOneScore = document.querySelector('#current--0');
//Player Two
const playerTwo = document.querySelector('.player--1');
const playerTwoOverall = document.querySelector('#score--1');
const playerTwoScore = document.querySelector('#current--1');
//Buttons
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

let gameOn;

//FUNCTIONS
function setGame() {
  gameOn = true;

  playerOneOverall.textContent = 0;
  playerOneScore.textContent = 0;

  playerTwoOverall.textContent = 0;
  playerTwoScore.textContent = 0;

  dice.classList.add('hidden');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
}
setGame();

function switchPlayer() {
  if (playerOne.classList.contains('player--active')) {
    playerOne.classList.remove('player--active');
    playerTwo.classList.add('player--active');
  } else {
    playerTwo.classList.remove('player--active');
    playerOne.classList.add('player--active');
  }
}

function getPlayer() {
  const currentPlayer = document.querySelector('.player--active');
  return currentPlayer;
}

function rollDice() {
  if (gameOn) {
    dice.classList.remove('hidden');

    let currentPlayer = getPlayer();
    let currentScore = currentPlayer.querySelector('.current-score');
    let random = Math.trunc(Math.random() * (6 - 1 + 1) + 1);

    dice.setAttribute('src', './imgs/dice-' + random + '.png');

    if (random !== 1) {
      let score = Number(currentScore.textContent) + random;
      currentScore.textContent = score;
    } else {
      currentScore.textContent = 0;
      holdHand();
    }
  }
}

function holdHand() {
  if (gameOn) {
    let currentPlayer = getPlayer();
    let currentScore = currentPlayer.querySelector('.current-score');
    let overall = currentPlayer.querySelector('.score');

    if (currentScore.textContent !== 0) {
      let score =
        Number(currentScore.textContent) + Number(overall.textContent);
      overall.textContent = score;
      if (overall.textContent >= 100) {
        currentPlayer.classList.add('player--winner');
        gameOn = false;
      }
      currentScore.textContent = 0;
    }
    switchPlayer();
  }
}

roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdHand);
newGame.addEventListener('click', setGame);
