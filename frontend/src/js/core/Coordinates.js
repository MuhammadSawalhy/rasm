export default class {

   constructor(gs, coorSettings) {
      this.gs = gs;
      this.coorManager = this.gs.coorManager;
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
      Object.assign(defaultCoorSettings, {
         fillColor: defaultCoorSettings.color.toString(),
         fillColorDim: defaultCoorSettings.color.toString({ a: 0.5 }),
      });
      if (coorSettings) {
         this.coorSettings = {};
         Object.assign(this.coorSettings, defaultCoorSettings);
         Object.assign(this.coorSettings, coorSettings);
      } else {
         this.coorSettings = defaultCoorSettings;
      }

   }

   draw(ctx) {
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
      let vp = this.gs.viewport, trans = this.gs.transform;
      let start_x, start_y, end_x, end_y;
      
      //#region lines
      ///////////////////////// 
      
      start_x = Math.floor(vp.xmin / trans.xSpaceValue / a) * a * trans.xSpaceValue;
      end_x = Math.ceil(vp.xmax / trans.xSpaceValue / a) * a * trans.xSpaceValue;
      start_y = Math.floor(vp.ymin / trans.ySpaceValue) * trans.ySpaceValue;
      end_y = Math.ceil(vp.ymax / trans.ySpaceValue) * trans.ySpaceValue;

      if (this.coorSettings.drawDecimalLines) {
         canvas.ctx.beginPath();
         this.coorSettings.penDecimalLines.setup(canvas);
         // x
         for (let i = start_x; i <= end_x; i += trans.xSpaceValue * a / this.coorSettings.decimalLinesSpace)
            canvas.line(this.coorManager.xToPixel(i, start_y), this.coorManager.yToPixel(i, start_y),
               this.coorManager.xToPixel(i, end_y), this.coorManager.yToPixel(i, end_y));
         // y
         for (let i = start_y; i <= end_y; i += trans.ySpaceValue / this.coorSettings.decimalLinesSpace)
            canvas.line(this.coorManager.xToPixel(start_x, i), this.coorManager.yToPixel(start_x, i),
               this.coorManager.xToPixel(end_x, i), this.coorManager.yToPixel(end_x, i));
         canvas.ctx.stroke();
      }

      if (this.coorSettings.drawMainLines) {
         canvas.ctx.beginPath();
         this.coorSettings.penMainLines.setup(canvas);
         // x
         for (let i = start_x; i <= end_x; i += trans.xSpaceValue * a)
            canvas.line(this.coorManager.xToPixel(i, start_y), this.coorManager.yToPixel(i, start_y),
               this.coorManager.xToPixel(i, end_y), this.coorManager.yToPixel(i, end_y));
         // y
         for (let i = start_y; i <= end_y; i += trans.ySpaceValue)
            canvas.line(this.coorManager.xToPixel(start_x, i), this.coorManager.yToPixel(start_x, i),
               this.coorManager.xToPixel(end_x, i), this.coorManager.yToPixel(end_x, i));
         canvas.ctx.stroke();
      }

      if (this.coorSettings.drawAxisesLines) {
         canvas.ctx.beginPath();
         this.coorSettings.penXaxis.setup(canvas);
         canvas.line(this.coorManager.xToPixel(start_x, 0), this.coorManager.yToPixel(start_x, 0),
            this.coorManager.xToPixel(end_x, 0), this.coorManager.yToPixel(end_x, 0));
         canvas.ctx.stroke();
         canvas.ctx.beginPath();
         this.coorSettings.penYaxis.setup(canvas);
         canvas.line(this.coorManager.xToPixel(0, start_y), this.coorManager.yToPixel(0, start_y),
            this.coorManager.xToPixel(0, end_y), this.coorManager.yToPixel(0, end_y));
         canvas.ctx.stroke();
      }

      ///////////////////////// 
      //#endregion

      //#region numbers and labels
      ///////////////////////// 

      if (this.coorSettings.drawNumbers) {
         
         start_x = Math.floor(start_x / trans.xSpaceValue / a);
         end_x = Math.ceil(end_x / trans.xSpaceValue / a);
         start_y = Math.floor(start_y / trans.ySpaceValue);
         end_y = Math.ceil(end_y / trans.ySpaceValue);

         let y, x;
         let num;
         // label position x
         canvas.ctx.fillStyle = this.coorSettings.fillColor;
         canvas.ctx.strokeStyle = this.coorSettings.background.toString();
         canvas.ctx.lineWidth = 3;
         canvas.setFont({ size: 15 }); /// setting the label style.

         let xD, yD;
         if (Math.abs(Math.tan(trans.yAngle)) > Math.abs(Math.tan(trans.xAngle))) { // && Math.tan(Math.abs(trans._xAngle - trans._yAngle)) >= 1
            // dealing horizetally when setting x labels vetically.
            xD = 'v'; yD = 'h';
         }
         else {
            xD = 'h'; yD = 'v';
         }

         for (let i = start_x; i <= end_x; i += 1) {
            x = i * trans.xSpaceValue;
            num = (Math.abs(x) < 0.001 || Math.abs(x) >= 999999) ?
               x.toExponential(3).replace(/\.?0+e\+?/, '×10^') :
               x.toFixed(3).replace(/0+$/, "").replace(/\.$/, ''); /// .toFixed(3) returns 32146.000 if you input an integer, so I want to remove all the zeros from the end, and if "." remians, then remove it too, other wise keep all thing such as 2343165.123 
            if (x != 0) {
               num += (a === Math.PI / 2 ? 'pi' : '') + this.coorSettings.xUnit;
               let p = this.__getLabelPos(canvas, this.coorManager.coorTOpx(x, 0) , num, xD, trans.jVector); /// position of the label of x which the line, which is parallel to yAxis, intersect xAxis;
               canvas.ctx.strokeText(num, p.x, p.y);
               canvas.ctx.fillText(num, p.x, p.y);
            }
         }
         // label position y
         for (let i = start_y; i <= end_y; i += 1) {
            y = i * trans.ySpaceValue;
            num = (Math.abs(y) < 0.001 || Math.abs(y) >= 999999) ?
               y.toExponential(3).replace(/\.?0+e\+?/, '×10^') :
               y.toFixed(3).replace(/0+$/, "").replace(/\.$/, '');
            if (y != 0) {
               num += this.coorSettings.yUnit;
               let p = this.__getLabelPos(canvas, this.coorManager.coorTOpx(0, y), num, yD, trans.iVector);
               canvas.ctx.strokeText(num, p.x, p.y);
               canvas.ctx.fillText(num, p.x, p.y);
            }
         }
         
      }

      ///////////////////////// 
      //#endregion
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
      pos = new vector(pos.x +4, pos.y +4);

      if (dimension === 'h') {
         let bounds = [10, this.gs.width - size.width - 10];
         if (pos.x < bounds[0]) {
            // canvas.ctx.fillStyle = this.coorSettings.fillColorDim;
            let n = (bounds[0] - pos.x) / unitVec.x;
            return pos.add(unitVec.mult(n));
         } else if (pos.x > bounds[1]) {
            // canvas.ctx.fillStyle = this.coorSettings.fillColorDim;
            let n = (bounds[1] - pos.x) / unitVec.x;
            return pos.add(unitVec.mult(n));
         } else {
            // canvas.ctx.fillStyle = this.coorSettings.fillColor;
            return pos;
         }
      } else {
         /// if dimension is 'v' or even anything else.
         let bounds = [10, this.gs.height - size.height - 10];
         if (pos.y < bounds[0]) {
            // canvas.ctx.fillStyle = this.coorSettings.fillColorDim;
            let n = (bounds[0] - pos.y) / unitVec.y;
            return pos.add(unitVec.mult(n));
         } else if (pos.y > bounds[1]) {
            // canvas.ctx.fillStyle = this.coorSettings.fillColorDim;
            let n = (bounds[1] - pos.y) / unitVec.y;
            return pos.add(unitVec.mult(n));
         } else {
            // canvas.ctx.fillStyle = this.coorSettings.fillColor;
            return pos;
         }
      }
   }

}