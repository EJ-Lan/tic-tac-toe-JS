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

    const printBoard = () => {
        let formattedBoard = '';
        for (let i = 0; i < board.length; i++) {
            formattedBoard += board[i] ? ` ${board[i]} ` : '   ';
            if (i % 3 !== 2) {
                formattedBoard += '|';
            } else if (i !== 8) {
                formattedBoard += '\n---+---+---\n';
            }
        }
        console.log(formattedBoard);
    };

    return { setCell, getCell, reset, printBoard };
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

const GameController = (function() {
    const playerX = Player('Player 1', 'X');
    const playerO = Player('Player 2', 'O');
    let currentPlayer = playerX;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (Gameboard.getCell(a) && Gameboard.getCell(a) === Gameboard.getCell(b) && Gameboard.getCell(a) === Gameboard.getCell(c)) {
                return true; // Current player wins
            }
        }
        return false; // No win found
    };

    const isDraw = () => {
        for (let i = 0; i < 9; i++) {
            if (Gameboard.getCell(i) === '') {
                return false; // Found an empty cell, so no draw
            }
        }
        return true; // No empty cells found, it's a draw
    };

    const makeMove = (index) => {
        if (Gameboard.setCell(index, currentPlayer.symbol)) {
            Gameboard.printBoard(); // Print the board after a move
            if (checkWin()) {
                alert(`${currentPlayer.name} wins!`);
                startNewGame();
                return;
            } else if (isDraw()) {
                alert("It's a draw!");
                startNewGame();
                return;
            }
            switchPlayer();
        }
    };

    const startNewGame = () => {
        Gameboard.reset();
        currentPlayer = playerX;
        console.log("New game started. Player 1's turn (X).");
        Gameboard.printBoard(); // Optionally print the empty board at the start of a game
    };

    return { makeMove, startNewGame };
})();


