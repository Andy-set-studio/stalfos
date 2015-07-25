(function($) {

	$.fn.icon = function(options) {
		var elem = $(this),
			icon = '',
			settings = {
				mode: 'default'
			};

		var init = function() {

			settings = $.extend(true, {}, settings, options);

			if(elem.attr('data-icon')) {

				icon = elem.attr('data-icon');
				
				if(site_icons.hasOwnProperty(icon)) {

					switch(settings.mode) {
						case 'default':
						default:
							elem.html(site_icons[icon]);
							break;
						case 'append':
							elem.append(site_icons[icon]);
							break;
					}
					
				}
			}
		};

		init();
		return this;
	};

}($));