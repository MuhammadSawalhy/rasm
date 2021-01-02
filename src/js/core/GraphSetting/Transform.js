export default class {

   constructor(gs) {
      this.gs = gs;
      this.coorManager = gs.coorManager;
      this.handlers = {};
      
      this.angleMargin = angles.deg(20);
      this.zoomLimits = [80, 180];
      this.zoomLimits[1] = (this.zoomLimits[1] * 2 / 5) < this.zoomLimits[0] ? this.zoomLimits[0] * 5 / 2 + 1 : this.zoomLimits[0];
      this.zoomRatio = 1.1;

      this.invokeOnchange = true;
      this.reset();
   }

   /**
    * @returns the i vector of the cartesian coordinates relative to (with respect to) the pixel coordinates
    */
   get iVector() {
      return vector.fromAngle(-this.xAngle).mult(this.xScale);
   }
   /**
   * @returns the j vector of the cartesian coordinates relative to (with respect to) the pixel coordinates
   */
   get jVector() {
      return vector.fromAngle(-this.yAngle).mult(this.yScale);
   }

   getTransform() {
      let i = this.iVector;
      let j = this.jVector;
      let c = this.center;
      return { a: i.x, b: i.y, c: j.x, d: j.y, e: c.x, f: c.y };
   }

   //#region transformation's origin

   get transformOrigin() {
      return this._transformOrigin;
   }

   set transformOrigin(pxVector) {
      if (pxVector && pxVector instanceof vector) {
         this._transformOrigin = {
            pxVector: pxVector
         };
         let coor = this.coorManager.pxTOcoor(pxVector.x, pxVector.y);
         this._transformOrigin.coorVector = new vector(coor.x, coor.y);
      } else {
         this._transformOrigin = undefined;
      }
   }

   //#endregion

   //#region {rotation, angles}

   get xAngle() { return this._xAngle; }
   set xAngle(v) {
      let a = angles.constrainAngle(v);
      if (angles.minAngle(vector.fromAngle(a), vector.fromAngle(this._yAngle), { type: 'lines' }) < this.angleMargin) {
         let b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._yAngle), { dir: 'clockwise' });
         if (b < this.angleMargin && b > 0) {
            a = angles.constrainAngle(this._yAngle + this.angleMargin);
         }
         else {
            b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._yAngle));
            if (b < this.angleMargin && b > 0) {
               a = angles.constrainAngle(this._yAngle - this.angleMargin);
            }
            else {
               b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._yAngle).mult(-1), { dir: 'clockwise' });
               if (b < this.angleMargin && b > 0) {
                  a = angles.constrainAngle(this._yAngle + Math.PI + this.angleMargin);
               }
               else {
                  b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._yAngle).mult(-1));
                  if (b < this.angleMargin && b > 0) {
                     a = angles.constrainAngle(this._yAngle + Math.PI - this.angleMargin);
                  }
               }
            }
         }
      }
      this._xAngle = a;
   }

   get yAngle() { return this._yAngle; }
   set yAngle(v) {
      let a = angles.constrainAngle(v);
      if (angles.minAngle(vector.fromAngle(a), vector.fromAngle(this._xAngle), { type: 'lines' }) < this.angleMargin) {
         let b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._xAngle), { dir: 'clockwise' });
         if (b < this.angleMargin && b > 0) {
            a = angles.constrainAngle(this._xAngle + this.angleMargin);
         }
         else {
            b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._xAngle));
            if (b < this.angleMargin && b > 0) {
               a = angles.constrainAngle(this._xAngle - this.angleMargin);
            }
            else {
               b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._xAngle).mult(-1), { dir: 'clockwise' });
               if (b < this.angleMargin && b > 0) {
                  a = angles.constrainAngle(this._xAngle + Math.PI + this.angleMargin);
               }
               else {
                  b = angles.angle(vector.fromAngle(a), vector.fromAngle(this._xAngle).mult(-1));
                  if (b < this.angleMargin && b > 0) {
                     a = angles.constrainAngle(this._xAngle + Math.PI - this.angleMargin);
                  }
               }
            }
         }
      }
      this._yAngle = a;
   }

   /**
 * @param {*} type, is 'deg' or 'rad'
 */
   rotate(a, type = 'rad') {
      if (!isNaN(a)) {
         if (type === 'deg') {
            a = a / 180 * Math.PI;
         }
         let i = this.invokeOnchange;
         this.invokeOnchange = false;
         this.xAngle += a;
         this.yAngle += a;
         this.invokeOnchange = i;
         this.onchange();
      }
   }

   /**
  * @param {*} type, is 'deg' or 'rad'
  */
   rotateX(a, type = 'rad') {
      if (!isNaN(a)) {
         if (type === 'deg') {
            a = a / 180 * Math.PI;
         }
         let i = this.invokeOnchange;
         this.invokeOnchange = false;
         this.xAngle += a;
         this.invokeOnchange = i;
         this.onchange();
      }
   }

   /**
    * @param {*} type, is 'deg' or 'rad'
    */
   rotateY(a, type = 'rad') {
      if (!isNaN(a)) {
         this.invokeOnchange = false;
         if (type === 'deg') {
            a = a / 180 * Math.PI;
         }
         let i = this.invokeOnchange;
         this.invokeOnchange = false;
         this.yAngle += a;
         this.invokeOnchange = i;
         this.onchange();
      }
   }

   //#endregion

   //#region translate

   get center() { return this._center; }

   set center(vec) {
      this._center = vec;
      this.onchange(this.invokeOnchange, false);
   }

   translate(value) {
      this.center = new vector(this._center.x + value.x, this._center.y + value.y);
   }

   //#endregion

   //#region zoom

   zoomIn(centerOfZoom) {

      centerOfZoom = centerOfZoom || new vector(this.gs.width / 2, this.gs.height / 2);
      this.transformOrigin = centerOfZoom;

      let a = this.invokeOnchange;
      this.invokeOnchange = false;
      this.xZoomIn(); this.yZoomIn();
      this.invokeOnchange = a;
      this.onchange();

   }

   zoomOut(centerOfZoom) {

      centerOfZoom = centerOfZoom || new vector(this.gs.width / 2, this.gs.height / 2);
      this.transformOrigin = centerOfZoom;

      let a = this.invokeOnchange;
      this.invokeOnchange = false;
      this.xZoomOut(); this.yZoomOut();
      this.invokeOnchange = a;
      this.onchange();

   }

   xZoomIn() {
      // #region X
      if (this.xSpace <= this.zoomLimits[1]) this.xSpace *= this.zoomRatio;

      this.reformXspace();
      this.onchange();
      //#endregion
   }

   xZoomOut() {
      // #region X
      if (this.xSpace >= this.zoomLimits[0]) this.xSpace /= this.zoomRatio;

      this.reformXspace();
      this.onchange();
      //#endregion

   }

   yZoomIn() {
      // #region Y
      if (this.ySpace <= this.zoomLimits[1]) this.ySpace *= this.zoomRatio;

      this.reformYspace();
      this.onchange();
      //#endregion
   }
   
   yZoomOut() {
      // #region Y
      if (this.ySpace >= this.zoomLimits[0]) this.ySpace /= this.zoomRatio;

      this.reformYspace();
      this.onchange();
      //#endregion
   }

   //#endregion

   //#region viewport managment

   /**
    * setting new viewport form the cartesian coordinates.
    * @param {Object} viewport 
    * an object has: 1. xmin, xmax, ymin, ymax representing the edges of the cartesian coordinates not the pixels in the canvas
    * @param {Object} keepRatio 
    */
   setViewport(viewport, keepRatio) {
      //#region precalculations
      // the top left corner
      viewport.xmin = viewport.xmin === 0 ? 0 : (viewport.xmin || this.gs.viewport.xmin);
      viewport.xmax = viewport.xmax === 0 ? 0 : (viewport.xmax || this.gs.viewport.xmax);
      viewport.ymin = viewport.ymin === 0 ? 0 : (viewport.ymin || this.gs.viewport.ymin);
      viewport.ymax = viewport.ymax === 0 ? 0 : (viewport.ymax || this.gs.viewport.ymax);
      let a = this.invokeOnchange; this.invokeOnchange = false;
      let p = this.coorManager.pxTOcoor(this.gs.width / 2, this.gs.height / 2);

      //#endregion

      //#region maincalculations
      let xs = this.xSpace, ys = this.ySpace;

      this.xSpace = this.xSpace / ((viewport.xmax - viewport.xmin) / (this.gs.viewport.xmax - this.gs.viewport.xmin));
      if (keepRatio) {
         this.ySpace *= this.xSpace / xs;
      } else {
         this.ySpace = this.ySpace / ((viewport.ymax - viewport.ymin) / (this.gs.viewport.ymax - this.gs.viewport.ymin));
      }

      if (this.ySpace <= 0 || this.xSpace <= 0 || isNaN(this.xSpace) || !isFinite(this.xSpace) || isNaN(this.ySpace) || !isFinite(this.ySpace)) {
         this.xSpace = xs;
         this.ySpace = ys;
      }

      this.reformXspace();
      this.reformYspace();

      //#endregion

      //#region aftercalulations

      this.onchange(true);
      let tfCorner = this.coorManager.coorTOpx(viewport.xmin, viewport.ymax);
      tfCorner = new vector(tfCorner.x, tfCorner.y);
      /// translation::: put the top left corner as pixels after transformations on top of the one before transformation 
      this.translate(tfCorner.mult(-1));
      this.onchange(true);
      if (keepRatio) {
         let p_ = this.coorManager.coorTOpx(p.x, (viewport.ymax + viewport.ymin) / 2);
         this.translate(new vector(0, this.gs.height / 2 - p_.y));
      }
      this.onchange(); this.invokeOnchange = a;
      //#endregion
   }

   getViewport(pxViewport) {
      pxViewport.xmin = pxViewport.xmin || 0;
      pxViewport.xmax = pxViewport.xmax || this.gs.width;
      pxViewport.ymin = pxViewport.ymin || 0;
      pxViewport.ymax = pxViewport.ymax || this.gs.height;

      let xStart = this.coorManager.xTOcoor(pxViewport.xmin, Math.tan(this.yAngle) > 0 ? pxViewport.ymin : pxViewport.ymax);
      let xEnd = this.coorManager.xTOcoor(pxViewport.xmax, Math.tan(this.yAngle) <= 0 ? pxViewport.ymin : pxViewport.ymax);
      let yStart = this.coorManager.yTOcoor(Math.tan(this.xAngle) > 0 ? pxViewport.xmax : pxViewport.xmin, pxViewport.ymax);
      let yEnd = this.coorManager.yTOcoor(Math.tan(this.xAngle) <= 0 ? pxViewport.xmax : pxViewport.xmin, pxViewport.ymin);

      return {
         xmin: xEnd < xStart ? xEnd : xStart,
         xmax: xEnd > xStart ? xEnd : xStart,
         ymin: yEnd < yStart ? yEnd : yStart,
         ymax: yEnd > yStart ? yEnd : yStart
      };
   }

   //#endregion

   //#region general

   reformXspace() {
      let done = false;
      while (this.xSpace > this.zoomLimits[1]) {
         if (this.xZoomingState == 5) {
            this.xZoomingState = 2;
            let ratio = 2 / 5;
            this.xSpaceValue = this.xSpaceValue * ratio;
            this.xSpace = this.xSpace * ratio;
         }
         else if (this.xZoomingState == 2) {
            this.xZoomingState = 1;
            let ratio = 1 / 2;
            this.xSpaceValue = this.xSpaceValue * ratio;
            this.xSpace = this.xSpace * ratio;
         }
         else if (this.xZoomingState == 1) {
            this.xZoomingState = 5;
            let ratio = 0.5 / 1;
            this.xSpaceValue = this.xSpaceValue * ratio;
            this.xSpace = this.xSpace * ratio;
         }
         done = true;
      }
      if (done) return;
      while (this.xSpace < this.zoomLimits[0]) {
         if (this.xZoomingState == 1) {
            this.xZoomingState = 2;
            let ratio = 2 / 1;
            this.xSpaceValue = this.xSpaceValue * ratio;
            this.xSpace = this.xSpace * ratio;
         }
         else if (this.xZoomingState == 2) {
            this.xZoomingState = 5;
            let ratio = 5 / 2;
            this.xSpaceValue = this.xSpaceValue * ratio;
            this.xSpace = this.xSpace * ratio;
         }
         else if (this.xZoomingState == 5) {
            this.xZoomingState = 1;
            let ratio = 10 / 5;
            this.xSpaceValue = this.xSpaceValue * ratio;
            this.xSpace = this.xSpace * ratio;
         }
      }
   }
   reformYspace() {
      let done = false;
      while (this.ySpace > this.zoomLimits[1]) {
         if (this.yZoomingState == 5) {
            this.yZoomingState = 2;
            let ratio = 2 / 5;
            this.ySpaceValue = this.ySpaceValue * ratio;
            this.ySpace = this.ySpace * ratio;
         }
         else if (this.yZoomingState == 2) {
            this.yZoomingState = 1;
            let ratio = 1 / 2;
            this.ySpaceValue = this.ySpaceValue * ratio;
            this.ySpace = this.ySpace * ratio;
         }
         else if (this.yZoomingState == 1) {
            this.yZoomingState = 5;
            let ratio = 0.5 / 1;
            this.ySpaceValue = this.ySpaceValue * ratio;
            this.ySpace = this.ySpace * ratio;
         }
         done = true;
      }
      if (done) return;
      while (this.ySpace < this.zoomLimits[0]) {
         if (this.yZoomingState == 1) {
            this.yZoomingState = 2;
            let ratio = 2 / 1;
            this.ySpaceValue = this.ySpaceValue * ratio;
            this.ySpace = this.ySpace * ratio;
         }
         else if (this.yZoomingState == 2) {
            this.yZoomingState = 5;
            let ratio = 5 / 2;
            this.ySpaceValue = this.ySpaceValue * ratio;
            this.ySpace = this.ySpace * ratio;
         }
         else if (this.yZoomingState == 5) {
            this.yZoomingState = 1;
            let ratio = 10 / 5;
            this.ySpaceValue = this.ySpaceValue * ratio;
            this.ySpace = this.ySpace * ratio;
         }
      }
   }

   reset() {
      this.transformOrigin = undefined;

      this.xSpace = 120;
      this.xSpaceValue = 2;
      this.xSpaceModifier = 1;
      this.xZoomingState = 2;

      this.ySpace = 120;
      this.ySpaceValue = 2;
      this.ySpaceModifier = 1;
      this.yZoomingState = 2;

      this._xAngle = 0;
      this._yAngle = Math.PI / 2;

      this._center = new vector(this.gs.width / 2, this.gs.height / 2);

      this.onchange();
   }

   assign(target, src) {
      // target._transformOrigin = src._transformOrigin;

      target.xSpace = src.xSpace;
      target.xSpaceValue = src.xSpaceValue;
      target.xSpaceModifier = src.xSpaceModifier;
      target.xZoomingState = src.xZoomingState;

      target.ySpace = src.ySpace;
      target.ySpaceValue = src.ySpaceValue;
      target.ySpaceModifier = src.ySpaceModifier;
      target.yZoomingState = src.yZoomingState;

      target._xAngle = src._xAngle;
      target._yAngle = src._yAngle;

      target._center = src._center;
   }

   onchange(change = this.invokeOnchange, transToOrigin = true) {
      /// updating
      if (change) {

         let ysm = this.xSpaceModifier + Math.abs(Math.cos(this.xAngle - this.yAngle));
         let xsm = this.ySpaceModifier + Math.abs(Math.cos(this.xAngle - this.yAngle));
         this.xScale = (this.xSpace * ysm / this.xSpaceValue);
         this.yScale = (this.ySpace * xsm / this.ySpaceValue);

         let invalid =
            !math.isNumeric(this.xScale) || !math.isNumeric(this.yScale) ||
            !math.isNumeric(this.center.x) || !math.isNumeric(this.center.y) ||
            (this.transformOrigin && transToOrigin &&
               (!math.isNumeric(this.transformOrigin.coorVector.x) || !math.isNumeric(this.transformOrigin.coorVector.y) ||
                  !math.isNumeric(this.transformOrigin.pxVector.x) || !math.isNumeric(this.transformOrigin.pxVector.y)));

         if (invalid) {
            let a = this.invokeOnchange;
            this.invokeOnchange = false;
            try {
               this.assign(this, this.lastVersion.transform);
            } catch (e) {
               this.reset();
            }
            this.invokeOnchange = a;
            this.onchange(true);
            return;
         }

         this.coorManager.transform = this.getTransform();

         let vp = this.getViewport({
            xmin: 0, xmax: this.gs.width,
            ymin: 0, ymax: this.gs.height
         });

         vp.width = vp.xmax - vp.xmin;
         vp.height = vp.ymax - vp.ymin;
         this.gs.viewport = vp;

         this.gs.drawingStep = (this.gs.viewport.xmax - this.gs.viewport.xmin) / 10000;

         invalid = !math.isNumeric(this.gs.viewport.xmin) || !math.isNumeric(this.gs.viewport.xmax) ||
            !math.isNumeric(this.gs.viewport.ymin) || !math.isNumeric(this.gs.viewport.ymax) ||
            !math.isNumeric(this.gs.drawingStep) ||
            (this.gs.viewport.xmax - this.gs.viewport.xmin) > 10 ** 12 ||
            (this.gs.viewport.ymax - this.gs.viewport.ymin) > 10 ** 12 ||
            (this.gs.viewport.xmax - this.gs.viewport.xmin) < 10 ** -12 ||
            (this.gs.viewport.ymax - this.gs.viewport.ymin) < 10 ** -12 ||
            (this.gs.viewport.xmin + this.gs.drawingStep / 2 <= this.gs.viewport.xmin) ||
            this.gs.viewport.xmax - this.gs.drawingStep / 2 >= this.gs.viewport.xmax;

         if (invalid && this.lastVersion) {
            let a = this.invokeOnchange;
            this.invokeOnchange = false;
            try {
               this.assign(this, this.lastVersion.transform);
            } catch (e) {
               this.reset();
            }
            this.invokeOnchange = a;
            this.onchange(true);
            return;
         } else {

            if (this.transformOrigin && transToOrigin) {
               let a = this.invokeOnchange;
               this.invokeOnchange = false;
               let p = this.coorManager.coorTOpx(...this.transformOrigin.coorVector.toArray());
               this.translate(this.transformOrigin.pxVector.subtract(p));
               this.onchange(true, false);
               this.invokeOnchange = a;
               return;
            }

            if (this.handlers.onchange) {
               this.handlers.onchange();
            }
            let trans = {};
            this.assign(trans, this);
            this.lastVersion = {
               transform: trans,
            };
         }

      }
   }

   //#endregion

}
