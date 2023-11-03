const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameActive = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameBoard[cellIndex] !== "" || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    endGame(false);
  } else if (isBoardFull()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  return gameBoard.every((cell) => cell !== "");
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    winnerMessage.textContent = "It's a draw!";
  } else {
    winnerMessage.textContent = `${currentPlayer} wins!`;
  }
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  winnerMessage.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
