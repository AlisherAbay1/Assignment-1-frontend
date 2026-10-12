const clock_time = document.querySelector(".clock-time");

function update_time() {
    clock_time.textContent = new Date().toLocaleTimeString([], {month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

update_time();
setInterval(update_time, 1000);