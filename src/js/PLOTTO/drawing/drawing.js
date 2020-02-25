import Canvas from './../Canvas.js';
export class pen{
    constructor(color, weight = 1, style = 'solid'){
        this.color = color;
        this.weight = weight;
        this.style = style;
    }
    setup(canvasORctx) {
        canvasORctx = canvasORctx instanceof Canvas ? canvasORctx.ctx : canvasORctx;
        canvasORctx.strokeStyle = this.color.toString();
        canvasORctx.lineWidth = this.weight;
    }
}

export class color{
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    brightness() {
        let num = this.r / 255;
        let num2 = this.g / 255;
        let num3 = this.b / 255;
        let num4 = num;
        let num5 = num;
        if (num2 > num4)
            num4 = num2;
        if (num3 > num4)
            num4 = num3;
        if (num2 < num5)
            num5 = num2;
        if (num3 < num5)
            num5 = num3;
        return ((num4 + num5) / 2);
    }

    hue() {
        if ((this.r == this.g) && (this.g == this.b))
            return 0;
        let num = this.r / 255;
        let num2 = this.g / 255;
        let num3 = this.b / 255;
        let num7 = 0;
        let num4 = num;
        let num5 = num;
        if (num2 > num4)
            num4 = num2;
        if (num3 > num4)
            num4 = num3;
        if (num2 < num5)
            num5 = num2;
        if (num3 < num5)
            num5 = num3;
        let num6 = num4 - num5;
        if (num == num4)
            num7 = (num2 - num3) / num6;
        else if (num2 == num4)
            num7 = 2 + ((num3 - num) / num6);
        else if (num3 == num4)
            num7 = 4 + ((num - num2) / num6);
        num7 *= 60;
        if (num7 < 0)
            num7 += 360;
        return num7;
    }

    saturation() {
        let num = this.r / 255;
        let num2 = this.g / 255;
        let num3 = this.b / 255;
        let num7 = 0;
        let num4 = num;
        let num5 = num;
        if (num2 > num4)
            num4 = num2;
        if (num3 > num4)
            num4 = num3;
        if (num2 < num5)
            num5 = num2;
        if (num3 < num5)
            num5 = num3;
        if (num4 == num5)
            return num7;
        let num6 = (num4 + num5) / 2;
        if (num6 <= 0.5)
            return ((num4 - num5) / (num4 + num5));
        return ((num4 - num5) / ((2 - num4) - num5));
    }

    isDark() {
        if (this.brightness() > 0.40) {
            return false;
        }
        else {
            return true;
        }
    }

    toArray() {
        return [this.r, this.g, this.b, this.a];
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

/**
 * our color is an object has r g b as properties. {r: num, g: num, b: num}
 */
export class colorPackage{
    static brightness(color) {
        let num = color.r / 255;
        let num2 = color.g / 255;
        let num3 = color.b / 255;
        let num4 = num;
        let num5 = num;
        if (num2 > num4)
            num4 = num2;
        if (num3 > num4)
            num4 = num3;
        if (num2 < num5)
            num5 = num2;
        if (num3 < num5)
            num5 = num3;
        return ((num4 + num5) / 2);
    }

    static hue(color) {
        if ((color.r == color.g) && (color.g == color.b))
            return 0;
        let num = color.r / 255;
        let num2 = color.g / 255;
        let num3 = color.b / 255;
        let num7 = 0;
        let num4 = num;
        let num5 = num;
        if (num2 > num4)
            num4 = num2;
        if (num3 > num4)
            num4 = num3;
        if (num2 < num5)
            num5 = num2;
        if (num3 < num5)
            num5 = num3;
        let num6 = num4 - num5;
        if (num == num4)
            num7 = (num2 - num3) / num6;
        else if (num2 == num4)
            num7 = 2 + ((num3 - num) / num6);
        else if (num3 == num4)
            num7 = 4 + ((num - num2) / num6);
        num7 *= 60;
        if (num7 < 0)
        num7 += 360;
        return num7;
    }

    static saturation(color) {
        let num = color.r / 255;
        let num2 = color.g / 255;
        let num3 = color.b / 255;
        let num7 = 0;
        let num4 = num;
        let num5 = num;
        if (num2 > num4)
            num4 = num2;
        if (num3 > num4)
            num4 = num3;
        if (num2 < num5)
            num5 = num2;
        if (num3 < num5)
            num5 = num3;
        if (num4 == num5)
            return num7;
        let num6 = (num4 + num5) / 2;
        if (num6 <= 0.5)
            return ((num4 - num5) / (num4 + num5));
        return ((num4 - num5) / ((2 - num4) - num5));
    }
    static isDark(color) {
        if (colorPackage.brightness(color) > 0.35) {
            return false;
        }
        else {
            return true;
        }
    }

    static randomColor() {
        return new color(MathPackage.Core.random(255), MathPackage.Core.random(255),  MathPackage.Core.random(255));
    }

    static randomDarkColor() {
        let c = colorPackage.randomColor();
        do { c = colorPackage.randomColor(); } while (!c.isDark());
        return c;
    }

    static randomLightColor() {
        let c = colorPackage.randomColor();
        do { c = colorPackage.randomColor(); } while (c.isDark());
        return c;
    }
}

export function measureString(txt) {
    return canvas.elt.getContext("2d").measureText(txt);
}