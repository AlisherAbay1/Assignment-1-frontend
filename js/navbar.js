const navbar = document.querySelector('.navbar-nav');
const links = Array.from(navbar.querySelectorAll('a'));
const clickSound = new Audio('sounds/click.wav');

function handle_key_arrows(e) {
    const current = links.indexOf(document.activeElement);
    if (current === -1) {
        return;
    }

    switch (e.key) {
        case 'ArrowRight':
            e.preventDefault();
            links[(current + 1) % links.length].focus();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            links[(current - 1 + links.length) % links.length].focus();
            break;
    }
}

function play_click_sound() {
    clickSound.currentTime = 0;
    clickSound.play()
}

for (const link of links) {
    link.addEventListener("click", play_click_sound)
}


navbar.addEventListener('keydown', handle_key_arrows);