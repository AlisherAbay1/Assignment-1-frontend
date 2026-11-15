const items = ["HTML", "CSS", "JavaScript", "jQuery", "React", "Vue", "Angular", "Node.js", "PHP", "Python", "Java", "C#", "MySQL", "MongoDB"];

function handleAutocomplete() {
    const value = $(this).val().toLowerCase();
    const $box = $(".autocomplete #suggestions");

    $box.empty();

    if (value === "") {
        $box.hide();
        return;
    }

    const matches = items.filter(item => item.toLowerCase().includes(value));

    matches.forEach(appendSuggestion);

    $box.toggle(matches.length > 0);
}

function appendSuggestion(item) {
    $("#suggestions").append("<div>" + item + "</div>");
}

function selectSuggestion() {
    $(".autocomplete input").val($(this).text());
    $("#suggestions").hide();
}

$(".autocomplete input").on("input", handleAutocomplete);
$("#suggestions").on("click", "div", selectSuggestion);