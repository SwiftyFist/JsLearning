var gamePlaying;
var scores, roundScore, activeplayer;
var diceDom0 = document.querySelector('.dice'),
    diceDom1 = document.querySelector('.dice1')
var maxScore = document.querySelector('.input-maxScore');

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
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function changePlayer() {
    roundScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
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
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            changePlayer();
        }else if (randomNumber[0] !== 1 && randomNumber[1] !== 1) {
            roundScore += randomNumber[0] + randomNumber[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= maxScore.value) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            diceDom0.style.display = 'none';
            diceDom1.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', initGame);
