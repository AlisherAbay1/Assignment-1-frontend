const navbar = document.querySelector('.navbar-nav');
const links = Array.from(navbar.querySelectorAll('a'));
const buttons = document.querySelectorAll(".auth");

function handleKeyArrows(e) {
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

function changeProfileAndAuth() {
    const isLogined = localStorage.getItem("currentUser") !== null;

    buttons.forEach((button) => {
        if (isLogined) {
            button.setAttribute("href", "profile.html");
            button.setAttribute("aria-label", "Profile");
        } else {
            button.setAttribute("href", "authentication.html");
            button.setAttribute("aria-label", "Log in or sign up");
        }
    });
}

changeProfileAndAuth();

navbar.addEventListener('keydown', handleKeyArrows);