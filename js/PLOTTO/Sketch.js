/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import GraphSettings from './GraphSetting/GraphSettings.js';
import Coordinates from './Coordinates.js';

export default class Sketch {

    constructor() {
        this.gs = new GraphSettings(this, width, height);
        this.coor = new Coordinates(this.gs);
        this.canvas = createGraphics(this.gs.width, this.gs.height);
        this.subcanvas = createGraphics(this.gs.width, this.gs.height);
        this.childsCanvas = createGraphics(this.gs.width, this.gs.height);
        this.canvas.textAlign(LEFT, TOP);
        this.subcanvas.textAlign(LEFT, TOP);
        this.childsCanvas.textAlign(LEFT, TOP);

        this.children = [];
        this.focusedObject = undefined;
    }

    appendChild(obj) {
        this.objs.push(obj);
        this.update();
    }

    getChildById(id) {
        for (let index = 0; index < this.children.length; index++) {
            if (this.children[index].id === id) return { child, index };
            continue;
        }
    }

    update() {
        if (this.canvas) {
            this.canvas.resizeCanvas(this.gs.width, this.gs.height);
            this.childsCanvas.resizeCanvas(this.gs.width, this.gs.height);
            this.childsCanvas.clear();
            for (let child of this.children) {
                if (child.drawable) {
                    child.value.draw(this.childsCanvas);
                }
            }
            this.draw();
        }
    }

    draw() {
        this.canvas.background(...this.coor.coorSettings.background.toArray());
        this.coor.draw(this.canvas);
        this.canvas.image(this.childsCanvas, 0, 0);
        image(this.canvas, 0, 0);
    }

};