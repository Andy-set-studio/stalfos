(function($) {

	$.fn.siteHead = function() {
		var elem = $(this),
			settings = {
				activeClass: 'is-active'
			};

		var init = function() {

			settings = $.extend(true, {}, settings, elem.parseSettings());

			// This is a stub module. Go ahead and delete it if you don't need it
		};

		init();
		return this;
	};

}($));