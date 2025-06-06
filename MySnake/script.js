const canvas = document.getElementById('game-board');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const startBtn = document.getElementById('start-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        const box = 20; // Size of each grid box
        let snake = [];
        let food = {};
        let score = 0;
        let highScore = localStorage.getItem("highScore") || 0;
        let d; // Direction
        let game;
        let gameRunning = false;
        
        // Initialize game
        function initGame() {
            snake = [
                {x: 9 * box, y: 10 * box}
            ];
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
            score = 0;
            d = undefined;
            scoreElement.textContent = `Score: ${score}`;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }           
            document.getElementById("high-score").textContent = `High Score: ${highScore}`;

        }
        
        function resetHighScore() {
            localStorage.removeItem("highScore");
            highScore = 0;
            document.getElementById("high-score").textContent = `High Score: ${highScore}`;
        }

        // Draw game elements
        function draw() {
            // Clear canvas
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? "#5DF15D" : "#a6f1a6";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                
                ctx.strokeStyle = "#fff";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
            
            // Draw food
            ctx.fillStyle = "pink";
            ctx.fillRect(food.x, food.y, box, box);
            
            // Current head position
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
            
            // Move snake based on direction
            if (d === "LEFT") snakeX -= box;
            if (d === "UP") snakeY -= box;
            if (d === "RIGHT") snakeX += box;
            if (d === "DOWN") snakeY += box;
            
            // Check if snake eats food
            if (snakeX === food.x && snakeY === food.y) {
                score++;
                scoreElement.textContent = `Score: ${score}`;
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
                if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
}
document.getElementById("high-score").textContent = `High Score: ${highScore}`;

            } else {
                // Remove tail if no food eaten
                snake.pop();
            }
            
            // Add new head
            const newHead = {x: snakeX, y: snakeY};
            
            // Game over conditions
            if (
                snakeX < 0 || snakeY < 0 || 
                snakeX >= canvas.width || snakeY >= canvas.height ||
                collision(newHead, snake)
            ) {
                clearInterval(game);
                gameRunning = false;
                startBtn.textContent = "Start Game";
                return;
            }
            
            snake.unshift(newHead);
        }
        
        // Check collision with self
        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return true;
                }
            }
            return false;
        }
        
        // Change direction based on key press
        function changeDirection(event) {
            if (!gameRunning) return;
            
            const key = event.keyCode;
            if (key === 37 && d !== "RIGHT") d = "LEFT";
            else if (key === 38 && d !== "DOWN") d = "UP";
            else if (key === 39 && d !== "LEFT") d = "RIGHT";
            else if (key === 40 && d !== "UP") d = "DOWN";
        }
        
        // Event listeners
        document.addEventListener('keydown', changeDirection);
        
        startBtn.addEventListener('click', () => {
            if (!gameRunning) {
                initGame();
                game = setInterval(draw, 150);
                gameRunning = true;
                startBtn.textContent = "Pause Game";
            } else {
                clearInterval(game);
                gameRunning = false;
                startBtn.textContent = "Resume Game";
            }
        });
        
        resetBtn.addEventListener('click', () => {
            clearInterval(game);
            initGame();
            gameRunning = false;
            startBtn.textContent = "Start Game";
            draw(); // Draw initial state
        });
        
        // Draw initial state
        initGame();
        draw();