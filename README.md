# Snake Game
A modern take on the classic Snake Game, built using **HTML, CSS, and JavaScript**. This project features a neon-themed interface, glowing snake animations, multiple difficulty levels and responsive mobile controls.
## Screenshots

Game Start Screen
<img width="782" height="1010" alt="image" src="https://github.com/user-attachments/assets/53c49ee2-dc41-40f9-b1dc-c087e7acd041" />
Gameplay
<img width="772" height="1012" alt="image" src="https://github.com/user-attachments/assets/9694b374-8fd7-4a72-99e9-8bd4b4b83f00" />
Game Over Screen
<img width="848" height="1001" alt="image" src="https://github.com/user-attachments/assets/a747e6d0-b0c6-4cbf-937a-c1c8fd9a4155" />

## Features
- **Neon UI:** Dark background with glowing green snake and neon food.
- **Score Tracking:** Displays current score and highest score.
- **High Score Storage:** Saves the highest score using browser `localStorage`.
- **Difficulty Levels:** Choose between Easy, Medium, and Hard.
- **Game Controls:** Start, pause, resume, and reset functionality.
- **Game Over Screen:** Displays the final score when the snake collides with a wall or itself.
- **Keyboard Controls:** Play using arrow keys or WASD keys.
- **Mobile Support:** Touch-friendly directional buttons for mobile devices.
- **Collision Detection:** Detects collisions with walls and the snake's body.
- **Random Food Generation:** Food appears at random positions without spawning on the snake.

## Technologies Used
- **HTML5:** Structures the game interface and provides the Canvas element.
- **CSS3:** Creates the neon-themed design and responsive layout.
- **JavaScript:** Handles game logic, movement, collision detection, scoring, and event handling.
- **HTML Canvas API:** Draws the snake, food, and game board.
- **Local Storage:** Stores the player's high score in the browser.

## Project Structure

```text
Snake-Game/
│
├── index.html       # Game structure
├── style.css        # Styling and responsive design
├── script.js        # Game logic and functionality
└── README.md        # Project documentation
```

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd Neon-Snake-Game
   ```

3. Open `index.html` in your web browser.

4. Click **START GAME** and enjoy playing!

No additional libraries or installations are required.

## Game Controls

| Key / Button | Action |
|---|---|
| ↑ / W | Move Up |
| ↓ / S | Move Down |
| ← / A | Move Left |
| → / D | Move Right |
| Spacebar | Pause / Resume |
| Mobile Buttons | Change Direction |

## Difficulty Levels

| Level | Speed |
|---|---|
| Easy | 180 ms |
| Medium | 120 ms |
| Hard | 75 ms |

Choose your preferred difficulty before starting the game.

## Concepts Learned

This project helped me practice and understand:
- DOM manipulation and JavaScript event listeners.
- HTML Canvas and 2D drawing methods.
- JavaScript arrays and objects.
- Game loops using `setInterval()`.
- Collision detection algorithms.
- Random number generation.
- Browser local storage.
- Responsive web design using CSS media queries.
- Managing game states such as Ready, Running, Paused, and Game Over.


## 👩‍💻 Author

**Simran**

Built as a personal project to practice frontend development and JavaScript game programming.

---


