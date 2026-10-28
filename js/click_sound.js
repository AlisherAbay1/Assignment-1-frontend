const buttons = document.querySelectorAll(".card-button")
const clickSound = new Audio('sounds/click.wav');

function play_click_sound() {
    clickSound.currentTime = 0;
    clickSound.play()
}

for (const button of buttons) {
    button.addEventListener("click", play_click_sound)
}