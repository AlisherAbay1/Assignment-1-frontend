$(window).on("scroll", function() {
    const page_height = $(document).height();
    const scrolled_pixels = $(window).scrollTop();
    const visible_pixels = $(window).height();
    const top = $(".progress-track")[0].getBoundingClientRect().top;
    console.log(top);

    const page_seen_percent = scrolled_pixels / (page_height - visible_pixels) * 100

    if (top <= 5) {
        $(".progress-track").css("visibility", "visible")
    } else {
        $(".progress-track").css("visibility", "hidden")
    }

    $(".progress-bar").css("width", page_seen_percent + "%")
}).trigger("scroll");