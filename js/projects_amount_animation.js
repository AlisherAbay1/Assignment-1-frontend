$({value: 1}).animate(
    {value: 1000},
    {
        duration: 2000,
        step: function() {
            $("#projects-amount-value").text(Math.ceil(this.value));
        }
    }
);