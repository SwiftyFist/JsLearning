var gamePlaying;
var scores, roundScore, activeplayer;
var diceDom0 = document.querySelector('.dice'),
    diceDom1 = document.querySelector('.dice1')
var maxScore = document.querySelector('.input-maxScore');

var getScore = function(player) {
    return document.getElementById('score-'+player);
}

var getCurrent = function(player) {
    return document.getElementById('current-'+player);
}

var getName = function(player) {
    return document.getElementById('name-'+player);
}

var getPanel = function(player) {
     return document.querySelector('.player-' + player + '-panel');
}

maxScore.value = 50;

initGame();

function initGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previuosDice = 0;

    gamePlaying = true;

    diceDom0.style.display = 'none';
    diceDom1.style.display = 'none';
    
    getScore(0).textContent = '0';
    getScore(1).textContent = '0';
    getCurrent(0).textContent = '0';
    getCurrent(1).textContent = '0';
    getName(0).textContent = 'Player 1';
    getName(1).textContent = 'Player 2';

    getPanel(0).classList.remove('winner');
    getPanel(1).classList.remove('winner');
    getPanel(0).classList.remove('active');
    getPanel(0).classList.add('active');
    getPanel(1).classList.remove('active');
}

function changePlayer() {
    roundScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;

    getCurrent(0).textContent = '0';
    getCurrent(1).textContent = '0';
    getPanel(0).classList.toggle('active');
    getPanel(1).classList.toggle('active');
    
    diceDom0.style.display = 'none';
    diceDom1.style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var randomNumber = [(Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1)];
        diceDom0.style.display = 'block';
        diceDom0.src = 'dice-' + randomNumber[0] + '.png';
        diceDom1.style.display = 'block';
        diceDom1.src = 'dice-' + randomNumber[1] + '.png';

        if(randomNumber[0] === 6 && randomNumber[1] === 6) {
            scores[activePlayer] = 0;
            getScore(activePlayer).textContent = scores[activePlayer];
            changePlayer();
        }else if (randomNumber[0] !== 1 && randomNumber[1] !== 1) {
            roundScore += randomNumber[0] + randomNumber[1];
            getCurrent(activePlayer).textContent = roundScore;
        } else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        getScore(activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= maxScore.value) {
            getName(activePlayer).textContent = 'WINNER!';
            diceDom0.style.display = 'none';
            diceDom1.style.display = 'none';
            getPanel(activePlayer).classList.add('winner');
            getPanel(activePlayer).classList.remove('active');
            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', initGame);
