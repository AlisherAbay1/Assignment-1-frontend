const navbar = document.querySelector('.navbar-nav');
const links = Array.from(navbar.querySelectorAll('a'));

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

navbar.addEventListener('keydown', handle_key_arrows);