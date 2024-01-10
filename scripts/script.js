const Gameboard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];

    const setCell = (index, symbol) => {
        if (index >= 0 && index < board.length & board[index] === '') {
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

    return { setCell, getCell, reset };
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

const GameConroller = (function() {
    const playerX = Player('Player 1', 'X');
    const playerO = Player('Player 2', 'O');
    let currentPlayer = playerX;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
})