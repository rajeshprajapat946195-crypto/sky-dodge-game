let score = 0;
let scoreDisplay = document.getElementById("score");
let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");

let playerX = 130;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  }
  if (e.key === "ArrowRight" && playerX < 260) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
});

function createObstacle() {
  let obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = Math.floor(Math.random() * 260) + "px";
  obs.style.top = "0px";
  gameArea.appendChild(obs);

  let fall = setInterval(() => {
    let obsTop = parseInt(obs.style.top);
    obs.style.top = obsTop + 5 + "px";

    let playerRect = player.getBoundingClientRect();
    let obsRect = obs.getBoundingClientRect();

    if (
      obsRect.bottom > playerRect.top &&
      obsRect.top < playerRect.bottom &&
      obsRect.left < playerRect.right &&
      obsRect.right > playerRect.left
    ) {
      document.body.innerHTML = "<h1>Game Over</
        h1><p>Your Score: " + score + "</p>";
    }

    if (obsTop > 400) {
      clearInterval(fall);
      obs.remove();
      setInterval(() => {
  score++;
  scoreDisplay.innerText = "Score: " + score;
}, 1000);
    document.addEventListener("touchmove", (e) => {
  let touchX = e.touches[0].clientX;
  player.style.left = (touchX - 20) + "px";
});
    
  }, 50);
}

setInterval(createObstacle, 1500);
