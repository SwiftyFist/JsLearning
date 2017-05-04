/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0, 0],
    roundScore = 0;
var activePlayer = 1; //0 = firstPlayer, 1 = secondPlayer

/*
var dice = Math.floor(Math.random() * 6) + 1;

document.querySelector('.player-current-score#current-' + activePlayer).textContent = dice;

//document.querySelector('.player-current-score#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

var x = document.querySelector('#score-0').textContent;
console.log(x);
*/

var diceDom = document.querySelector('.dice');

diceDom.style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function (){
    var randomNumber = Math.floor(Math.random() * 6) + 1;   
    var currentScore = document.querySelector('#current-' + activePlayer);
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + randomNumber + '.png';
    
    if (randomNumber !== 1) {
        roundScore += randomNumber;
        currentScore.textContent = roundScore;
    } else {
        
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        currentScore.textContent = 0;
        roundScore = 0;
        
        activePlayer = activePlayer === 1 ? 0 : 1;
        
        document.querySelector('.panel-0-panel').classList.toggle('active');
        document.querySelector('.panel-1-panel').classList.toggle('active');  
        
        diceDom.style.display = 'none';
    }
});


























