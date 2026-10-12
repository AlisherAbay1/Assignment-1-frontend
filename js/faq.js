const questions = document.querySelectorAll(".faq-card");

for (const question of questions) {
    function handle_faq(e) {
        question.classList.toggle("open");
    }
    
    question.addEventListener("click", handle_faq);
}