function filterListItems() {
    const value = $(this).val().toLowerCase();

    const values = $(".list-group-item").filter(matchesSearch);

    $(".list-group-item").hide();

    values.show();
}

function matchesSearch() {
    const value = $("#search").val().toLowerCase();

    return $(this).text().toLowerCase().includes(value);
}

$("#search").on("input", filterListItems);