const questions = document.querySelectorAll(".faq-card");

for (const question of questions) {
    function handleFaq(e) {
        question.classList.toggle("open");
    }
    
    question.addEventListener("click", handleFaq);
}