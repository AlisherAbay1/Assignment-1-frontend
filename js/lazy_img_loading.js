$(window).on('scroll', function () {
  const viewBottom = $(window).scrollTop() + $(window).height();

  $('img.lazy').each(function () {
    if ($(this).offset().top < viewBottom + 100) {
      $(this).attr('src', $(this).data('src')).removeClass('lazy');
    }
  }); 
}).trigger('scroll');