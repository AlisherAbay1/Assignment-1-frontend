function matchesSearch() {
    const value = $("#search").val().toLowerCase();

    return $(this).text().toLowerCase().includes(value);
}

function filterListItems() {
    const matchingItems = $(".list-group-item").filter(matchesSearch);

    $(".list-group-item").hide();

    matchingItems.show();
}

function saveSearch() {
    localStorage.setItem("blog-search", $("#search").val());
}

function handleSearchInput() {
    filterListItems();
    saveSearch();
}

function restoreSearch() {
    const savedSearch = localStorage.getItem("blog-search");

    if (savedSearch) {
        $("#search").val(savedSearch);
        filterListItems();
    }
}

$("#search").on("input", handleSearchInput);

restoreSearch();