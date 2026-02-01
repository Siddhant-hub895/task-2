let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;
let recordCount = 0;



const miniStopwatchCard = document.getElementById("miniStopwatchCard");
const miniStatus = document.getElementById("miniStatus");
const miniProgress = document.getElementById("miniProgress");

const historyIcon = document.getElementById("historyIcon");
const recordsSection = document.getElementById("records");




let miniHours = 0, miniMinutes = 0, miniSeconds = 0;
let miniInterval = null;
let totalSeconds = 0; 

function updateMiniStopwatch() {
  miniSeconds++;
  totalSeconds++;
  if (miniSeconds >= 60) { miniSeconds = 0; miniMinutes++; }
  if (miniMinutes >= 60) { miniMinutes = 0; miniHours++; }

  const h = String(miniHours).padStart(2,'0');
  const m = String(miniMinutes).padStart(2,'0');
  const s = String(miniSeconds).padStart(2,'0');

  miniStopwatch.textContent = `${h}:${m}:${s}`;


  const progressPercent = ((miniMinutes * 60 + miniSeconds) / 3600) * 100;
  miniProgress.style.width = `${progressPercent}%`;
}


document.getElementById('startBtn').addEventListener('click', () => {
  if(miniInterval) clearInterval(miniInterval);
  miniInterval = setInterval(updateMiniStopwatch, 1000);
});

document.getElementById('stopBtn').addEventListener('click', () => {
  clearInterval(miniInterval);
});


document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(miniInterval);
  miniHours = miniMinutes = miniSeconds = 0;
  miniStopwatch.textContent = '00:00:00';
});



const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const stopwatchCard = document.getElementById("stopwatchCard");


const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const recordBtn = document.getElementById("recordBtn");
const clearRecordsBtn = document.getElementById("clearRecordsBtn");
const recordTable = document.getElementById("recordTable");
const themeBtn = document.getElementById("themeBtn");


function updateDisplay() {
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
  millisecondsEl.textContent = String(milliseconds).padStart(3, "0");
}

function startTimer() {
  if (timer !== null) return;
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10);
}


function stopTimer() {
  clearInterval(timer);
  timer = null;
}


function resetTimer() {
  stopTimer();
  milliseconds = seconds = minutes = hours = 0;
  updateDisplay();
}


function recordTime() {
  recordCount++;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="border border-gray-600 px-2 py-1">${recordCount}</td>
    <td class="border border-gray-600 px-2 py-1">${hoursEl.textContent}</td>
    <td class="border border-gray-600 px-2 py-1">${minutesEl.textContent}</td>
    <td class="border border-gray-600 px-2 py-1">${secondsEl.textContent}</td>
    <td class="border border-gray-600 px-2 py-1">${millisecondsEl.textContent}</td>
  `;
  recordTable.appendChild(row);
}


function clearRecords() {
  recordTable.innerHTML = "";
  recordCount = 0;
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
recordBtn.addEventListener("click", recordTime);
clearRecordsBtn.addEventListener("click", clearRecords);
themeBtn.addEventListener("click", toggleTheme);


updateDisplay();