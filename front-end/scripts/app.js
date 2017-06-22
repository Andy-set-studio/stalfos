/*------------------------------------*\
    MODULES
\*------------------------------------*/
import TypeSet from './modules/typeset';
import Sample from './modules/sample';

/*------------------------------------*\
    APP DELEGATE
\*------------------------------------*/
const app = {
    
    init() {
        
        // Run Sample module
        let sampleInstance = new Sample();

        sampleInstance.load();

        // Remove the no-js class
        document.documentElement.classList.remove('no-js');

        let typesetInstance = new TypeSet();

        // Run the initial typeset on the whole rendered document
        typesetInstance.init(document.body);
    }
};

// Launch
app.init();