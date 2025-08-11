// digital clock

function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
     
    const timestring = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(ampm)}`;
    document.getElementById("clock").textContent = timestring;
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

setInterval(updateClock,1000);
updateClock();

// stop watch

let stopwatchTime = 0;
let stopwatchTimeInterval = null;

function updateStopwatch() {
    const hrs = Math.floor(stopwatchTime / 3600);
    const mins = Math.floor(stopwatchTime % 3600);
    const secs = Math.floor(stopwatchTime % 60);
   
    document.getElementById("stopwatch").textContent =
    `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}
 
document.getElementById("start").addEventListener("click", () =>{
 if (!stopwatchTimeInterval) {
    stopwatchTimeInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatch();
    }, 1000);
 }
});

document.getElementById("pause").addEventListener("click",() =>{
    clearInterval(stopwatchTimeInterval);
    stopwatchTimeInterval = null;
});
document.getElementById("reset").addEventListener("click",() =>{
    clearInterval(stopwatchTimeInterval);
    stopwatchTimeInterval = null;
    stopwatchTime = 0;
    updateStopwatch();
});

updateStopwatch();