/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, winningScore;
let firstDice = 0;
let diceDOM = document.querySelectorAll('.dice');

// dice = Math.floor(Math.random() * 6 + 1);

// document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';

// let x = document.querySelector('#score-0').textContent;
// let y = document.querySelector('#score-0').innerHTML;
// let z = document.querySelector('#score-0').innerText;
// console.log(x + '-' + y + '-' + z);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  winningScore = document.querySelector('.inp-score').value;
  // console.log(document.querySelector('.inp-score').value);
  // console.log(winningScore);
  displayNone();
  document.querySelector('#score-0').innerHTML = 0;
  document.querySelector('#score-1').innerHTML = 0;
  document.querySelector('#current-0').innerHTML = 0;
  document.querySelector('#current-1').innerHTML = 0;
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('#name-0').innerHTML = 'Player 1';
  document.querySelector('#name-1').innerHTML = 'Player 2';
}
function nextplayer() {
  document.querySelector('#current-' + activePlayer).innerHTML = 0;
  if (activePlayer === 1) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}
function displayNone() {
  diceDOM[0].style.display = 'none';
  diceDOM[1].style.display = 'none';
}

init();

// console.log(diceDOM);

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    let dice = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    diceDOM[0].style.display = 'block';
    diceDOM[0].src = 'dice-' + dice + '.png';
    diceDOM[1].style.display = 'block';
    diceDOM[1].src = 'dice-' + dice2 + '.png';
    document.querySelector('#current-' + activePlayer).innerHTML = dice+dice2;

    if (dice !== 1 && dice2 !== 1) {
      // scores[activePlayer] += dice;
      if (!(dice === 6 && firstDice === 6)) {
        roundScore += dice+dice2;
        document.querySelector('#current-' + activePlayer).innerText = roundScore;

      } else {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
        // displayNone();
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).innerText = roundScore;
        nextplayer();
      }

    } else {
      roundScore = 0;
      // displayNone();
      nextplayer()
    }
    firstDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    scores[activePlayer] += roundScore;
    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      displayNone();
      document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    } else {
      roundScore = 0;
      displayNone()
      document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
      nextplayer()
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);
