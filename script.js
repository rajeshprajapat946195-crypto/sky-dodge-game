let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let startBtn = document.getElementById("startBtn");

let playerX = 130;
let score = 0;
let gameRunning = false;

// Player move
document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }

    if (e.key === "ArrowRight" && playerX < 260) {
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

// Create obstacle
function createObstacle() {
    if (!gameRunning) return;

    let obs = document.createElement("div");
    obs.classList.add("obstacle");

    let obsX = Math.floor(Math.random() * 260);
    obs.style.left = obsX + "px";

    gameArea.appendChild(obs);

    let obsY = 0;

    let fall = setInterval(() => {
        if (!gameRunning) {
            clearInterval(fall);
            return;
        }

        obsY += 5;
        obs.style.top = obsY + "px";

        // Collision check
        if (
            obsY > 330 &&
            obsX < playerX + 40 &&
            obsX + 40 > playerX
        ) {
            alert("Game Over! Score: " + score);
            location.reload();
        }

        if (obsY > 400) {
            clearInterval(fall);
            obs.remove();
            score++;
            scoreDisplay.innerText = "Score: " + score;
        }

    }, 50);
}

// Start button
startBtn.addEventListener("click", () => {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    scoreDisplay.innerText = "Score: 0";

    setInterval(createObstacle, 1500);
});
