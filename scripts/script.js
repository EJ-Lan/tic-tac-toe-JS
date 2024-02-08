const Gameboard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];

    const setCell = (index, symbol) => {
        if (index >= 0 && index < board.length && board[index] === '') {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    const getCell = (index) => {
        return board[index];
    };

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const getBoard = () => {
        return board;
    };

    return { setCell, getCell, reset, getBoard };
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

const GameController = (function() {
    let playerX = Player('Player 1', 'X');
    let playerO = Player('Player 2', 'O');
    let currentPlayer = playerX;

    const setPlayers = (player1, player2) => {
        playerX = player1;
        playerO = player2;
        currentPlayer = playerX;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (Gameboard.getCell(a) && Gameboard.getCell(a) === Gameboard.getCell(b) && Gameboard.getCell(a) === Gameboard.getCell(c)) {
                return currentPlayer.name; // Return the name of the winner
            }
        }
        return null; // No winner yet
    };

    const isDraw = () => {
        return Gameboard.getBoard().every(cell => cell !== '');
    };

    const makeMove = (index) => {
        if (Gameboard.setCell(index, currentPlayer.symbol)) {
            if (checkWin()) {
                return { gameOver: true, winner: currentPlayer.name };
            } else if (isDraw()) {
                return { gameOver: true, draw: true };
            }
            switchPlayer();
            return { gameOver: false };
        }
        return null; // Move was not made
    };

    const startNewGame = () => {
        Gameboard.reset();
        currentPlayer = playerX;
    };

    return { makeMove, startNewGame, setPlayers };
})();

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('startGame');
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const gameStatusDiv = document.getElementById('gameStatus');

    const renderBoard = () => {
        const boardDiv = document.getElementById('board');
        boardDiv.innerHTML = ''; // Clear the board
        Gameboard.getBoard().forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => makeMove(index));
            boardDiv.appendChild(cellDiv);
        });
    };

    const makeMove = (index) => {
        const moveResult = GameController.makeMove(index);
        if (moveResult) {
            renderBoard();
            if (moveResult.gameOver) {
                if (moveResult.winner) {
                    gameStatusDiv.textContent = `${moveResult.winner} wins!`;
                } else if (moveResult.draw) {
                    gameStatusDiv.textContent = "It's a draw!";
                }
                GameController.startNewGame();
                renderBoard(); // Refresh the board for a new game
            }
        }
    };

    startGameButton.addEventListener('click', () => {
        const player1 = Player(player1NameInput.value || 'Player 1', 'X');
        const player2 = Player(player2NameInput.value || 'Player 2', 'O');
        GameController.setPlayers(player1, player2);
        GameController.startNewGame();
        renderBoard();
        gameStatusDiv.textContent = '';
    });

    renderBoard(); // Initialize the board on page load
});



