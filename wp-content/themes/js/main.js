jQuery(document).ready(function () {


    jQuery("#closeapp").click(function() {
         jQuery("#mobileapp").hide();
        jQuery.cookie("noneedapp", 1 , { expires: 7, path: '/'});
    });

    jQuery("#appdownload").click(function() {
         jQuery("#mobileapp").hide();
        jQuery.cookie("noneedapp", 1 , { expires: 7, path: '/'});

    });



    jQuery(".js_scroll").bind("click", function (event) {
        event.preventDefault();
        var id = jQuery(this).attr('href'),
            top = jQuery(id).offset().top;
        jQuery('body,html').animate({scrollTop: top}, 500);
    });

    jQuery(".js-menu-item").bind("click", function () {
        var id = jQuery(this).find("a").attr('href'),
            top = jQuery(id).offset().top;
        jQuery('body,html').animate({scrollTop: top}, 500);
    });

    /*Появление больших меток в вертикальном скроллбаре */

    var top = 0,
        navTopPoint = top + parseInt(jQuery("#header").offset().top + 520),
        headerTextPoint = top + parseInt(jQuery("#header").offset().top + 150);

        jQuery(window).bind('scroll', function () {
        var scrolled = jQuery(window).scrollTop();
            if ((scrolled > headerTextPoint)) {
               jQuery(".header-content").hide();
            }

            if ((scrolled < headerTextPoint)) {
                jQuery(".header-content").show();
            }
    });

    /*Изменение вида tоp-nav главной страницы*/

    jQuery(window).bind('scroll', function () {
        var scrolled = jQuery(window).scrollTop();

        with (jQuery(".page-id-1240")) {

            if (scrolled >= navTopPoint) {

                jQuery(".logo__link").removeClass("logo__link_non-active").addClass("logo__link_active");
                jQuery(".location__icon").removeClass("location__icon_non-active").addClass("location__icon_active");
                jQuery(".top_nav .top_nav_wrapper").removeClass("top_nav_non-active").addClass("top_nav_active");
                jQuery(".top_nav_wrapper > ul > li > a").removeClass("top_nav__link_non-active").addClass("top_nav__link_active");
                jQuery(".top_nav .icon_text strong").removeClass("icon_text_phone_non-active").addClass("icon_text_phone_active");
                jQuery(".top_nav .icon_text span").removeClass("icon_text_phone-text_non-active").addClass("icon_text_phone-text_active");
                jQuery(".current-city__item").removeClass("current-city__item_non-active").addClass("current-city__item_active");
                jQuery(".social__link_to_inst_small").removeClass("social__link_to_inst_small_non-active").addClass("social__link_to_inst_small_active");
                jQuery(".social__link_to_vk_small").removeClass("social__link_to_vk_small_non-active").addClass("social__link_to_vk_small_active");
                jQuery(".social__link_to_youtube_small").removeClass("social__link_to_youtube_small_non-active").addClass("social__link_to_youtube_small_active");
            }

            if (scrolled < navTopPoint) {
                jQuery(".logo__link").removeClass("logo__link_active").addClass("logo__link_non-active");
                jQuery(".location__icon").removeClass("location__icon_active").addClass("location__icon_non-active");
                jQuery(".top_nav .top_nav_wrapper").removeClass("top_nav_active").addClass("top_nav_non-active");
                jQuery(".top_nav_wrapper > ul > li > a").removeClass("top_nav__link_active").addClass("top_nav__link_non-active");
                jQuery(".top_nav .icon_text strong").removeClass("icon_text_phone_active").addClass("icon_text_phone_non-active");
                jQuery(".top_nav .icon_text span").removeClass("icon_text_phone-text_active").addClass("icon_text_phone-text_non-active");
                jQuery(".current-city__item").removeClass("current-city__item_active").addClass("current-city__item_non-active");
                jQuery(".social__link_to_inst_small").removeClass("social__link_to_inst_small_active").addClass("social__link_to_inst_small_non-active");
                jQuery(".social__link_to_vk_small").removeClass("social__link_to_vk_small_active").addClass("social__link_to_vk_small_non-active");
                jQuery(".social__link_to_youtube_small").removeClass("social__link_to_youtube_small_active").addClass("social__link_to_youtube_small_non-active");
            }
        }
    });

    /*Выбор города*/

    jQuery(".showf-btn").click(function () {
        jQuery('.ouibounce-modal_city').fadeIn(400);
    });

    jQuery(".current-city__item").click(function () {
        jQuery('.ouibounce-modal_city').fadeIn(400);
    });

    jQuery(".popup__cross-btn").click(function () {
        jQuery('.ouibounce-modal_city').fadeOut(400);
    });

    jQuery(".city__item").click(function () {
        jQuery('.ouibounce-modal_city').delay(700).fadeOut(400);
    });

    jQuery(".ouibounce-modal_city").click(function (e) {
        if (jQuery(e.target).closest(".popup").length == 0)
            jQuery(".ouibounce-modal_city").fadeOut(400);
    });

    /*Отображение текущего города*/

    jQuery(".city__item").bind("click", function () {
        var сhosenCityText = jQuery(this).text();
        var currentCity = jQuery(".current-city__item");

        if (!(currentCity.text())) {
            currentCity.append(сhosenCityText).addClass("city_animation");

        } else if (!(currentCity.html() == сhosenCityText)) {
            currentCity.empty().append(сhosenCityText).removeClass("city_animation");
            setTimeout(function () {
                currentCity.addClass("city_animation");
            }, 1);
        } else {

        }
    });

  /*  Popup Instagram

     jQuery('.ouibounce-modal_instagram').delay(2500).fadeIn(250);

     jQuery(".popup-instagram__cross").click(function (event) {
     event.preventDefault();
     jQuery('.ouibounce-modal_instagram').fadeOut(200);
     });

     jQuery(this).keydown(function (event) {
     if (event.which == 27)
     jQuery('.ouibounce-modal_instagram').fadeOut(200);
     });*/

/*    Блок Карта Slidedown*/

    jQuery(".studios__slide").bind('click', function () {
        if (jQuery("div").is(".up")) {
            jQuery(".chosen-studio").fadeOut(50);
            jQuery(".studios-info_map").delay(70).animate({"height": "105px", "margin-top": "470px"}, 220)
                .animate({"height": "560px", "margin-top": "0px"}, "250", function () {
                    jQuery(".studios-info").delay(50).fadeIn("slow");
                    jQuery(".studios-salon_small").delay(170).fadeIn("slow");
                });
            jQuery(this).removeClass("up").addClass("down");
        } else {
            jQuery(".studios-info").fadeOut(50);
            jQuery(".studios-salon_small").fadeOut(50);
            jQuery(".studios-info_map").delay(70).animate({"height": "105px", "margin-top": "470px"}, 220)
                .animate({"height": "140px", "margin-top": "450px"}, "250", function () {
                    jQuery(".chosen-studio").fadeIn(300);
                });
            jQuery(this).addClass("up").removeClass("down");
        }
    });

    /*Initial Video Play*/

    setTimeout(function () {
        jQuery(".video")[0].play();
    }, 2500);


    /*Подгрузка контента страницы в зависимости от города*/

    /*  var target = document.querySelector('.target');
     jQuery(".text_block").appendChild(target);*/

    /*
     function loadContent() {
     jQuery(".text_block").load("/wp-content/themes/cinderella/html/nsk.html #target");
     }

     loadContent();
     */

    /*Формирование страницы услуги динамически*/


    /*Геолокация

     navigator.geolocation.getCurrentPosition(
     function(position) {
     alert('Позиция пользователя: ' +
     position.coords.latitude + ", " + position.coords.longitude);
     }
     );*/


});

