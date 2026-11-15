function updateProgressBar() {
    const pageHeight = $(document).height();
    const scrolledPixels = $(window).scrollTop();
    const visiblePixels = $(window).height();
    const top = $(".progress-track")[0].getBoundingClientRect().top;

    const pageSeenPercent = scrolledPixels / (pageHeight - visiblePixels) * 100;

    if (top <= 5) {
        $(".progress-track").css("visibility", "visible");
    } else {
        $(".progress-track").css("visibility", "hidden");
    }

    $(".progress-bar").css("width", pageSeenPercent + "%");
}

$(window).on("scroll", updateProgressBar).trigger("scroll");