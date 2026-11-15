const clockTime = document.querySelector(".clock-time");

function updateTime() {
    clockTime.textContent = new Date().toLocaleTimeString([], {month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

updateTime();
setInterval(updateTime, 1000);