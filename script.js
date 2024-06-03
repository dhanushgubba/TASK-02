let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapCount = 0;
let pausedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - pausedTime;
        tInterval = setInterval(updateTime, 1000);
        running = true;
        startButton.style.display = "none"; 
        pauseButton.textContent = "Pause";
        pauseButton.style.display = "inline-block"; 
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        pausedTime = difference; 
        pauseButton.textContent = "Resume";
    } else {
        startTimer();
        pauseButton.textContent = "Pause";
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    startTime = 0;
    difference = 0;
    pausedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    startButton.textContent = "Start";
    startButton.style.display = "inline-block"; 
    pauseButton.style.display = "none";
    lapCount = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        let lapTime = display.textContent;
        let lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
