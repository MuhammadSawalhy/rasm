/****************************************************************/
/****************************************************************/
/****************************************************************/
import GraphChild from '../GraphChild.js';
import drawing from '../../drawing/index.js';
import { getJSfunction } from '../../global.js';

export default class Xfunction extends GraphChild {
   /** 
    * gs stands for graphSetting.
   */
   constructor(options) {
      //#region 
      let idExists = options.id;
      if (!options.expr) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + propName + ' property, or it is falsy value');
      }
      if (!options.pen) {
         let c = options.sketch.coor.coorSettings.background.isDark() ? drawing.colorPackage.randomLightColor() : drawing.colorPackage.randomDarkColor();
         c.a = 155;
         options.pen = new drawing.pen(c, 2);
      }
      //#endregion
      
      super(options, (me) => {
         me.expression = getJSfunction(me.expr, ['x'], true);
         me.path = new Path2D();

         if (idExists) {
            Math[me.id] = me.expression;
         }
      });
      
   }

   static fromString(expr, sketch) {
      if (str.replace(/==+/, '').indexOf('=') > -1) throw new Error('there is "=" opertor!');
      return new Xfunction({ expr, sketch });
   }

   async _update(canvas) {

      let p, previousP, midP, continous;
      let path = new Path2D();
      for (let x = this.gs.viewport.xmin; x <= this.gs.viewport.xmax; x += this.gs.drawingStep) {
         p = this.coorManager.coorTOpx(x, this.expression(x));
         midP = this.coorManager.coorTOpx(x - this.gs.drawingStep / 2, this.expression(x - this.gs.drawingStep / 2));
         // if valid add new point, unless add the array of point if has more than point
         let valid = !isNaN(p.x) && !isNaN(p.y) &&
            Math.abs(p.x) < 100000 && Math.abs(p.y) < 100000 &&
            ((continous && (Math.sign(p.y - midP.y) === Math.sign(midP.y - previousP.y) || Math.abs(p.y - previousP.y) / this.gs.drawingStep < 20)) || !continous);
         if (!valid) {
            if (continous) {
               continous = false;
            }
         }
         else {
            if (continous)
               path.lineTo(p.x, p.y);
            else
               path.moveTo(p.x, p.y);

            previousP = { x: p.x, y: p.y };
            continous = true;
         }
      }

      this.path = path;
   }

   _draw(canvas) {
      let ctx = canvas.ctx;
      ctx.strokeStyle = this.pen.color.toString();
      ctx.lineWidth = this.pen.weight;
      ctx.stroke(this.path);
   }

   _remove() {
      delete Math[this.id];
   }

   toString() {
      return this.expression;
   }

}
