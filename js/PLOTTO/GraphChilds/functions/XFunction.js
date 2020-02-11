/****************************************************************/
/****************************************************************/
/****************************************************************/
import GraphChild from './GraphChild.js';

export default class Xfunction extends GraphChild {
   /** 
    * gs stands for graphSetting.
   */
   constructor(gs, name, expr, _pen) {
      let c = gs.sketch.coor.coorSettings.background.isDark() ? colorPackage.randomLightColor() : colorPackage.randomDarkColor();
      c.a = 155;
      _pen = _pen || new drawing.pen(c, 2);
      super(gs, name, _pen);
      this.expression = new Expression(['x'], expr);
   }

   async draw(canvas) {
      canvas.stroke(...this.pen.color.toArray());
      canvas.strokeWeight(this.pen.weight);
      canvas.noFill();
      let p, previousP, midP, continous;
      canvas.beginShape();
      for (let x = this.gs.viewport.xmin; x <= this.gs.viewport.xmax; x += this.gs.drawingStep) {
         p = this.gs.coorTOpx(x, this.eval(x));
         midP = this.gs.coorTOpx(x - this.gs.drawingStep / 2, this.eval(x - this.gs.drawingStep / 2));
         // if valid add new point, unless add the array of point if has more than point
         let valid = !isNaN(p.x) && !isNaN(p.y) &&
            Math.abs(p.x) < width + 100000 && Math.abs(p.y) < height + 100000 &&
            ((continous && (Math.sign(p.y - midP.y) === Math.sign(midP.y - previousP.y) || Math.abs(p.y - previousP.y) / this.gs.drawingStep < 20)) || !continous);
         if (!valid) {
            if (continous) {
               canvas.endShape();
               canvas.beginShape();
               continous = false;
            }
         }
         else {
            canvas.curveVertex(p.x, p.y);
            previousP = { x: p.x, y: p.y };
            continous = true;
         }
      }

      canvas.endShape();

   }

   eval(x) {
      return this.expression.eval(x);
   }

   toString() {
      return this.expression;
   }

}
