// Select elements
const buttons = document.querySelectorAll(".action");
const playerScoreEl = document.querySelector(".player-score h1");
const computerScoreEl = document.querySelector(".computer-score h1");
const rulesPopup = document.querySelector(".rules");
const closeButton = document.querySelector(".rules button");
const playArea = document.querySelector(".play");
const rulesButton = document.querySelector(".rules-button");
const nextButton = document.querySelector(".next");
const winScreen = document.querySelector(".win-screen");
const titleScore = document.querySelector(".title-score");

let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
updateScores();

const choices = ["rock", "paper", "scissors"];

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const userChoice = e.target.dataset.choice; 
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = getWinner(userChoice, computerChoice);

    updateGame(result, userChoice, computerChoice);
  });
});


function getChoiceFromImage(src) {
  if (src.includes("rock")) return "rock";
  if (src.includes("paper")) return "paper";
  if (src.includes("scissors")) return "scissors";
}

function getWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function updateGame(winner, userChoice, computerChoice) {
  if (winner === "player") {
    playerScore++;
    nextButton.style.display = "inline-block";
  } else if (winner === "computer") {
    computerScore++;
  }

  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
  updateScores();

  showResultScreen(userChoice, computerChoice, winner);
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function showResultScreen(userChoice, computerChoice, winner) {
  playArea.innerHTML = "";

  const userClass =
    winner === "player" ? `${userChoice} winner-effect` : userChoice;
  const computerClass =
    winner === "computer" ? `${computerChoice} winner-effect` : computerChoice;

  const userDiv = document.createElement("div");
  userDiv.innerHTML = `
    <p style="text-align: center;margin:30px 0px; color:white;font-weight:600;">YOU PICKED</p>
    <div class="${userClass}" style="display: flex; justify-content: center; align-items: center;height:140px;width:140px;">
      <img src='./Images/${userChoice}.png' class='action' />
    </div>
  `;

  const computerDiv = document.createElement("div");
  computerDiv.innerHTML = `
    <p style="text-align: center; margin:30px 0px;color:white;font-weight:600;">PC PICKED</p>
    <div class="${computerClass}" style="display: flex; justify-content: center; align-items: center;height:140px;width:140px;">
      <img src='./Images/${computerChoice}.png' class='action' />
    </div>
  `;

  const resultDiv = document.createElement("div");
  resultDiv.innerHTML = `
    <p style="text-align: center; color:white; font-size:39px; font-weight:800;margin:0px 70px;margin-top:70px;">${
      winner === "draw"
        ? "TIE UP"
        : winner === "player"
        ? "YOU WIN"
        : "YOU LOST "
    }</p>
  <p style="text-align: center; color:white;font-weight:800;font-size:25px;">AGAINST PC</p>
    <div style="text-align: center; margin-top: 20px;">
      <button id='play-again' style="padding: 10px 20px;width:174px;height:44px; font-size: 15px;font-weight:600; background: white; color: #6b6b6b;  border-radius: 9px; cursor: pointer;">${
        winner === "draw" ? "REPLAY" : "PLAY AGAIN"
      }</button>
    </div>
  `;

  userDiv.style.textAlign = "center";
  computerDiv.style.textAlign = "center";
  resultDiv.style.textAlign = "center";
  resultDiv.style.marginTop = "40px";

  const resultWrapper = document.createElement("div");
  resultWrapper.style.display = "flex";
  resultWrapper.style.justifyContent = "center";
  resultWrapper.style.alignItems = "center";
  resultWrapper.style.gap = "40px";
  resultWrapper.appendChild(userDiv);
  resultWrapper.appendChild(resultDiv);
  resultWrapper.appendChild(computerDiv);

  playArea.appendChild(resultWrapper);

  document.getElementById("play-again").addEventListener("click", () => {
    location.reload();
  });
}

rulesButton.addEventListener("click", () => {
  rulesPopup.style.display = "block";
  rulesButton.style.display = "none";
});

closeButton.addEventListener("click", () => {
  rulesPopup.style.display = "none";
  rulesButton.style.display = "block";
});

nextButton.addEventListener("click", () => {
  winScreen.style.display = "block";
  playArea.style.display = "none";
  titleScore.style.display = "none";
  nextButton.style.display = "none";


 
  document.querySelector(".playAgain").addEventListener("click", () => {
    location.reload();
  });
});
