const themeButtons = document.querySelectorAll(".change-theme");


function changeTheme(themeButton, to) {
    const icon = themeButton.querySelector("i");
    icon.className = "bi";
    icon.classList.add(to);
}


function changeThemeToMultipleButtons(themeButtons, to) {
    for (const themeButton of themeButtons) {
        changeTheme(themeButton, to);
    }
}


function handleThemeToggle() {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("light", isLight);
    if (isLight) {
        changeThemeToMultipleButtons(themeButtons, "bi-sun");
    } else {
        changeThemeToMultipleButtons(themeButtons, "bi-moon-fill");
    }
}


if (localStorage.getItem("light") === "true") {
    document.body.classList.add("light");
    changeThemeToMultipleButtons(themeButtons, "bi-sun");
} else {
    changeThemeToMultipleButtons(themeButtons, "bi-moon-fill");
}


for (const themeButton of themeButtons) {
    themeButton.addEventListener("click", handleThemeToggle);
}