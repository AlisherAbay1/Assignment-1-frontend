const greetingElement  = document.getElementById("time-related-greating")


function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;

    switch (true) {
        case hour >= 5 && hour < 12:
            greeting = "Good morning";
            break;
        case hour >= 12 && hour < 18:
            greeting = "Good afternoon";
            break;
        default:
            greeting = "Good evening";
    }

    greetingElement.textContent = greeting;
}

updateGreeting();
setInterval(updateGreeting, 1000);