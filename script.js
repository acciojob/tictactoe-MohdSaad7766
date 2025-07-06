document.addEventListener('DOMContentLoaded', function() {
    const inputSection = document.getElementById('input-section');
    const gameSection = document.getElementById('game-section');
    const messageDiv = document.querySelector('.message');
    const board = document.getElementById('board');
    const submitBtn = document.getElementById('submit');
    
    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
    
    // Create the board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = i + 1;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    
    // Submit button click handler
    submitBtn.addEventListener('click', function() {
        player1 = document.getElementById('player1').value.trim() || 'Player 1';
        player2 = document.getElementById('player2').value.trim() || 'Player 2';
        
        if (player1 && player2) {
            currentPlayer = player1;
            gameActive = true;
            inputSection.classList.add('hidden');
            gameSection.classList.remove('hidden');
            messageDiv.textContent = `${currentPlayer}, you're up`;
        }
    });
    
    // Cell click handler
    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.id) - 1;
        
        if (boardState[cellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update board state and UI - using lowercase x and o
        const symbol = currentPlayer === player1 ? 'x' : 'o';
        boardState[cellIndex] = symbol;
        cell.textContent = symbol;
        
        // Check for win or draw
        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer} congratulations you won!`;
            gameActive = false;
            return;
        }
        
        if (checkDraw()) {
            messageDiv.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        messageDiv.textContent = `${currentPlayer}, you're up`;
    }
    
    // Check for win conditions
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        return winConditions.some(condition => {
            return condition.every(index => {
                return boardState[index] === (currentPlayer === player1 ? 'x' : 'o');
            });
        });
    }
    
    // Check for draw
    function checkDraw() {
        return boardState.every(cell => cell !== '');
    }
});