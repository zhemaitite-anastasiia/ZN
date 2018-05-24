jQuery(document).ready(function () {
    /*Выбор города*/

    jQuery(".showf-btn").click(function () {

        jQuery('#isyoutown').fadeOut(200);
        jQuery('#isyoutown2').fadeOut(200);
        jQuery('.ouibounce-modal_city').delay( 200 ).fadeIn(400);
    });

    var cookiecity = jQuery.cookie("city");
    console.log("COOKIE "+cookiecity);
    if (typeof(cookiecity) == "undefined") {
        jQuery('#isyoutown').fadeIn(200);
        jQuery('#isyoutown2').fadeIn(200);
    }
    jQuery("#cityyes").click(function () {
        jQuery('#isyoutown').fadeOut(200);
        var curcity = jQuery('#curcity').text();
        jQuery.cookie("city", curcity , { expires: 7, path: '/'});
        var cookieValue = jQuery.cookie("city");
        console.log(cookieValue);
    });

    jQuery("#cityyes2").click(function () {
        jQuery('#isyoutown2').fadeOut(200);
        var curcity = jQuery('#curcity').text();
        jQuery.cookie("city", curcity , { expires: 7, path: '/'});
        var cookieValue = jQuery.cookie("city");
        console.log(cookieValue);
    });

        jQuery("#cityno").click(function () {
        jQuery('#isyoutown').fadeOut(200);
            jQuery('#isyoutown2').fadeOut(200);
        jQuery('.ouibounce-modal_city').delay( 200 ).fadeIn(400);
    });

    jQuery("#cityno2").click(function () {
        jQuery('#isyoutown').fadeOut(200);
        jQuery('#isyoutown2').fadeOut(200);
        jQuery('.ouibounce-modal_city').delay( 200 ).fadeIn(400);
    });

    jQuery(".current-city__item").click(function () {
        jQuery('.ouibounce-modal_city').fadeIn(400);
    });

    jQuery(".studios__current-city").click(function () {
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

});





