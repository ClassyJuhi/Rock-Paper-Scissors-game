"use strict";

let left = document.getElementById("left");
let right = document.getElementById("right");

let currentResult = document.getElementById("result");
let userPoints = document.getElementById("userPoints");
let computerPoints = document.getElementById("computerPoints");
let finalWinner = document.getElementById("finalWinner");

let celebrate = document.getElementById("celebrate");
let celebrateSound = document.getElementById("celebrateSound");
let failSound = document.getElementById("failSound");
let tieSound = document.getElementById("tieSound");
let reset = document.getElementById("reset");

let actionButtons = document.getElementById("actionButtons")


let gameTriggers = document.getElementsByClassName("game-trigger");

for (let gameTrigger of gameTriggers) {
    gameTrigger.addEventListener('click', (event) => {
        // User has started a new inning
        // 1. Start the animation for 2 sec and generate computer move - Done
        // 2. Get the input of user - Done
        // 3. Update the UI to show the move by both user
        // 4. Declare the winner

        // animation start
        startAnimation();
        let computerMove = generateComputerMove();
        let userMove = event.target.id;
        // setTimeout method executes the given function only after the given time interval.
        setTimeout(() => {
            // stop the animation
            stopAnimation();

            // update the UI
            // Update the UI for user move
            updateUI(left, userMove);
            // Update the UI for computer move
            updateUI(right, computerMove);

            // Declare winner
            declareWinner(computerMove, userMove);
        }, 2000);
    })
}

let startAnimation = () => {
    celebrate.style.display = 'none';
    left.src = "assets/rock.png";
    right.src = "assets/rock.png";
    celebrateSound.pause();
    failSound.pause();
    tieSound.pause();
    left.style.animationPlayState = 'running';
    right.style.animationPlayState = 'running';

}

let stopAnimation = () => {
    left.style.animationPlayState = 'paused';
    right.style.animationPlayState = 'paused';
}

let generateComputerMove = () => {
    let computerMove = Math.floor(Math.random() * 3)
    if (computerMove === 0) {
        computerMove = 'rock';
    }
    else if (computerMove === 1) {
        computerMove = 'scissors';
    }
    else {
        computerMove = 'paper';
    }
    return computerMove;
}

let updateUI = (targetElement, move) => {
    if (move === 'rock') {
        targetElement.src = "assets/rock.png"
    }
    else if (move === 'scissors') {
        targetElement.src = "assets/scissors.png"
    }
    else {
        targetElement.src = "assets/paper.png"
    }
}
    let userScore = 0;
    let computerScore = 0;

let declareWinner = (computerMove, userMove) => {
    let result;
    if (userMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You win';
        }
        else {
            result = 'You lose';
        }
    }
    if (userMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose';
        }
        else if (computerMove === 'scissors') {
            result = 'Tie';
        }
        else {
            result = 'You win';
        }
    }
    if (userMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        }
        else if (computerMove === 'scissors') {
            result = 'You lose';
        }
        else {
            result = 'Tie';
        }
    }
    currentResult.innerHTML = result;
    
    if(result === 'You win'){
        userScore += 10;
        userPoints.innerText = userScore;
        celebrate.style.display = 'block';
        celebrateSound.play();
    }
    else if(result === 'You lose'){
        computerScore += 10;
        computerPoints.innerText = computerScore;
        failSound.play();
    }
    else{
        tieSound.play();
    }

    if(userScore > computerScore){
        finalWinner.innerText = 'You'
    }
    else if(computerScore > userScore){
        finalWinner.innerText = 'Computer'
    }
    else{
        finalWinner.innerText = 'Match is Tie'
    }
}
let resetGame = () => {
    location.reload();
}
reset.addEventListener('click', resetGame);

