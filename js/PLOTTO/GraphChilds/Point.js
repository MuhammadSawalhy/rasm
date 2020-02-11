import GraphChild from './GraphChild.js';

export default class Point extends GraphChild {
    // color is rgb
    // gs stands for graphSetting
    constructor(gs, name, x, y, _pen = new drawing.pen(new drawing.color(0, 0, 255), 10, 'solid')) {
        super(gs, name, _pen);
        this.x = new expression(x);
        this.y = new expression(y);
    }

    static from(str, gs) {
        if (str) {
            let p;
            let regex = /\s*\(\s*(.+)\s*,\s*(.+)\s*\)\s*/;
            str.replace(regex, (match, group1, group2) => {
                if (match === str) {
                    p = new Point(null, '', group1, group2);
                    p.gs = gs;
                }
            });
            if (!p)
                console.error('error while trying to add a point: ' + str);
            else
                return p;
        }
        else
            console.error('your str is empty :(');
    }

    async draw(canvas) {
        canvas.rectMode(CENTER);
        switch (this.pen.style) {
            case 'solid':
                canvas.strokeWeight(2);
                canvas.stroke(200);
                canvas.fill(...(this.pen.color.toArray().splice(0, 3)), 150);
                break;
            case 'shallow':
                canvas.strokeWeight(3);
                canvas.stroke(...this.pen.color.toArray());
                canvas.fill(...(this.pen.color.toArray().splice(0, 3)), 50);
                break;
        }
        let p = this.gs.coorTOpx(this.x.eval(), this.y.eval());
        canvas.rect(p.x, p.y, this.pen.weight, this.pen.weight, 3);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

}