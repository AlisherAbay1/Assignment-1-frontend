$("#faq-search").on("input", function(e) {

    $("#faq-cards mark").contents().unwrap();
    
    const input_value = $(this).val().toLowerCase();
    
    if (input_value === "") {
        return;
    }

    $("#faq-cards").find("p, h1, h2, h3").filter(function() {
        return $(this).text().toLowerCase().includes(input_value)
    }).html(function(i, value) {
        return value.replace(new RegExp(input_value, "ig"), "<mark>$&</mark>")
    }) 
})