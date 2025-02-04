// Selecionando elementos do DOM
const timerDisplay = document.querySelector(".circle span");
const startBtn = document.querySelector(".play-btn");
const resetBtn = document.querySelector(".reset-btn");
const lapBtn = document.querySelector(".lap-btn");

// Variáveis de controle
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Event Listeners para os botões
startBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);

// Função para iniciar/pausar o cronômetro
function toggleTimer() {
  if (!isRunning) {
    // Inicia o cronômetro
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    startBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    // Pausa o cronômetro
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

// Função para atualizar o display
function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Função para formatar o tempo em HH:MM:SS:MS
function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let ms = Math.floor((milliseconds % 1000) / 10);

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
    seconds
  )}:${padNumber(ms)}`;
}

// Função auxiliar para adicionar zero à esquerda
function padNumber(number) {
  return number.toString().padStart(2, "0");
}

// Função para resetar o cronômetro
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  timerDisplay.textContent = "00:00:00:00";
  startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  laps = [];
  updateLapDisplay();
}

// Array para armazenar as voltas
let laps = [];

// Função para adicionar volta
function addLap() {
  if (isRunning) {
    laps.push(elapsedTime);
    updateLapDisplay();
  }
}

// Função para atualizar o display das voltas
function updateLapDisplay() {
  // Verifica se já existe uma div para as voltas
  let lapsContainer = document.querySelector(".laps-container");

  // Se não existir, cria uma nova
  if (!lapsContainer) {
    lapsContainer = document.createElement("div");
    lapsContainer.className = "laps-container";
    document.querySelector(".container").appendChild(lapsContainer);
  }

  // Limpa o conteúdo atual
  lapsContainer.innerHTML = "";

  // Adiciona cada volta
  laps.forEach((lap, index) => {
    const lapElement = document.createElement("div");
    lapElement.className = "lap";
    lapElement.innerHTML = `<p>Volta ${index + 1}: ${formatTime(lap)}</p>`;
    lapsContainer.appendChild(lapElement);
  });
}
