const theme_buttons = document.querySelectorAll(".change-theme");

if (localStorage.getItem("inverted") === "true") {
    document.documentElement.classList.toggle("inverted");
}

function handle_faq(e) {
    const is_inverted = document.documentElement.classList.toggle("inverted");
    localStorage.setItem("inverted", is_inverted)
}

for (const theme_button of theme_buttons) {
    theme_button.addEventListener("click", handle_faq);
}