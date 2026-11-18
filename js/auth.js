const authForm = document.getElementById("signup-form");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");
const loginForm = document.getElementById("login-form");
const loginFormError = document.getElementById("login-form-error");
const loginFormSuccess = document.getElementById("login-form-success");


// toggle

function toggle_password() {
    const input = $(this).siblings("input");
    const icon = $(this).find("i");

    const isHidden = input.attr("type") === "password";

    input.attr("type", isHidden ? "text" : "password");

    icon.toggleClass("bi-eye", !isHidden);
    icon.toggleClass("bi-eye-slash", isHidden);
}

// signup

function validateNickname() {
    const value = document.getElementById("nickname").value.trim();
    const email = document.getElementById("email").value.trim();
    const userData = JSON.parse(localStorage.getItem(email));

    if (!value) {
        return "Nickname can't be empty.";
    }

    if (userData !== null && userData.nickname === value) {
        return "Nickname is already taken."
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

    if (localStorage.getItem(value) !== null) {
        return "Email is already taken.";
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

async function validatePhone() {
    const value = document.getElementById("phone").value.trim();

    if (!value) {
        return "Phone number can't be empty";
    }

    const phonePattern = /^\+[1-9]\d{1,14}$/;
    const normalizedPhone = value.replace(/[\s()-]/g, "");

    if (!phonePattern.test(normalizedPhone)) {
        return "Please enter a valid international phone number";
    }

    try {
        const params = new URLSearchParams({
            api_key: "8f02e50d2d084daab23a19fcd40c4a068509a9c47dd53952d3",
            phone_number: normalizedPhone
        });

        const response = await fetch(
            `https://lookup.proweblook.com/api/v1/phonevalidation?${params}`
        );

        if (!response.ok) {
            return "Phone validation service is unavailable";
        }

        const data = await response.json();

        if (data.status === "INVALID") {
            return "This phone number is invalid";
        }

        if (data.status !== "VALID_CONFIRMED") {
            return "Unable to verify phone number";
        }

        return "";

    } catch (error) {
        console.error(error);
        return "Phone validation service is unavailable";
    }
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

function buttonInProcess(sendButton) {
    $(sendButton + ' span').css('visibility', 'hidden');
    $(sendButton).append('<span class="spinner"></span>');
    $(sendButton).prop("disabled", true);
}

function buttonDone(sendButton) {
    $(sendButton + " .spinner").remove();
    $(sendButton).prop("disabled", false);
    $(sendButton + ' span').css('visibility', 'visible');
}

async function handleSignupForm(e) {
    e.preventDefault();
    clearAllMessages();

    const invalidFields = [];

    for (const field of fields) {
        const message = await field.validate();

        if (message) {
            showFieldError(field, message);
            invalidFields.push(field);
        }
    }

    if (invalidFields.length > 0) {
        formError.textContent = invalidFields.length === 1
            ? "Please fix the highlighted field."
            : "Please fix the " + invalidFields.length + " highlighted fields.";

        formError.hidden = false;
        invalidFields[0].controls[0].focus();

        return;
    }

    buttonInProcess("#signup-button");

    setTimeout(function () {
        const userData = {
            nickname: document.getElementById("nickname").value,
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value
        };

        localStorage.setItem(
            document.getElementById("email").value,
            JSON.stringify(userData)
        );

        buttonDone("#signup-button");
        formSuccess.textContent = "Account created successfully.";
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

// login

function validateLoginEmail() {
    const value = document.getElementById("login-email").value.trim();

    if (!value) {
        return "Email can't be empty";
    }

    // Checks the basic email structure: local part, @, domain and extension.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
    }

    return "";
}

function validateLoginPassword() {
    const value = document.getElementById("login-password").value;

    if (!value) {
        return "Password can't be empty";
    }

    return "";
}

const loginFields = [
    {
        id: "login-email",
        controls: [document.getElementById("login-email")],
        validate: validateLoginEmail
    },
    {
        id: "login-password",
        controls: [document.getElementById("login-password")],
        validate: validateLoginPassword
    }
];

function handleLoginForm(e) {
    e.preventDefault();

    loginFields.forEach(clearFieldError);
    loginFormError.textContent = "";
    loginFormError.hidden = true;
    loginFormSuccess.textContent = "";
    loginFormSuccess.hidden = true;

    const invalidFields = loginFields.filter(function (field) {
        const message = field.validate();

        if (message) {
            showFieldError(field, message);
        }

        return Boolean(message);
    });

    if (invalidFields.length > 0) {
        loginFormError.textContent = invalidFields.length === 1
            ? "Please fix the highlighted field."
            : "Please fix the " + invalidFields.length + " highlighted fields.";

        loginFormError.hidden = false;
        invalidFields[0].controls[0].focus();

        return;
    }

    const userData = localStorage.getItem(document.getElementById("login-email").value)

    if (userData === null) {
        loginFormError.textContent = "Account doesn't exists.";
        loginFormError.hidden = false;
        return;
    }
    if (JSON.parse(userData).password !== document.getElementById("login-password").value) {
        loginFormError.textContent = "Password incorrect.";
        loginFormError.hidden = false;
        return;
    }

    buttonInProcess("#login-button");

    setTimeout(function () {
        localStorage.setItem("currentUser", document.getElementById("login-email").value);
        window.location.replace("/profile.html");
        buttonDone("#login-button");
        loginFormSuccess.textContent = "Login successful.";
        loginFormSuccess.hidden = false;
    }, 1000);
}

loginFields.forEach(function (field) {
    field.controls.forEach(function (control) {
        control.addEventListener("input", function () {
            clearFieldError(field);
        });

        control.addEventListener("change", function () {
            clearFieldError(field);
        });
    });
});

$("#login-form").on("submit", handleLoginForm);
$("#toggle-password, #toggle-confirm-password, #login-toggle-password").on("click", toggle_password);
$("#signup-form").on("submit", handleSignupForm);