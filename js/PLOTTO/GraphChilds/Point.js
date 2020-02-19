
import GraphChild from './GraphChild.js';
export default class Point extends GraphChild {
    // color is rgb
    // gs stands for graphSetting
    constructor(options) {
        options.pen = options.pen || new drawing.pen(new drawing.color(0, 0, 255), 10);
        
        //#region 
        let propName;

        propName = 'x';
        if (!options[propName]) {
            throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + propName + ' property, or it is falsy value');
        }

        propName = 'y';
        if (!options[propName]) {
            throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + propName + ' property, or it is falsy value');
        }
        //#endregion

        super(options);
        this.x = this.x instanceof Function ? this.x : MathPackage.Parser.maximaTOjsFunction(this.x);
        this.y = this.y instanceof Function ? this.y : MathPackage.Parser.maximaTOjsFunction(this.y);
    }

    static fromString(str, sketch) {
        if (str) {
            let p;
            let regex = /^\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)\s*$/;
            str.replace(regex, (match, x, y) => {
                p = new Point({ sketch, x, y });
            });
            if (!p)
                throw new Error('error while trying to add a point: ' + str);
            else
                return p;
        }
        else
            throw new Error('your str is empty :\'(');
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
