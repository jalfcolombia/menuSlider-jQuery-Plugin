jQuery.sliderMenu = function (menu) {
  menu.button = '#' + menu.button;
  menu.menu = '#' + menu.menu;
  if (typeof menu.close != 'undefined') {
    menu.close = '#' + menu.close;
  }

  $(menu.menu).addClass('slider-menu slider-menu-' + menu.direction);

  $(menu.button).click(function () {
    $(menu.menu).addClass('slider-menu-active slider-menu-active-' + menu.direction);
    $('body').addClass('slider-menu-active-body');
    $('body').append('<div id="screenBlack"></div>');

    $('#screenBlack').click(function () {
      $.sliderMenuOff(menu.menu, menu.direction);
    });

    switch (menu.direction) {
      case 'left':
        options = {swipeLeft: function (event, direction, distance, duration, fingerCount) {
            $.sliderMenuOff(menu.menu, menu.direction);
          }
        };
        break;
      case 'right':
        options = {swipeRight: function (event, direction, distance, duration, fingerCount) {
            $.sliderMenuOff(menu.menu, menu.direction);
          }
        };
        break;
    }

    $('body').swipe(options);

    if (typeof menu.close != 'undefined') {
      $(menu.close).click(function () {
        $.sliderMenuOff(menu.menu, menu.direction);
      });
    }
  });
}

jQuery.sliderMenuOff = function (menu, direction) {
  $(menu).removeClass('slider-menu-active slider-menu-active-' + direction);
  $('#screenBlack').css({
    opacity: 0
  });
  setTimeout(function () {
    $('#screenBlack').remove();
  }, 500);
  $('body').removeClass('slider-menu-active-body');
}