function updateProjectsAmount() {
    $("#projects-amount-value").text(Math.ceil(this.value));
}

function animateProjectsAmount() {
    $({value: 1}).animate(
        {value: 1000},
        {
            duration: 2000,
            step: updateProjectsAmount
        }
    );
}

animateProjectsAmount();