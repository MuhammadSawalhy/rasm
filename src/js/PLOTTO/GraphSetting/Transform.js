export default class {

   constructor(gs) {
      this.gs = gs;

      /** don't spacify the value of xAngle or yAngle before _xAngle and _yAngle
       *  as the value of either depends upon the other */
      /**
       * here this.invokeOnchange is undefines so there is no use of put it to false
       */
      this._xAngle = 0;
      this.xSpace = 80;
      this.xSpaceValue = 2;
      this.xSpaceModifier = 1;
      this.xSpaceModifier = 1;

      this._yAngle = Math.PI / 2;
      this.ySpace = 80;
      this.ySpaceValue = 2;
      this.ySpaceModifier = 1;
      this.ySpaceModifier = 1;

      this.angleMargin = angles.deg(20);
      this.zoomLimits = [80, 180];
      this.zoomLimits[1] = (this.zoomLimits[1] * 2 / 5) < this.zoomLimits[0] ? this.zoomLimits[0] * 5 / 2 + 1 : this.zoomLimits[0];
      this.zoomRatio = 1.1;

      this.xZoomingState = 2; this.yZoomingState = 2;

      this.invokeOnchange = true;
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
         let coor = this.gs.pxTOcoor(pxVector.x, pxVector.y);
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
         this.invokeOnchange = false;
         this.xAngle += a;
         this.yAngle += a;
         this.invokeOnchange = true;
         this.onchange();
      }
   }

   /**
  * @param {*} type, is 'deg' or 'rad'
  */
   rotateX(a, type = 'rad') {
      if (!isNaN(a)) {
         this.invokeOnchange = false;
         if (type === 'deg') {
            a = a / 180 * Math.PI;
         }
         this.xAngle += a;
         this.invokeOnchange = true;
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
         this.yAngle += a;
         this.invokeOnchange = true;
         this.onchange();
      }
   }

   //#endregion

   //#region translate

   translate(value) {
      this.gs._center = new vector(this.gs.center.x + value.x, this.gs.center.y + value.y);
      this.onchange(this.invokeOnchange, false);
   }
   translateX(value) {
      this.gs._center = new vector(this.gs.center.x + value.x, this.gs.center.y + value.y);
      this.onchange(this.invokeOnchange, false);
   }
   translateY(value) {
      this.gs._center = new vector(this.gs.center.x + value.x, this.gs.center.y + value.y);
      this.onchange(this.invokeOnchange, false);
   }

   //#endregion

   //#region zoom

   zoomIn(centerOfZoom) {

      centerOfZoom = centerOfZoom || new vector(this.gs.width / 2, this.gs.height / 2);
      this.transformOrigin = centerOfZoom;

      this.invokeOnchange = false;
      this.xZoomIn(); this.yZoomIn();
      this.invokeOnchange = true;
      this.onchange();

   }
   zoomOut(centerOfZoom) {

      centerOfZoom = centerOfZoom || new vector(this.gs.width / 2, this.gs.height / 2);
      this.transformOrigin = centerOfZoom;

      this.invokeOnchange = false;
      this.xZoomOut(); this.yZoomOut();
      this.invokeOnchange = true;
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

   setViewport(viewport, corner, resize) {
      //#region precalculations
      viewport = viewport || {};
      viewport.xmin = viewport.xmin === 0 ? 0 : (viewport.xmin || this.gs.viewport.xmin);
      viewport.xmax = viewport.xmax === 0 ? 0 : (viewport.xmax || this.gs.viewport.xmax);
      viewport.ymin = viewport.ymin === 0 ? 0 : (viewport.ymin || this.gs.viewport.ymin);
      viewport.ymax = viewport.ymax === 0 ? 0 : (viewport.ymax || this.gs.viewport.ymax);
      let a = this.invokeOnchange; this.invokeOnchange = false;
      let p = this.gs.pxTOcoor(this.gs.width / 2, this.gs.height / 2);
      corner = corner || new vector(0, 0);
      corner = this.gs.pxTOcoor(corner.x, corner.y);
      //#endregion

      //#region maincalculations
      let xs = this.xSpace, ys = this.ySpace;

      this.xSpace = this.xSpace / ((viewport.xmax - viewport.xmin) / (this.gs.viewport.xmax - this.gs.viewport.xmin));
      if (resize) {
         this.ySpace *= this.xSpace / xs;
      }
      else {
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
      this.invokeOnchange = true; this.onchange();
      corner = this.gs.coorTOpx(corner.x, corner.y);
      corner = new vector(corner.x, corner.y);
      this.translate(corner.mult(-1));
      this.onchange();
      if (resize) {
         let p_ = this.gs.coorTOpx(p.x, (viewport.ymax + viewport.ymin) / 2);
         this.translate(new vector(0, this.gs.height / 2 - p_.y));
      }
      this.onchange(); this.invokeOnchange = a;
      //#endregion
   }

   getViewport(pxViewport) {
      let xStart = this.gs.xToCoor(pxViewport.xmin, Math.tan(this.yAngle) > 0 ? pxViewport.ymin : pxViewport.ymax);
      let xEnd = this.gs.xToCoor(pxViewport.xmax, Math.tan(this.yAngle) <= 0 ? pxViewport.ymin : pxViewport.ymax);
      let yStart = this.gs.yToCoor(Math.tan(this.xAngle) > 0 ? pxViewport.xmax : pxViewport.xmin, pxViewport.ymax);
      let yEnd = this.gs.yToCoor(Math.tan(this.xAngle) <= 0 ? pxViewport.xmax : pxViewport.xmin, pxViewport.ymin);

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
      this.invokeOnchange = false;

      this.xSpace = 80;
      this.xSpaceValue = 2;
      this.xSpaceModifier = 1;
      this.xZoomingState = 2;

      this.ySpace = 80;
      this.ySpaceValue = 2;
      this.ySpaceModifier = 1;
      this.yZoomingState = 2;

      this._xAngle = 0;
      this._yAngle = Math.PI / 2;

      this.translate(new vector(
         this.gs.width / 2 - this.gs.center.x,
         this.gs.height / 2 - this.gs.center.y
      ));

      this.invokeOnchange = true;
      this.onchange();
   }

   assign(src) {
      Object.assign(this, src);
   }

   onchange(change = this.invokeOnchange, transToOrigin = true) {
      /// updating
      if (change) {

         let ysm = this.xSpaceModifier * Math.abs(Math.cos(this.xAngle - this.yAngle)) + 1;
         let xsm = this.ySpaceModifier * Math.abs(Math.cos(this.xAngle - this.yAngle)) + 1;
         this.xScale = (this.xSpace * ysm / this.xSpaceValue);
         this.yScale = (this.ySpace * xsm / this.ySpaceValue);

         this.gs.viewport = this.getViewport({
            xmin: 0, xmax: this.gs.width,
            ymin: 0, ymax: this.gs.height
         });

         this.gs.drawingStep = (this.gs.viewport.xmax - this.gs.viewport.xmin) / 10000;

         if (this.transformOrigin && transToOrigin) {
            let a = this.invokeOnchange;
            this.invokeOnchange = false;
            let p = this.gs.coorTOpx(...this.transformOrigin.coorVector.toArray());
            this.translate(this.transformOrigin.pxVector.subtract(p));
            this.onchange(true, false);
            this.invokeOnchange = a;
         }

         //#region checking if valid.
         let notValid = (this.gs.viewport.xmin + this.gs.drawingStep / 2 <= this.gs.viewport.xmin) ||
            this.gs.viewport.xmax - this.gs.drawingStep / 2 >= this.gs.viewport.xmax ||
            !math.isNumeric(this.xScale) || !math.isNumeric(this.yScale) ||
            !math.isNumeric(this.gs.viewport.xmin) || !math.isNumeric(this.gs.viewport.xmax) ||
            !math.isNumeric(this.gs.viewport.ymin) || !math.isNumeric(this.gs.viewport.ymax) ||
            !math.isNumeric(this.gs.drawingStep) ||
            (this.gs.viewport.xmax - this.gs.viewport.xmin) > 10 ** 12 ||
            (this.gs.viewport.ymax - this.gs.viewport.ymin) > 10 ** 12 ||
            (this.gs.viewport.xmax - this.gs.viewport.xmin) < 10 ** -12 ||
            (this.gs.viewport.ymax - this.gs.viewport.ymin) < 10 ** -12 ||
            !math.isNumeric(this.gs.center.x) || !math.isNumeric(this.gs.center.y) ||
            (this.transformOrigin && transToOrigin &&
               (!math.isNumeric(this.transformOrigin.coorVector.x) || !math.isNumeric(this.transformOrigin.coorVector.y) ||
                  !math.isNumeric(this.transformOrigin.pxVector.x) || !math.isNumeric(this.transformOrigin.pxVector.y)));
         //#endregion

         if (notValid && this.lastEdition) {
            this.assign(this.lastEdition.transform);
            this.gs.viewport = Object.assign({}, this.lastEdition.viewport);
            this.gs.drawingStep = this.lastEdition.drawingStep;
            this.gs._center = Object.assign(new vector(), this.lastEdition.center);
            return;
         }

         this.lastEdition = {
            transform: Object.assign(new this.constructor(), this),
            viewport: Object.assign({}, this.gs.viewport),
            drawingStep: this.gs.drawingStep,
            center: Object.assign(new vector(), this.gs.center)
         };

      }
   }

   //#endregion

};