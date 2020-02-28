import { generateName } from './../global.js';
export default class GraphChild {

    constructor(options) {
        this.checkOptions(options);

        if (!options.id) {
            options.id = generateName();
        }

        options.handlers = options.handlers || {};
        options.renderable = options.hasOwnProperty('renderable') ? options.renderable : true;
        
        this.sketch = options.sketch; /// avoid error when defining the sketch after the id
        Object.assign(this, options);
        this.gs = this.sketch.gs;
        this.gs.childrenIDs.push(options.id);

    }
    checkOptions(options) {
        let propName;
        if (!options.sketch) {
            propName = 'sketch';
            throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + propName + ' property, or it is falsy value');
        }
    }   
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = this.sketch.gs.checkId(value);
    }

    /**
     * methods are here
     */

    render(canvas, handlerOptions = []) {
        if (this.handlers.onrender) {
            this.handlers.onrender(...handlerOptions);
        }
    }

    remove(handlerArgs) {
        this.sketch.children.delete(this.id);
        this.gs.childrenIDs = this.gs.childrenIDs.filter(a => a !== this.id);
        if (this.handlers.remove) this.handlers.remove(...handlerArgs);
    }
    
    error(e) {
        this.handlers.onerror(e);
    }
}
