const nickname = document.getElementById("nickname")
const email = document.getElementById("email")
const phoneNumber = document.getElementById("phone-number")
const logoutButton = document.getElementById("logout-button")

function loadProfileInfo() {
    const currentUser = localStorage.getItem("currentUser")
    const isLogined = currentUser !== null;
    if (isLogined) {
        const userData = JSON.parse(localStorage.getItem(currentUser))
        nickname.textContent += userData.nickname;
        email.textContent += currentUser;
        phoneNumber.textContent += userData.phone;
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.replace("/authentication.html");
}

logoutButton.addEventListener("click", logout)

loadProfileInfo()