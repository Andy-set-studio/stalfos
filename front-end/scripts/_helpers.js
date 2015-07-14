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
}($));