const questions = document.querySelectorAll(".faq-card");

function handleFaq(e) {
    e.currentTarget.classList.toggle("open");
}

for (const question of questions) {
    question.addEventListener("click", handleFaq);
}