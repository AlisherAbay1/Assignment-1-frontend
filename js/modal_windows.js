const openButtons = document.querySelectorAll(".card-button");
const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-windows");
const closeButton = document.querySelector(".close");

for (const openButton of openButtons) {
    openButton.addEventListener("click", () => {
        overlay.classList.add("open");
        modal.classList.add("open");
    });
}

closeButton.addEventListener("click", () => {
    overlay.classList.remove("open");
    modal.classList.remove("open");
});

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("open");
        modal.classList.remove("open");
    }
});