const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
        statusDisplay.innerText = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusDisplay.innerText = `It's a Tie! 🤝`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = `Player X's Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
