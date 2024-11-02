const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
let board;
let currentPlayer;
let gameOver;

function startGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  messageElement.innerText = `Player ${currentPlayer}'s turn`;
  boardElement.innerHTML = '';

  // Create 9 cells for a 3x3 grid
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.addEventListener('click', () => makeMove(index));
    boardElement.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (board[index] === '' && !gameOver) {
    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (!gameOver) messageElement.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function updateBoard() {
  boardElement.childNodes.forEach((cell, index) => {
    cell.innerText = board[index];
  });
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      messageElement.innerText = `Player ${currentPlayer} wins!`;
    }
  });

  if (!gameOver && board.every(cell => cell)) {
    gameOver = true;
    messageElement.innerText = "It's a draw!";
  }
}

startGame();
