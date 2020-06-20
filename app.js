const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
const start = document.querySelector("#start");
let score = document.querySelector("#score");
let audioBtn = document.querySelector("#music");
let isPlaying = false;

let result = 0;
let currentTime = timeLeft.textContent;

// Setup for audio and looping
audioBtn.addEventListener("click", function () {
  const audio = new Audio("music.wav");
  audio.loop = true;

  audio.onplaying = function () {
    isPlaying = true;
  };

  function togglePLay() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }
  togglePLay();
});

start.addEventListener("click", startGame);

function startGame() {
  location.reload();
}

function randomSquare() {
  square.forEach((className) => {
    className.classList.remove("mole");
  });
  let randomPosition = square[Math.floor(Math.random() * 9)];
  randomPosition.classList.add("mole");

  // assign the id of the randomPosition to hitPosition for us to use later
  hitPosition = randomPosition.id;
}

square.forEach((id) => {
  id.addEventListener("mouseup", () => {
    if (id.id === hitPosition) {
      result = result + 1;
      score.textContent = result;
    }
  });
});

function moveMole() {
  let timerId = null;
  timerId = setInterval(randomSquare, 1000);
}

const userName = window.prompt("Enter Player Name:");

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    alert(`GAME OVER! ${userName} your score is: ` + result);
    document.querySelector("#score").innerHTML = "";
    location.reload();
  }
}

let timerId = setInterval(countDown, 1000);
