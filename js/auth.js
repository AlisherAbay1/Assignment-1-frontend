const authForm = document.getElementById("login-form");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");

function toggle_password() {
    const input = $(this).siblings("input");
    const icon = $(this).find("i");

    const isHidden = input.attr("type") === "password";

    input.attr("type", isHidden ? "text" : "password");

    icon.toggleClass("bi-eye", !isHidden);
    icon.toggleClass("bi-eye-slash", isHidden);
}

function validateNickname() {
    const value = document.getElementById("nickname").value.trim();

    if (!value) {
        return "Nickname can't be empty";
    }
    return "";
}

function validateEmail() {
    const value = document.getElementById("email").value.trim();

    if (!value) {
        return "Email can't be empty";
    }

    // Checks the basic email structure: local part, @, domain and extension.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
    }

    return "";
}

function validatePassword() {
    const value = document.getElementById("password").value;

    if (!value) {
        return "Password can't be empty";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
        return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one digit";
    }

    return "";
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!confirmPassword) {
        return "Please confirm your password";
    }

    if (password !== confirmPassword) {
        return "Passwords don't match";
    }

    return "";
}

function validatePhone() {
    const value = document.getElementById("phone").value.trim();

    if (!value) {
        return "Phone number can't be empty";
    }

    // Validates an international phone number.
    const phonePattern = /^\+[1-9]\d{1,14}$/;

    if (!phonePattern.test(value.replace(/[\s()-]/g, ""))) {
        return "Please enter a valid international phone number";
    }

    return "";
}

const fields = [
    {
        id: "nickname",
        controls: [document.getElementById("nickname")],
        validate: validateNickname
    },
    {
        id: "email",
        controls: [document.getElementById("email")],
        validate: validateEmail
    },
    {
        id: "password",
        controls: [document.getElementById("password")],
        validate: validatePassword
    },
    {
        id: "confirm-password",
        controls: [document.getElementById("confirm-password")],
        validate: validateConfirmPassword
    },
    {
        id: "phone",
        controls: [document.getElementById("phone")],
        validate: validatePhone
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

    formError.textContent = "";
    formError.hidden = true;
}

function buttonInProcess() {
    $('.submit-auth-button span').css('visibility', 'hidden');
    $(".submit-auth-button").append('<span class="spinner"></span>');
    $(".submit-auth-button").prop("disabled", true);
}

function buttonDone() {
    $(".submit-auth-button .spinner").remove();
    $(".submit-auth-button").prop("disabled", false);
    $('.submit-auth-button span').css('visibility', 'visible');
}

function handleAuthForm(e) {
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

fields.forEach(function (field) {
    field.controls.forEach(function (control) {
        control.addEventListener("input", function () {
            clearFieldError(field);
        });

        control.addEventListener("change", function () {
            clearFieldError(field);
        });
    });
});

$("#toggle-password, #toggle-confirm-password").on("click", toggle_password);
$("#login-form").on("submit", handleAuthForm);