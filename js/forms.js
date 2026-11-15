const contactForm = document.getElementById("contact-form");
const resetButton = document.querySelector(".clear-button");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");

function buttonInProcess() {
    $('.submit-button span').css('visibility', 'hidden');
    $(".submit-button").append('<span class="spinner"></span>');
    $(".submit-button").prop("disabled", true);
}

function buttonDone() {
    $(".submit-button .spinner").remove();
    $(".submit-button").prop("disabled", false);
    $('.submit-button span').css('visibility', 'visible');
}

function handleContactForm(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const taskDesc = document.getElementById("task-desc").value.trim();

    formError.hidden = true;
    formError.textContent = "";
    formSuccess.hidden = true;
    formSuccess.textContent = "";

    buttonInProcess();
    setTimeout(function() {
        buttonDone();

        // Name: one capitalized word, letters only (Unicode)
        if (!/^\p{Lu}(\p{Ll})+$/u.test(name)) {
            formError.textContent = "Your name isn't correct";
            formError.hidden = false;
            return;
        }
        // Email: local part, "@", domain with at least one dot.
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(email)) {
            formError.textContent = "Your email isn't correct";
            formError.hidden = false;
            return;
        }
        if (!taskDesc.length) {
            formError.textContent = "Task description shouldn't be empty";
            formError.hidden = false;
            return;
        }

        formSuccess.textContent = "Form sent successfully";
        formSuccess.hidden = false;
    }, 1000);
}

function resetForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const projectType = document.querySelector('input[name="project_type"]:checked');
    const brandColor = document.getElementById("brand-color");
    const taskDesc = document.getElementById("task-desc");

    name.value = '';
    email.value = ''
    brandColor.value = "#000000";
    taskDesc.value = '';
    if (projectType) {
        projectType.checked = false;
    }
}

contactForm.addEventListener("submit", handleContactForm);
resetButton.addEventListener("click", resetForm);