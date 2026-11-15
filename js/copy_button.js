$(".copy-button").on("click", function() {
    let article = $(this).closest("article");
    let button = $(this);

    let text = article.find("h2, p, li").map(function() {
        return $(this).text().trim();
    }).get().join("\n");

    button.html('<i class="bi bi-check"></i>');
    navigator.clipboard.writeText(text);
    $("#copy-notification").css("display", "flex").hide().fadeIn(500);

    setTimeout(function() {
        button.text('Copy');
        $("#copy-notification").fadeOut(500);
    }, 2000);
})