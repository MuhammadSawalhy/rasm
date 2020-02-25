import { generateName } from './../global.js';
export default class GraphChild {

    constructor(options) {
        this.checkOptions(options);

        options.id = options.id || generateName();
        options.handlers = options.handlers || {};
        options.drawable = options.hasOwnProperty('drawable') ? options.drawable : true;

        Object.assign(this, options);
        this.gs = this.sketch.gs;

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
    remove(handlerArgs) {
        this.sketch.children.delete(this.id);
        if (this.handlers.remove) this.handlers.remove(...handlerArgs);
     }
}
