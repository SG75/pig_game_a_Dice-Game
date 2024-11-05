//use strict mode

'use strict';

//selecting elements

const score0El = document.querySelector('#score--0'); //need to include #
const score1El = document.getElementById('score--1'); //no need to include # and a bit faster than above
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnInfo = document.querySelector('.btn--info');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

//reset the scores to starting conditions

score0El.textContent = 0;
score1El.textContent = 0;

let scores = [0, 0];

let diceValue;
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//init the scores for a new Game

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.innerHTML = 0;
  score1El.innerHTML = 0;
  current0El.innerHTML = 0;
  current1El.innerHTML = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector('#throw').disabled = false;
  setDice();
};

init();

//this functionality is removed
// //toggle the dice setting menu
// document.querySelector('.btn--set-dice').addEventListener('click', function () {
//   document.querySelector('.controller').classList.toggle('hidden');
// });

//roll the dice

document.querySelector('#throw').addEventListener('click', function () {
  if (playing) {
    diceValue = window.diceValue;
    // diceValue = Number(document.getElementById('diceVal').innerText); // extracts the value from #diceVal
    console.log(typeof diceValue, diceValue); // logs the dice value to the console?
    // console.log('Current dice value:', diceValue);
    if (diceValue !== 1) {
      currentScore += diceValue;
      // add the dice value to current score
      setTimeout(() => {
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      }, 700);
      // current0El.textContent = currentScore; // change later to use activePlayer

      // console.log('Current score:', currentScore);
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//hold button click
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active playes's score
    //if socre is => 100 finish the game
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector('#throw').disabled = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

// new game button click
btnNew.addEventListener('click', init);

btnInfo.addEventListener('click', openModal);
