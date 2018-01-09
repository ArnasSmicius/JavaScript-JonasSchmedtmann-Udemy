/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, currentScore, activePlayer, gameState, previousRoll;

init();

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    gameState = true;
    document.getElementById("name-" + 0).textContent = "Player 1";
    document.getElementById("name-" + 1).textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
}

function changePlayer() {
    if (gameState) {
        currentScore = 0;
        previousRoll = 0;
        document.getElementById("current-" + activePlayer).textContent = currentScore;
        if(activePlayer === 0) {
            activePlayer = 1
        } else {
            activePlayer = 0
        }
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        document.querySelector(".dice").style.display = "none";
    }
}

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gameState) {
        //Roll a dice
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".dice").src = "dice-" + dice + ".png";
    document.querySelector(".dice").style.display = "block";
        if(previousRoll === 6 && dice === 6){
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer] ;
            changePlayer();
        } else {
            //Add to current score
    if(dice !== 1) {
        currentScore += dice;
        previousRoll = dice;
        document.getElementById("current-" + activePlayer).textContent = currentScore;
    } else {
        //If 1 is rolled, reset current score and activate another player
        changePlayer();
    }   
        }
    }
})

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gameState) {
        //Transfer current score to global score
    scores[activePlayer] += currentScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector(".final-score").value;
        var winningScore;
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
    //Checking whether player won the game
    if(scores[activePlayer] >= winningScore){
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.getElementById("name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gameState = false;
    }
    //Change player
    changePlayer();
    }
})