const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (cell.innerText === '' && !checkWinner(board)) {
            cell.innerText = currentPlayer;
            board[index] = currentPlayer;
            if (checkWinner(board)) {
                document.getElementById('feedback').innerText = `Player ${currentPlayer} wins!`;
            } else if (board.every(cell => cell)) {
                document.getElementById('feedback').innerText = 'It\'s a tie!';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

document.getElementById('restart').addEventListener('click', () => {
    board.fill(null);
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    document.getElementById('feedback').innerText = '';
});

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
