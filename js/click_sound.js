const buttons = document.querySelectorAll(".card-button")
const clickSound = new Audio('sounds/click.wav');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play()
}

for (const button of buttons) {
    button.addEventListener("click", playClickSound)
}