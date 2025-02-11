const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#high-score');
const stopButton = document.querySelector('#stop-button');
const continueButton = document.querySelector('#continue-button');
const resetButton = document.querySelector('#reset-btn');

let result = 0;
let hitPosition;
let currentTime = 45;
let timerId = null;
let countDownTimerId = null;
let lastPosition = null; // Track the last position of the mole
let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from local storage

highScoreDisplay.textContent = highScore; // Display the high score

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare;
  do {
    randomSquare = squares[Math.floor(Math.random() * 9)];
  } while (randomSquare.id === lastPosition); // Ensure the new position is different from the last

  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
  lastPosition = randomSquare.id; // Update the last position
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 740);
}

moveMole();

function countDown() {
 currentTime--;
 timeLeft.textContent = currentTime;

 if (currentTime == 0) {
   clearInterval(countDownTimerId);
   clearInterval(timerId);
   if(result > highScore) {
        highScore = result;
        localStorage.setItem('highScore', highScore); // Save new high score to local storage
        highScoreDisplay.textContent = highScore; // Update high score display
   }
   if(result >= 15){
        alert('Game Over! Your final score is: ' + result + ' You did a great job!');
   } else if(result < 15){
        alert('Game Over! Your final score is: ' + result + ' Better luck next time!');
   }
   window.location.reload();
 }
}

countDownTimerId = setInterval(countDown, 1000);

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  clearInterval(countDownTimerId);
  stopButton.style.display = 'none';
  continueButton.style.display = 'inline';
});

continueButton.addEventListener('click', () => {
  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
  continueButton.style.display = 'none';
  stopButton.style.display = 'inline';
});

// Reset game function
function reset() {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    resetButton.classList.add('clicked'); // Add a class to trigger the animation

    setTimeout(() => {
        if(result > highScore) {
            highScore = result;
            localStorage.setItem('highScore', highScore); // Save new high score to local storage
            highScoreDisplay.textContent = highScore; // Update high score display
        }
        if(result >= 15){
            alert('Game Resetted! Your final score is: ' + result + ' You did a great job!');
        } else if(result < 15){
            alert('Game Resetted! Your final score is: ' + result + ' Better luck next time!');
        }
        window.location.reload();
    }, 300); // Wait for the animation to complete (adjust the time if needed)
}
