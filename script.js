//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;
const board = document.getElementById("board");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// Start Game Function
function startGame() {
    player1 = document.getElementById("player-1").value || "Player 1";
    player2 = document.getElementById("player-2").value || "Player 2";

    document.getElementById("player-input").classList.add("hidden");
    board.classList.remove("hidden");

    message.textContent = `${player1}, you're up!`;

    // Add event listeners to all cells
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });

    gameActive = true;
}

// Handle Click Function
function handleClick(event) {
    if (!gameActive) return;

    let cell = event.target;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${getCurrentPlayerName()} Congratulations, you won!`;
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch Player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `${getCurrentPlayerName()}, you're up!`;
}

// Check for a Winner
function checkWinner() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (cells[a - 1].textContent === currentPlayer &&
                cells[b - 1].textContent === currentPlayer &&
                cells[c - 1].textContent === currentPlayer);
    });
}

// Get the Current Player's Name
function getCurrentPlayerName() {
    return currentPlayer === "X" ? player1 : player2;
}
