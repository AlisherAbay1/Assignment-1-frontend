const contactForm = document.getElementById("contact-form");
const resetButton = document.querySelector(".clear-button");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");

const PROJECT_NAME_MIN_LENGTH = 3;
const PROJECT_NAME_MAX_LENGTH = 50;
const TECH_MIN_LENGTH = 2;
const TECH_MAX_LENGTH = 40;
const TASK_DESC_MIN_LENGTH = 20;
const TASK_DESC_MAX_LENGTH = 500;

function validateProjectName() {
    const value = document.getElementById("project-name").value.trim();

    if (!value) {
        return "Project name can't be empty";
    }
    if (value.length < PROJECT_NAME_MIN_LENGTH) {
        return "Project name must be at least " + PROJECT_NAME_MIN_LENGTH + " characters long";
    }
    if (value.length > PROJECT_NAME_MAX_LENGTH) {
        return "Project name must be at most " + PROJECT_NAME_MAX_LENGTH + " characters long";
    }
    if (!/^[\p{L}\p{N}][\p{L}\p{N} ._-]*$/u.test(value)) {
        return "Project name must start with a letter or a digit and can contain only letters, digits, spaces, dots, hyphens and underscores";
    }
    return "";
}

function validateProjectType() {
    if (!document.querySelector('input[name="project_type"]:checked')) {
        return "Please choose a project type";
    }
    return "";
}

function validateTech() {
    const value = document.getElementById("tech").value.trim();

    if (!value) {
        return "";
    }
    if (value.length < TECH_MIN_LENGTH) {
        return "Technology must be at least " + TECH_MIN_LENGTH + " characters long";
    }
    if (value.length > TECH_MAX_LENGTH) {
        return "Technology must be at most " + TECH_MAX_LENGTH + " characters long";
    }
    // Allows names like "C++", "C#", ".NET", "Node.js"
    if (!/^[\p{L}\p{N}.][\p{L}\p{N} +#.\/-]*$/u.test(value)) {
        return "Technology can contain only letters, digits, spaces and the symbols + # . / -";
    }
    return "";
}

function validateBrandColor() {
    const value = document.getElementById("brand-color").value;

    if (!/^#[0-9a-f]{6}$/i.test(value)) {
        return "Please pick a brand color";
    }
    return "";
}

function validateTaskDescription() {
    const value = document.getElementById("task-desc").value.trim();

    if (!value) {
        return "Task description can't be empty";
    }
    if (value.length < TASK_DESC_MIN_LENGTH) {
        return "Please describe the task in at least " + TASK_DESC_MIN_LENGTH
            + " characters (now " + value.length + ")";
    }
    if (value.length > TASK_DESC_MAX_LENGTH) {
        return "Task description must be at most " + TASK_DESC_MAX_LENGTH
            + " characters (now " + value.length + ")";
    }
    return "";
}

const fields = [
    {
        id: "project-name",
        controls: [document.getElementById("project-name")],
        validate: validateProjectName
    },
    {
        id: "project-type",
        controls: Array.from(document.querySelectorAll('input[name="project_type"]')),
        validate: validateProjectType
    },
    {
        id: "tech",
        controls: [document.getElementById("tech")],
        validate: validateTech
    },
    {
        id: "brand-color",
        controls: [document.getElementById("brand-color")],
        validate: validateBrandColor
    },
    {
        id: "task-desc",
        controls: [document.getElementById("task-desc")],
        validate: validateTaskDescription
    }
];

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.id + "-error");

    errorElement.textContent = message;
    errorElement.hidden = false;
    field.controls.forEach(function (control) {
        control.classList.add("is-invalid");
    });
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.id + "-error");

    errorElement.textContent = "";
    errorElement.hidden = true;
    field.controls.forEach(function (control) {
        control.classList.remove("is-invalid");
    });
}

function clearAllMessages() {
    fields.forEach(clearFieldError);
    formError.hidden = true;
    formError.textContent = "";
    formSuccess.hidden = true;
    formSuccess.textContent = "";
}


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
    clearAllMessages();

    const invalidFields = fields.filter(function (field) {
        const message = field.validate();
        if (message) {
            showFieldError(field, message);
        }
        return Boolean(message);
    });

    if (invalidFields.length > 0) {
        formError.textContent = invalidFields.length === 1
            ? "Please fix the highlighted field."
            : "Please fix the " + invalidFields.length + " highlighted fields.";
        formError.hidden = false;
        invalidFields[0].controls[0].focus();
        return;
    }

    buttonInProcess();
    setTimeout(function () {
        buttonDone();
        formSuccess.textContent = "Form sent successfully";
        formSuccess.hidden = false;
    }, 1000);
}

function resetForm() {
    document.getElementById("project-name").value = "";
    document.getElementById("tech").value = "";
    document.getElementById("brand-color").value = "#000000";
    document.getElementById("task-desc").value = "";

    const projectType = document.querySelector('input[name="project_type"]:checked');
    if (projectType) {
        projectType.checked = false;
    }

    $("#suggestions").hide();
    clearAllMessages();
}

fields.forEach(function (field) {
    field.controls.forEach(function (control) {
        control.addEventListener("input", function () { clearFieldError(field); });
        control.addEventListener("change", function () { clearFieldError(field); });
    });
});

document.getElementById("suggestions").addEventListener("click", function () {
    clearFieldError(fields.find(function (field) { return field.id === "tech"; }));
});

contactForm.addEventListener("submit", handleContactForm);
resetButton.addEventListener("click", resetForm);
