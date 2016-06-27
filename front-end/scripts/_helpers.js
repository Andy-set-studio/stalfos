(function($) {
	
	/*------------------------------------*\
	    ANY
	    
	    This will return true if there are any items 
	    in a jQuery collection. 
	    
	    EXAMPLE
	    
	    var items = $(".item");
	    
	    if(items.any()) {
			console.log("YAY!");
		}
	\*------------------------------------*/
	
	$.fn.any = function() {
		return $(this).length > 0;
	}


    /*------------------------------------*\
        PARSE SETTINGS
        
        This will try and parse inline json settings as an object literal to pass into a plugin
        
        EXAMPLE
        
        <div class="item" data-settings='{"setting1": true}'></div>

        var item = $(".item"),
            settings = item.parseSettings();
        
        console.log(settings.setting1);
        
        returns true;

    \*------------------------------------*/
    $.fn.parseSettings = function () {

        var elem = $(this),
            response = {};

        if (elem.attr("data-settings")) {

            try {
                response = $.parseJSON(elem.attr("data-settings"));
            }
            catch (ex) {
                console.log("Check input data. Message: " + ex.message);
                return {};
            }
        }

        return response;
    };
    

    /*------------------------------------*\
        AJAX REQUEST
        
        A nice Ajax wrapper method
        
        EXAMPLE
        
        $.ajaxRequest({
            url: "/test",
            callback(function(data, isSuccess) {
                
                if(isSuccess) {
                    alert('All the data is WINNING');
                }
            });
        });

    \*------------------------------------*/
	$.extend({
		ajaxRequest: function(options) {
			
			var settings = {
                dataType: "application/json",
                url: "/",
                data: {},
                method: "GET",
                callback: null
			};
			
			var init = function() {
				
				settings = $.extend(true, {}, settings, options);

				$.ajax({
					contentType: settings.dataType, 
					url: settings.url,
					data: settings.data,
					type: settings.method,
					success: function(responseData) {
						tryCallback(responseData);
					},
					error: function(responseData) {
						tryCallback(responseData);
					}
				});
			},
			
			tryCallback = function(responseData) {
				
				if(typeof(settings.callback) == "function") {
					settings.callback(responseData, (responseData != null ? (responseData.status == 200 ? false : true) : true));
				}
			}
			
			init();
			
		}
	});

    /*------------------------------------*\
        AJAX HTML

        A wrapper to ajaxRequest for simple HTML getting

        EXAMPLE

        $.ajaxHtml('http://google.com', function(data) {
			// do stuff
		});

    \*------------------------------------*/
	$.extend({
		ajaxHtml: function(url, callback) {
			$.ajaxRequest({
				dataType: "text/html",
				url: url,
				callback: callback
			});
		}
	});


    /*------------------------------------*\
        QUERY STRING

        A helper to work with query strings

        toJson: take the current query string and return it as json
        fromJson: takes a json object and converts into a query string

    \*------------------------------------*/
    $.extend({
    	queryString: {

    		toJson: function(ignoreKeys) {
				var response = {},
					data = window.location.href.toString().toLowerCase(),
					splitData = [];

				// Return empty object if undefined
				if(typeof(data) == 'undefined') {
					return {};
				}

				// Return empty object if empty
				if(data.length == 0) {
					return {};
				}

				// Set empty array if ignore keys not set
				if(typeof(ignoreKeys) == 'undefined') {
					ignoreKeys = [];
				}

				// Split query string into array
				splitData = data.split('?')[1].split('&');

				// Loop and create key value pairs
				for (var i = 0, l = splitData.length; i < l; i++) {
				    var param = splitData[i].split('=');
				    response[param[0]] = param[1];
				}

				// Check ignore keys length
				if(ignoreKeys.length > 0) {

					// Loop each one and delete if exists
					$.each(ignoreKeys, function(i, val) {

						if(response.hasOwnProperty(val)) {
							delete response[val];
						}
					});

				}

				return response;
    		},

    		fromJson: function(data) {
    			return '?' + $.param(data).replace('?', '&');
    		}
    	}
    });
	
	
    /*------------------------------------*\
        ESC
        
        A useful little wrapper for the escape key press event
        
        EXAMPLE
        
		$.esc({
			callback: function(evt) {
				
				// Close your modal or whatever. Accessibility FTW
			}
		});

    \*------------------------------------*/
	$.extend({
		esc: function(options) {
			
			var settings = {
				callback: null
			}
			
			settings = $.extend(true, {}, settings, options);
			
			if(typeof(settings.callback) == 'function') {
				
				$(document).keyup(function(evt) {
					
					// escape key maps to keycode `27`
					if (evt.keyCode == 27) { 
						
						// run callback and pass the event over
						settings.callback(evt);
					}
				});	
			}

		}
	});

	/*------------------------------------*\
        GET BREAKPOINT

		Returns the current CSS breakpoint as defined in global.scss
	\*------------------------------------*/
	$.extend({
		getBreakpoint: function() {
			return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
		}
	});

    /*------------------------------------*\
        CHANGE EVENT

        A helper to return the correct 'change' event for an element

        EXAMPLE

        var event = $('.item').changeEvent();

    \*------------------------------------*/
    $.fn.changeEvent = function() {

    	var elem = $(this),
    		response = 'change';

			// Work out what the change event will be, based on input type
			switch(elem.prop('tagName').toString().toLowerCase()) {
				case 'input':

					if(elem.attr('type') != 'checkbox' && elem.attr('type') != 'radio') {
						response = 'input';
					}

					break;
			}

		return response;
    };
}($));

// TAKEN FROM David Walsh blog - http://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};