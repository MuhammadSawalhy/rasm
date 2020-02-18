/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import GraphSettings from './GraphSetting/GraphSettings.js';
import Coordinates from './Coordinates.js';
import Canvas from './Canvas.js';
export default class Sketch {

    constructor(canvas) {
        this.gs = new GraphSettings(this, canvas.clientWidth, canvas.clientHeight);
        this.coor = new Coordinates(this.gs);
        this.canvas = new Canvas({ canvas: canvas});
        this.subcanvas = new Canvas();
        this.childsCanvas = new Canvas();
        // this.canvas.ctx.textAlign = 'left';
        // this.subcanvas.ctx.textAlign = 'left';
        // this.childsCanvas.ctx.textAlign = 'left';

        this.children = new Map();
        this.focusedObject = undefined;
    }

    appendChild(cihld) {
        if (!child.id) throw new Error('Your sketch child shoyld have had an id :\'(');
        this.children.set(child.id, child);
    }

    getChildById(id) {
        // for (let index = 0; index < this.children.length; index++) {
        //     if (this.children[index].id === id) return { child, index };
        //     continue;
        // }
        return this.children.get(id);
    }

    update() {
        if (this.canvas) {
            this.canvas.resize(this.gs.width, this.gs.height);
            this.childsCanvas.resize(this.gs.width, this.gs.height);
            this.childsCanvas.clear();
            for (let child of this.children.values()) {
                if (child && child.drawable) {
                    child.value.draw(this.childsCanvas);
                }
            }
            this.draw();
        }
    }

    draw() {
        this.canvas.clear(this.coor.coorSettings.background.toString());
        this.coor.draw(this.canvas);
        this.canvas.ctx.drawImage(this.childsCanvas.elt, 0, 0);
    }

}