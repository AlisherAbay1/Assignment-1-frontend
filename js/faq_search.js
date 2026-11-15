function removeHighlights() {
    $("#faq-cards mark").contents().unwrap();
}

function filterFaqCards() {
    const inputValue = $(this).val().toLowerCase();

    removeHighlights();

    if (inputValue === "") {
        return;
    }

    $("#faq-cards").find("p, h1, h2, h3").filter(matchesSearch).html(highlightMatches);
}

function matchesSearch() {
    const inputValue = $("#faq-search").val().toLowerCase();

    return $(this).text().toLowerCase().includes(inputValue);
}

function highlightMatches(i, value) {
    const inputValue = $("#faq-search").val();

    return value.replace(new RegExp(inputValue, "ig"), "<mark>$&</mark>");
}

$("#faq-search").on("input", filterFaqCards);