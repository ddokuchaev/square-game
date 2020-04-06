let $timeHeader = document.querySelector("#time-header");
let $time = document.querySelector("#time");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $gameTime = document.querySelector("#game-time");

let score = 0;
let isGameStarted = false;
let colors = ["red", "blue", "pink", "yellow", "green"];

//listeners
$game.addEventListener("click", handleBoxClick);
$start.addEventListener("click", gameStart);

function hide($el) {
  $el.classList.add("hide");
}

function show($el) {
  $el.classList.remove("hide");
}

function setGameScore() {
  $result.textContent = score;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function gameStart() {
  score = 0;
  let timer = 0;
  isGameStarted = true;
  $gameTime.setAttribute("disabled", "disabled"); //todo check
  hide($start);
  $game.style.backgroundColor = "#fff";
  setGameTime();

  let interval = setInterval(() => {
    if (timer >= $gameTime.value) {
      clearInterval(interval);
      gameEnd();
    } else {
      timer += 0.1;
      $time.textContent = timer.toFixed(1);
    }
  }, 100);

  renderBox();
}

function gameEnd() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled");
  $game.innerHTML = "";
  $game.style.backgroundColor = "#ccc";

  show($start);
  show($resultHeader);
  hide($timeHeader);
}

function setGameTime() {
  show($timeHeader);
  show($time);
  hide($resultHeader);
}

function renderBox() {
  let $box = document.createElement("box");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let indexRandomColor = getRandom(0, colors.length);

  $game.innerHTML = "";
  $box.style.height = $box.style.width = boxSize + "px";
  $box.style.position = "absolute";
  $box.style.backgroundColor = colors[indexRandomColor];
  $box.style.top = getRandom(0, maxTop) + "px";
  $box.style.left = getRandom(0, maxLeft) + "px";
  $box.style.cursor = "pointer";

  $box.setAttribute("data-box", "true");
  $game.insertAdjacentElement("afterbegin", $box);
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}
