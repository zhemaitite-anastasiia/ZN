jQuery(function ($) {
	"use strict";

	function set_safari_fix() {
		var ua = navigator.userAgent, vendor = navigator.vendor;
		if (ua.search(/Safari/) != -1 && vendor.search(/Apple/) != -1) {
			if (jQuery('.gt3_gallery_wrapper.circle').length || jQuery('.gt3_gallery_wrapper.square').length) {
				jQuery('.gallery-icon img').addClass('safari');
			}
		}
		;
	}
	var array_type = new Array('rectangle','square','circle','masonry');

	function gt3pg_resize_image() {
		if (gt3_gallery.length) {
			gt3_gallery.each(function () {
                if ( $.inArray($(this).data('type'),array_type) === -1 ){
					return true;
				}
				var type = $(this).data('type');

				$(this).find('.gt3pg_img_wrap').each(function () {
					var w_i = Math.ceil($(this).outerWidth());
					var h_i = w_i;
					switch (type) {
						case 'rectangle':
							h_i = Math.ceil(w_i * 0.75);
							break;
						case 'masonry' :
							h_i = (w_i * $(this).data('height') ) / $(this).data('width');
						default:
							break;
					}
					h_i = Math.ceil(h_i);
					if (h_i%2 === 1) h_i++;
					$(this).css('height',h_i);
				});
				if (type === 'masonry') {
					jQuery(this).isotope({
						itemSelector: '.gt3pg_element'
					});
				}
			});
		}
	}

	function gt3pg_slider_resize() {
		var sliders = $('.gt3_gallery_type_slider');
		if (sliders.length) {
			var width = 0;
			sliders.each(function () {
				width = $(this).width();
				$(this).height(Math.ceil(width*0.5625));
				$(this).removeClass('gt3pg_width_400').removeClass('gt3pg_width_520').removeClass('gt3pg_width_900').removeClass('gt3pg_width_1024')
				if (width <= 400) {
					$(this).addClass('gt3pg_width_400');
				}
				if (width <= 520) {
					$(this).addClass('gt3pg_width_520');
				}
				if (width <= 900) {
					$(this).addClass('gt3pg_width_900');
				}
				if (width <= 1024) {
					$(this).addClass('gt3pg_width_1024');
				}
			})
		}
	}

	$(window).on('resize ready', function () {
		gt3pg_resize_image();
		gt3pg_slider_resize();
	})

	set_safari_fix();
	setTimeout(function(){
		gt3pg_resize_image();
		gt3pg_slider_resize();
	},300)


	jQuery('html').addClass('gt3_swipe_box');

	var gt3_gallery = $('.gt3pg_photo_gallery');

	gt3pg_resize_image();
	gt3pg_slider_resize();

	jQuery('.gt3pg_gallery-item.gt3pg_element').each(function (n) {
		jQuery(this).delay(n * 150).fadeTo(400, 1);
	});

});

