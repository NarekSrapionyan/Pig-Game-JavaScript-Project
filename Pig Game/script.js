'use strict'

const Player_1 = document.querySelector(".player--0");
const Player_2 = document.querySelector(".player--1");
const Score_1 = document.getElementById('score--0');
const Score_2 = document.getElementById("score--1");
const Current_1 = document.getElementById("current--0");
const Current_2 = document.getElementById("current--1");

const Dice = document.querySelector('.dice');
const New = document.querySelector(".btn--new");
const RollDice = document.querySelector(".btn--roll");
const Hold = document.querySelector(".btn--hold");

let score, currentScore, activePlayer, playing;

const start = function () {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    Score_1.textContent = 0;
    Score_2.textContent = 0;
    Current_1.textContent = 0;
    Current_2.textContent = 0;

    Dice.classList.add('hidden');

    Player_1.classList.add("player--active");
    Player_2.classList.remove("player.active");
};
start();

const switchplayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    Player_1.classList.toggle("player--active");
    Player_2.classList.toggle("player--active");

};

RollDice.addEventListener("click", function () {
    if (playing) {

        const dice = Math.trunc(Math.random() * 6) + 1;

        Dice.classList.remove("hidden");
        Dice.src = `dice-${dice}.png`


        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchplayer();
        }
    }
});


Hold.addEventListener('click', function () {
    if (playing) {

        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            score[activePlayer];


        if (score[activePlayer] >= 50) {

            playing = false;
            Dice.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {

            switchplayer();
        }
    }
});

New.addEventListener('click', start);