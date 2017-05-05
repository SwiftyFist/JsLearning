var gamePlaying;
var scores, roundScore, activeplayer;
var playersNumber = 2,
    diceNumber = 2;
var maxScore = document.querySelector('.input-maxScore');

var getDice = function (dNumber) {
    return document.querySelector('.dice' + dNumber);
};

var getScore = function (player) {
    return document.getElementById('score-' + player);
};

var getCurrent = function (player) {
    return document.getElementById('current-' + player);
};

var getName = function (player) {
    return document.getElementById('name-' + player);
};

var getPanel = function (player) {
    return document.querySelector('.player-' + player + '-panel');
};

maxScore.value = 50;

initGame();

function initGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    for (var i = 0; i < playersNumber; i++) {
        getDice(i).style.display = 'none'; //spostare nel caso diceNumber != playersNumber
        getScore(i).textContent = '0';
        getCurrent(i).textContent = '0';
        getName(i).textContent = 'Player ' + i + 1;
        getPanel(i).classList.remove('winner');
        getPanel(i).classList.remove('active');
    }
    getPanel(0).classList.add('active');
}

function changePlayer() {
    roundScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    for (var i = 0; i < 2; i++) {
        getCurrent(i).textContent = '0';
        getPanel(i).classList.toggle('active');
        getDice(i).style.display = 'none';
    }
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var randomNumber = [(Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1)];
        for (var i = 0; i < diceNumber; i++) {
            getDice(i).style.display = 'block';
            getDice(i).src = 'dice-' + randomNumber[i] + '.png';
        }
        if (randomNumber[0] === 6 && randomNumber[1] === 6 && roundScore !== 0) {
            scores[activePlayer] = 0;
            getScore(activePlayer).textContent = scores[activePlayer];
            changePlayer();
        } else if ((randomNumber[0] !== 1 && randomNumber[1] !== 1) || roundScore === 0) {
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
            for (var i = 0; i < diceNumber; i++) {
                getDice(i).style.display = 'none';
            }
            getPanel(activePlayer).classList.add('winner');
            getPanel(activePlayer).classList.remove('active');
            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', initGame);
