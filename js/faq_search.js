$("#faq-search").on("input", function(e) {

    $("#faq-cards mark").contents().unwrap();
    
    const inputValue = $(this).val().toLowerCase();
    
    if (inputValue === "") {
        return;
    }

    $("#faq-cards").find("p, h1, h2, h3").filter(function() {
        return $(this).text().toLowerCase().includes(inputValue)
    }).html(function(i, value) {
        return value.replace(new RegExp(inputValue, "ig"), "<mark>$&</mark>")
    }) 
})