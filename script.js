'use strict'

// Selecting elements
const score0El = document.querySelector('#score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const winWindow = document.querySelector('.window');
const overlay = document.querySelector('.overlay');
const winScore = 100;
//initializin conditions
let currentScore, scores, activePlayer, playing;

const init = function(){

    currentScore = 0;
    scores = [0,0];
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');
}

// functions

const switchPlayer = function(){
        currentScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player-active');
        player1El.classList.toggle('player-active');
}
const openWindow = function(){
    overlay.classList.remove('hidden');
    winWindow.classList.remove('hidden');
}
const closeWindow = function(){
    overlay.classList.add('hidden');
    winWindow.classList.add('hidden');
}

//
init();
btnRoll.addEventListener('click', function(){
    if(playing){
        // rolling a dice
        let diceVal = Math.trunc(Math.random() * 6) +1;
        // display dice
        diceEl.src = `images/dice-${diceVal}.png`;
        diceEl.classList.remove('hidden');
        // add to current score if != 1
        if(diceVal != 1){
            currentScore += diceVal;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }else{
            // switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        
        // check for winning
        if(scores[activePlayer] >= winScore){
            playing = false;
            openWindow();
            document.getElementById('winplayer').textContent =  activePlayer + 1;
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            diceEl.classList.add('hidden');

        }else{ 
            //switch player
            switchPlayer();
        }
    }
});

overlay.addEventListener('click',function(){
    closeWindow();
});

btnNew.addEventListener('click', function(){
    document.querySelector(`.player-${activePlayer}`).classList.remove('player-winner');
    init();
});