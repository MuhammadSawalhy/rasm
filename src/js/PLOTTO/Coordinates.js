
export default class {

   constructor(gs, coorSettings) {
      this.gs = gs;
      let defaultCoorSettings = {
         type: 'default',
         xUnit: '',
         yUnit: '',

         background: new drawing.color(255, 255, 255, 255),
         font: 'Georgia',

         drawDecimalLines: true,
         drawMainLines: true,
         drawAxisesLines: true,
         drawPolarCircles: false,
         drawPolarLines: false,
         drawPolarAngles: false,
         drawNumbers: true,

         decimalLinesSpace: 5,
         polarCirclesSpace: 5,
         polarLinesAnglesSpace: 6,

         penDecimalLines: null,
         penMainLines: null,
         penXaxis: null,
         penYaxis: null,
         penPolarCircles: null,
         penPolarLines: null,

         autoRefiningOnZoomimg: true
      };

      Object.assign(defaultCoorSettings, {
         color: defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 255) : new drawing.color(50, 50, 50, 1),
         antiBackground: defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 255) : new drawing.color(50, 50, 50, 1),
         drawDecimalLines: !defaultCoorSettings.background.isDark(),
         penDecimalLines: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 30 / 255) : new drawing.color(50, 50, 50, 30 / 255), 1),
         penMainLines: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 100 / 255) : new drawing.color(50, 50, 50, 100 / 255), 1),
         penXaxis: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(255, 255, 255, 150 / 255) : new drawing.color(0, 0, 0, 150 / 255), 2),
         penYaxis: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(255, 255, 255, 150 / 255) : new drawing.color(0, 0, 0, 150 / 255), 2),
         penPolarCircles: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 100 / 255) : new drawing.color(50, 50, 50, 50 / 255), 1),
         penPolarLines: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 100 / 255) : new drawing.color(50, 50, 50, 50 / 255), 1)
      });

      if (coorSettings) {
         this.coorSettings = {};
         Object.assign(this.coorSettings, defaultCoorSettings);
         Object.assign(this.coorSettings, coorSettings);
      } else {
         this.coorSettings = defaultCoorSettings;
      }

   }

   render(ctx) {
      switch (this.coorSettings.type) {
         case 'default':
            this.custom(ctx);
            break;
         case 'rad':
            this.radian(ctx);
            break;
      }
   }

   custom(canvas, a = 1) {

      let start_x, start_y, end_x, end_y;
      start_x = Math.floor(this.gs.viewport.xmin / this.gs.transform.xSpaceValue / a) * a * this.gs.transform.xSpaceValue;
      end_x = Math.ceil(this.gs.viewport.xmax / this.gs.transform.xSpaceValue / a) * a * this.gs.transform.xSpaceValue;
      start_y = Math.floor(this.gs.viewport.ymin / this.gs.transform.ySpaceValue) * this.gs.transform.ySpaceValue;
      end_y = Math.ceil(this.gs.viewport.ymax / this.gs.transform.ySpaceValue) * this.gs.transform.ySpaceValue;

      if (this.coorSettings.drawDecimalLines) {
         canvas.ctx.beginPath();
         this.coorSettings.penDecimalLines.setup(canvas);
         // x
         for (let i = start_x; i <= end_x; i += this.gs.transform.xSpaceValue * a / this.coorSettings.decimalLinesSpace)
            canvas.line(this.gs.xToPixel(i, start_y), this.gs.yToPixel(i, start_y),
               this.gs.xToPixel(i, end_y), this.gs.yToPixel(i, end_y));
         // y
         for (let i = start_y; i <= end_y; i += this.gs.transform.ySpaceValue / this.coorSettings.decimalLinesSpace)
            canvas.line(this.gs.xToPixel(start_x, i), this.gs.yToPixel(start_x, i),
               this.gs.xToPixel(end_x, i), this.gs.yToPixel(end_x, i));
         canvas.ctx.stroke();
      }

      if (this.coorSettings.drawMainLines) {
         canvas.ctx.beginPath();
         this.coorSettings.penMainLines.setup(canvas);
         // x
         for (let i = start_x; i <= end_x; i += this.gs.transform.xSpaceValue * a)
            canvas.line(this.gs.xToPixel(i, start_y), this.gs.yToPixel(i, start_y),
               this.gs.xToPixel(i, end_y), this.gs.yToPixel(i, end_y));
         // y
         for (let i = start_y; i <= end_y; i += this.gs.transform.ySpaceValue)
            canvas.line(this.gs.xToPixel(start_x, i), this.gs.yToPixel(start_x, i),
               this.gs.xToPixel(end_x, i), this.gs.yToPixel(end_x, i));
         canvas.ctx.stroke();
      }

      if (this.coorSettings.drawAxisesLines) {
         canvas.ctx.beginPath();
         this.coorSettings.penXaxis.setup(canvas);
         canvas.line(this.gs.xToPixel(start_x, 0), this.gs.yToPixel(start_x, 0),
            this.gs.xToPixel(end_x, 0), this.gs.yToPixel(end_x, 0));
         canvas.ctx.stroke();
         canvas.ctx.beginPath();
         this.coorSettings.penYaxis.setup(canvas);
         canvas.line(this.gs.xToPixel(0, start_y), this.gs.yToPixel(0, start_y),
            this.gs.xToPixel(0, end_y), this.gs.yToPixel(0, end_y));
         canvas.ctx.stroke();
      }

      start_x = Math.floor(start_x / this.gs.transform.xSpaceValue / a);
      end_x = Math.ceil(end_x / this.gs.transform.xSpaceValue / a);
      start_y = Math.floor(start_y / this.gs.transform.ySpaceValue);
      end_y = Math.ceil(end_y / this.gs.transform.ySpaceValue);

      let y, x;
      let num;
      if (this.coorSettings.drawNumbers) {
         // label position x
         canvas.ctx.fillStyle = this.coorSettings.color.toString();
         canvas.ctx.strokeStyle = `rgba(${this.coorSettings.background.toArray().splice(0, 3).join(', ')}, 200)`;
         canvas.ctx.lineWidth = 2;
         canvas.setFont({ size: 15 }); /// setting the label style.

         let xD, yD;
         if (Math.abs(Math.tan(this.gs.transform.yAngle)) > Math.abs(Math.tan(this.gs.transform.xAngle))) { // && Math.tan(Math.abs(this.gs.transform._xAngle - this.gs.transform._yAngle)) >= 1
            // dealing horizetally when setting x labels vetically.
            xD = 'v'; yD = 'h';
         }
         else {
            xD = 'h'; yD = 'v';
         }

         for (let i = start_x; i <= end_x; i += 1) {
            x = i * this.gs.transform.xSpaceValue;
            num = (Math.abs(x) < 0.001 || Math.abs(x) >= 999999) ?
               x.toExponential(3).replace(/\.?0+e\+?/, '×10^') :
               x.toFixed(3).replace(/0+$/, "").replace(/\.$/, ''); /// .toFixed(3) returns 32146.000 if you input an integer, so I want to remove all the zeros from the end, and if "." remians, then remove it too, other wise keep all thing such as 2343165.123 
            if (x != 0) {
               num += (a === Math.PI / 2 ? 'pi' : '') + this.coorSettings.xUnit;
               let p = this.__getLabelPos(canvas, this.gs.coorTOpx(x, 0), num, xD, this.gs.jVector); /// position of the label of x which the line, which is parallel to yAxis, intersect xAxis;
               canvas.ctx.fillText(num, p.x, p.y);
               // canvas.ctx.strokeText(num, p.x + 4, p.y + 4);
            }
         }
         // label position y
         for (let i = start_y; i <= end_y; i += 1) {
            y = i * this.gs.transform.ySpaceValue;
            num = (Math.abs(y) < 0.001 || Math.abs(y) >= 999999) ?
               y.toExponential(3).replace(/\.?0+e\+?/, '×10^') :
               y.toFixed(3).replace(/0+$/, "").replace(/\.$/, '');
            if (y != 0) {
               num += this.coorSettings.yUnit;
               let p = this.__getLabelPos(canvas, this.gs.coorTOpx(0, y), num, yD, this.gs.iVector);
               canvas.ctx.fillText(num, p.x, p.y);
               // canvas.ctx.strokeText(num, p.x + 4, p.y + 4);
            }
         }
      }
   }
   radian(canvas) {
      this.custom(canvas, Math.PI / 2);
   }

   /**
    * 
    * @param {vector} pos the real position for the label on either of the two axes
    * @param {string} number as string to measure its size.
    * @param {string} dimension which is either 'h' or 'v', so the code will check if the label is out side the horizental view 'h', or the vertical view 'v';
    */
   __getLabelPos(canvas, pos, number, dimension, unitVec) {
      let size = canvas.measureString(number);
      size.height = 10; // as there is no properity called height in size, gotten from measureString("string");
      pos = new vector(pos.x, pos.y);

      if (dimension === 'h') {
         let bounds = [4, this.gs.width - size.width - 4];
         if (pos.x < bounds[0]) {
            let n = (bounds[0] - pos.x) / unitVec.x;
            return pos.add(unitVec.mult(n));
         } else if (pos.x > bounds[1]) {
            let n = (bounds[1] - pos.x) / unitVec.x;
            return pos.add(unitVec.mult(n));
         } else {
            return pos;
         }
      } else {
         /// if dimension is 'v' or even anything else.
         let bounds = [4, this.gs.height - size.height - 4];
         if (pos.y < bounds[0]) {
            let n = (bounds[0] - pos.y) / unitVec.y;
            return pos.add(unitVec.mult(n));
         } else if (pos.y > bounds[1]) {
            let n = (bounds[1] - pos.y) / unitVec.y;
            return pos.add(unitVec.mult(n));
         } else {
            return pos;
         }
      }
   }

}