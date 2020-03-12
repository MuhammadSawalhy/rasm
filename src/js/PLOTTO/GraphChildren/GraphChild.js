import { generateName } from './../global.js';
export default class GraphChild {

    /**
     * @param {*} options 
     * include these ptoperties: 
     * 1. sketch
     * 2. id
     * 3. [pen] ::: for drawable children that will be drawn in the canvas
     * 4. [handlers] ::: { 
     *      onchange ::: for the silder,
     *      onupdate :: updating the drawing object that will be useing in the rendering process,
     *      ondrender::: rendering the graphics object coming from the latest finished updating process,
     *      onerror,
     *      onremove
     *  }
     * 5. [renderable] ::: boolean that indecate wheather or not you want to make this graphChild updated and renderd, if it is false so the this is deactivated
     *
     * 
     */
    constructor(options, callback) {

        this.handlers = options.handlers || {};
        this.renderable = options.hasOwnProperty('renderable') ? options.renderable : true;
        if (options.hasOwnProperty('handlers')) delete options.handlers;
        if (options.hasOwnProperty('renderable')) delete options.renderable;

        if (!options.sketch) {
            throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + 'sketch' + ' property, or it is falsy value');
        } else {
            this.sketch = options.sketch;
            this.gs = this.sketch.gs;
            this.coorManager = this.gs.coorManager;
            delete options.sketch;
        }

        options.id = options.id || generateName();
        Object.assign(this, options);

        if(callback) callback(this);

        this.sketch.children.set(this.id, this); /// this must be at the bottom so that if an error occured, no new graphChild is added
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

    update(canvas, handlerArgs = []) {
        if (this.renderable) {
            try {
                this._update(canvas);
            } catch (e) {
                this.error(e);
            }
        }
        if (this.handlers.onupdate) {
            this.handlers.onupdate(...handlerArgs);
        }
    }

    draw(canvas) {
        if (this.renderable) {
            this._draw(canvas);
        }
    }

    _update(canvas) {

    }

    _draw(canvas) {

    }

    remove(handlerArgs = []) {
        this._remove();
        this.sketch.children.delete(this.id);
        if (this.handlers.onremove) this.handlers.onremove(...handlerArgs);
    }

    _remove() {

    }

    error(e) {
        this.handlers.onerror(e);
    }
}
