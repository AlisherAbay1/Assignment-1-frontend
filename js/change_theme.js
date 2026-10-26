const theme_buttons = document.querySelectorAll(".change-theme");


function change_theme(theme_button, to) {
    const icon = theme_button.querySelector("i")
    icon.className = "bi"
    icon.classList.add(to)
}


function change_theme_to_mulltiple_buttons(theme_buttons, to) {
    for (const theme_button of theme_buttons) {
        change_theme(theme_button, to)
    }
}


function handle_theme_toggle() {
    const is_light = document.body.classList.toggle("light");
    localStorage.setItem("light", is_light);
    if (is_light) {
        change_theme_to_mulltiple_buttons(theme_buttons, "bi-sun")
    } else {
        change_theme_to_mulltiple_buttons(theme_buttons, "bi-moon-fill")
    }
}


if (localStorage.getItem("light") === "true") {
    document.body.classList.add("light");
    change_theme_to_mulltiple_buttons(theme_buttons, "bi-sun")
} else {
    change_theme_to_mulltiple_buttons(theme_buttons, "bi-moon-fill")
}


for (const theme_button of theme_buttons) {
    theme_button.addEventListener("click", handle_theme_toggle);
}