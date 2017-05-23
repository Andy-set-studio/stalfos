(function($) {

    $.fn.typeSet = function() {

        var elem = $(this),
            settings = {
                ignoreClass: 'js-typeset__ignore',
                processedClass: 'js-typeset__processed',
                minWords: 4
            };

        var init = function() {

            // Split words/tags into array
            var textItems = elem.html().trim().replace(/&nbsp;/g, '').split(/ (?=[^>]*(?:<|$))/),

                // Define what we want to process by giving a key value. Key being human readable and value being target index
                filters = {
                    orphans: 0,
                    widows: (textItems.length - 2)
                },

                // Store the result
                result = '';

            // Ignore this element if class set
            if(elem.hasClass(settings.ignoreClass) || elem.parents().hasClass(settings.ignoreClass)) {
                return;
            }

            // Ingnore if already processed
            if(elem.hasClass(settings.processedClass)) {
                return;
            }

            // Check there's enough words to play with
            if(textItems.length >= settings.minWords) {

                // Loop each filter
                for(var filterKey in filters) {

                    // Double check we have an index
                    if(!filters.hasOwnProperty(filterKey)) {
                        continue;
                    }

                    // Find the target word for this filter
                    var targetWord = textItems[filters[filterKey]];

                    // Stick a no break space to the end of the word and replace the instance in the array
                    textItems[filters[filterKey]] = targetWord + '&nbsp;';
                }

                // Join the words together with a space
                result = textItems.join(' ');
                result = result.replace(/&nbsp; /g, '&nbsp;');

                // Set the result
                elem.html(result);
                elem.addClass(settings.processedClass);
            }

        };

        init();
        return this;
    };

}($));
