
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const highResetBtn = document.getElementById("high-reset-btn");
const overlay = document.getElementById("game-overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");
const overlayBtn = document.getElementById("overlay-btn");
const difficulty = document.getElementById("difficulty");

const box = 20;
const totalBoxes = canvas.width / box;

let snake = [];
let food = {};
let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;

let direction = "RIGHT";
let nextDirection = "RIGHT";

let gameInterval = null;
let gameState = "ready";

highScoreElement.textContent = highScore;

// Generate food without placing it on the snake
function generateFood() {
    let position;

    do {
        position = {
            x: Math.floor(Math.random() * totalBoxes) * box,
            y: Math.floor(Math.random() * totalBoxes) * box
        };
    } while (
        snake.some(segment =>
            segment.x === position.x &&
            segment.y === position.y
        )
    );

    food = position;
}

// Initialize game
function initGame() {
    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 }
    ];

    direction = "RIGHT";
    nextDirection = "RIGHT";
    score = 0;

    scoreElement.textContent = score;

    generateFood();
    drawGame();
}

// Draw game board
function drawGame() {
    ctx.fillStyle = "#0c1425";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= canvas.width; i += box) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw food
    ctx.save();
    ctx.shadowColor = "#ff3864";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#ff3864";

    ctx.beginPath();
    ctx.arc(
        food.x + box / 2,
        food.y + box / 2,
        box / 2 - 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.restore();

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.save();

        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = index === 0 ? 18 : 7;

        ctx.fillStyle = index === 0 ? "#b5ff9b" : "#39ff14";

        ctx.beginPath();
        ctx.roundRect(
            segment.x + 1,
            segment.y + 1,
            box - 2,
            box - 2,
            5
        );
        ctx.fill();

        ctx.restore();
    });
}

// Update high score
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreElement.textContent = highScore;
    }
}

// Main game movement
function updateGame() {
    direction = nextDirection;

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    const newHead = { x: headX, y: headY };

    const eatingFood =
        headX === food.x && headY === food.y;

    // Check wall collision
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height
    ) {
        gameOver();
        return;
    }

    // Check collision with snake body
    const bodyToCheck = eatingFood
        ? snake
        : snake.slice(0, -1);

    const hitSnake = bodyToCheck.some(segment =>
        segment.x === newHead.x &&
        segment.y === newHead.y
    );

    if (hitSnake) {
        gameOver();
        return;
    }

    snake.unshift(newHead);

    if (eatingFood) {
        score++;
        scoreElement.textContent = score;

        updateHighScore();
        generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// Start game
function startGame() {
    if (gameState === "running") return;

    if (gameState === "ready" || gameState === "over") {
        initGame();
    }

    gameState = "running";

    overlay.classList.add("hidden");

    startBtn.textContent = "PAUSE";

    const speed = Number(difficulty.value);

    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, speed);
}

// Pause game
function pauseGame() {
    if (gameState !== "running") return;

    clearInterval(gameInterval);
    gameInterval = null;

    gameState = "paused";

    overlayTitle.textContent = "PAUSED";
    overlayMessage.textContent = "Take a short break!";
    overlayBtn.textContent = "RESUME GAME";

    overlay.classList.remove("hidden");

    startBtn.textContent = "RESUME";
}

// Game over
function gameOver() {
    clearInterval(gameInterval);
    gameInterval = null;

    gameState = "over";

    overlayTitle.textContent = "GAME OVER!";
    overlayMessage.textContent = "Your final score: " + score;
    overlayBtn.textContent = "PLAY AGAIN";

    overlay.classList.remove("hidden");

    startBtn.textContent = "PLAY AGAIN";
}

// Reset game
function resetGame() {
    clearInterval(gameInterval);
    gameInterval = null;

    gameState = "ready";

    initGame();

    overlayTitle.textContent = "NEON SNAKE";
    overlayMessage.textContent = "Ready to play?";
    overlayBtn.textContent = "START GAME";

    overlay.classList.remove("hidden");

    startBtn.textContent = "START GAME";
}

// Change direction
function changeDirection(newDirection) {
    if (gameState !== "running") return;

    const opposite = {
        LEFT: "RIGHT",
        RIGHT: "LEFT",
        UP: "DOWN",
        DOWN: "UP"
    };

    if (newDirection !== opposite[direction]) {
        nextDirection = newDirection;
    }
}

// Keyboard controls
document.addEventListener("keydown", event => {
    const keys = {
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        a: "LEFT",
        d: "RIGHT",
        w: "UP",
        s: "DOWN",
        A: "LEFT",
        D: "RIGHT",
        W: "UP",
        S: "DOWN"
    };

    if (keys[event.key]) {
        event.preventDefault();
        changeDirection(keys[event.key]);
    }

    if (event.code === "Space") {
        event.preventDefault();

        if (gameState === "running") {
            pauseGame();
        } else {
            startGame();
        }
    }
});

// Mobile controls
document.querySelectorAll("[data-direction]").forEach(button => {
    button.addEventListener("click", () => {
        changeDirection(button.dataset.direction);
    });
});

// Start / Pause button
startBtn.addEventListener("click", () => {
    if (gameState === "running") {
        pauseGame();
    } else {
        startGame();
    }
});

// Overlay button
overlayBtn.addEventListener("click", startGame);

// Reset button
resetBtn.addEventListener("click", resetGame);

// Reset high score
highResetBtn.addEventListener("click", () => {
    localStorage.removeItem("highScore");

    highScore = 0;
    highScoreElement.textContent = 0;
});

// Initialize
initGame();
