/*------------------------------------*\
    TYPSET MODULE

    Remove orphans and widows across 
    pre-determined elements
\*------------------------------------*/
class TypeSet {

    constructor(parent) {
        let self = this;

        // Set some settings
        self.settings = {
            minWords: 4,
            selector: 'h2, h3, h4, p',
            ignoreClass: 'js-typeset__ignore'
        }

        // Either load from root or the passed parent element
        if(typeof(parent) === 'undefined') {
            self.elems = [...document.querySelectorAll(self.settings.selector)];
        }
        else {
            self.elems = [...parent.querySelectorAll(self.settings.selector)];
        }
    }

    init() {
        let self = this;

        self.elems.map((elem) => {

            // Bail out 
            if(elem.classList.contains(self.settings.ignoreClass)) { 
                return false;
            }

            // For building our result string
            let result = '';

            // Split words/tags into array
            const textItems = elem.innerHTML.trim().replace(/&nbsp;/g, '').split(/ (?=[^>]*(?:<|$))/);

            // Our collection of filters to apply
            const filters = [
                {
                    key: 'orphans',
                    index: 0
                },
                {
                    key: 'widows',
                    index: (textItems.length - 2)
                }
            ];

            // Check if the text warrants this module
            if(textItems.length < self.settings.minWords) {
                return;
            }
            
            // Loop each filter
            filters.map((filter) => {

                // Find the target word for this filter
                var targetWord = textItems[filter.index];

                // Stick a no break space to the end of the word and replace the instance in the array
                textItems[filter.index] = targetWord + '&nbsp;';
            });

            // Join the words back together
            result = textItems.join(' ');

            // Replace whitespace after no break spaces
            result = result.replace(/&nbsp; /g, '&nbsp;');
            
            // Set the content of the element with our shiny string
            elem.innerHTML = result;
        });
    }
}

export default TypeSet;