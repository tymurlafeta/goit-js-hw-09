const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

startBtn.addEventListener("click", startColorChange);
stopBtn.addEventListener("click", stopColorChange);

function startColorChange() {
  startBtn.disabled = true;
  intervalId = setInterval(changeBodyColor, 1000);
};

function stopColorChange() {
  startBtn.disabled = false;
  clearInterval(intervalId);
};

function changeBodyColor() {
  const body = document.body;
  body.style.backgroundColor = getRandomHexColor();
};

