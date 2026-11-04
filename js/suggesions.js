var items = ["HTML", "CSS", "JavaScript", "jQuery", "React", "Vue", "Angular", "Node.js", "PHP", "Python", "Java", "C#", "MySQL", "MongoDB"];

$(".autocomplete input").on("input", function() {
    const value = $(this).val().toLowerCase();
    const $box = $(".autocomplete #suggestions");

    $box.empty()

    if (value === "") {
        $box.hide();
        return;
    }

    var matches = items.filter(function(item) {
        return item.toLowerCase().includes(value)
    })

    matches.forEach(function(item) {
        $box.append(
            "<div>" + item + "</div>"
        )
    })

    $box.toggle(matches.length > 0)
}) 

$("#suggestions").on("click", "div", function () {
    $(".autocomplete input").val($(this).text());
    $("#suggestions").hide();
});