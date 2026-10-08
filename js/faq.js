const questions = document.querySelectorAll(".faq-card");

for (const q of questions) {
    function handle_faq(e) {
        q.classList.toggle("open");
    }
    
    q.addEventListener("click", handle_faq);
}