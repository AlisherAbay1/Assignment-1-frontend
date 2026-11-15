const contact_form = document.getElementById("contact-form");
const reset_button = document.querySelector(".clear-button")
const form_error = document.getElementById("form_error");
const form_success = document.getElementById("form_success");

function button_in_process() {
    $('.submit-button span').css('visibility', 'hidden');
    $(".submit-button").append('<span class="spinner"></span>');
    $(".submit-button").prop("disabled", true);
}

function button_done() {
    $(".submit-button .spinner").remove();
    $(".submit-button").prop("disabled", false);
    $('.submit-button span').css('visibility', 'visible');
}

function handle_contact_form(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const task_desc = document.getElementById("task_desc").value.trim();

    form_error.hidden = true;
    form_error.textContent = "";
    form_success.hidden = true;
    form_success.textContent = "";

    button_in_process();
    setTimeout(function() {
        button_done();

        if (!/^\p{Lu}(\p{Ll})+$/u.test(name)) {
            form_error.textContent = "Your name isn't correct";
            form_error.hidden = false;
            return;
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(email)) {
            form_error.textContent = "Your email isn't correct";
            form_error.hidden = false;
            return;
        }
        if (!task_desc.length) {
            form_error.textContent = "Task description shouldn't be empty";
            form_error.hidden = false;
            return;
        }

        form_success.textContent = "Form sent successfully";
        form_success.hidden = false;
    }, 1000);
}

function reset_form() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const project_type = document.querySelector('input[name="project_type"]:checked');
    const brand_color = document.getElementById("brand_color");
    const task_desc = document.getElementById("task_desc");

    name.value = '';
    email.value = ''
    brand_color.value = "#000000";
    task_desc.value = '';
    if (project_type) {
        project_type.checked = false;
    }
}

contact_form.addEventListener("submit", handle_contact_form);
reset_button.addEventListener("click", reset_form)