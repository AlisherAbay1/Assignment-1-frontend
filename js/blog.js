$("#search").on("input", function() {
    const value = $(this).val().toLowerCase();

    const values = $(".list-group-item").filter(function() {
        return $(this).text().toLowerCase().includes(value);
    })

    $(".list-group-item").hide();

    values.show();
})