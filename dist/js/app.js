(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global = global || self, global.PLOTTO = factory());
}(this, (function () { 'use strict';

   class ChildControl$1 {
      constructor(sketch, value) {
         if (!sketch) throw new Error('sketch is not valid.');
         this.sketch = sketch;
         this.gs = this.sketch.gs;
         // value is the graph object
         this.value = value;
         this.elt = document.createElement('div');
         this.elt.innerHTML = `
      <li class="object-control">
        <div class="sideStatus" cancel-move>
          <div class="visible">
            <div class="inner">
              
            </div>
          </div>
          <div class="order-container">
            <span class='order'>12</span>
          </div>
        </div>
        <div class="script-container" cancel-move>
          <span type="text" class="obj-script"></span>
        </div>
        <div class="side-ctrl">
          <button class="closebtn-2" cancel-move><div class="inner"></div></button>
          <span class="move">
            <div>
              <span>..</span>
              <span>..</span>
              <span>..</span>
            </div>
          </span>
        </div>
      </li>
      `;
         this.elt = (this.elt.childNodes[1]);

         this.__setEvents();
         this.__updateElts(); /// updating elements
      }
      get graphObject() {
         return this._graphObject;
      }
      set graphObject(value) {
         if (value) {
            if (!this._graphObject) {
               this.sketch.addObj(value);
            }
            this._graphObject = value;
         }
      }

      __setEvents() {

         let scriptELT = this.elt.querySelector('.obj-script');
         let removeELT = this.elt.querySelector('[class^="closebtn"]');
         let orderELT = this.elt.querySelector('.order');
         let sketch = this.sketch;

         let checkExpr = (latex) => {
            this.graphObject = getObject(
               this.gs,
               MathPackage.transformer.latexTOsnode(latex)
            );
         };

         let mathField = MQ.MathField(scriptELT, {
            sumStartsWithNEquals: true,
            supSubsRequireOperand: true,
            // charsThatBreakOutOfSupSub: '+-=<>',
            autoSubscriptNumerals: true,
            // autoCommands: 'pi theta sqrt sum int prod',
            // // autoOperatorNames: '',
            maxDepth: 10,
            handlers: {
               edit: function () {
                  checkExpr(mathField.latex());
               },

               enter: function () {
                  let newObj = new ChildControl(sketch);
                  __addOC(newObj, parseInt(orderELT.textContent));
                  newObj.focus();
               },
            }
         });
         this.mathField = mathField;

         removeELT.onclick = (e) => {
            removeOC(this);
            this.remove();
         };

      }

      focus() {
         this.sketch.focusedObject.blur();

         // setting this to be focuses
         this.sketch.focusedObject = this;
         this.mathField.focus();
         this.elt.classList.add('focus');
      }

      blur() {
         this.sketch.focusedObject = undefined;
         this.mathField.blur();
         this.elt.classList.remove('focus');
      }

      remove(removeELT) {
         if (removeELT) {
            this.removeELT.click();
         }
         let me = this.sketch.getChildById(this.id);
         this.sketch.children.splice(me.index, 1);
      }

      __updateElts() {
         if (this.graphObject) {
            if (this.graphObject instanceof Xfunction) {
               this.elt.style.background = this.graphObject.color;
            }
         }
      }
   }

   class Transform {

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

   }

   class GraphSettings {

     constructor(sketch, width, height) {
       this.sketch = sketch;
       this._width = width;
       this._height = height;
       this._center = new vector(this.width / 2, this.height / 2);

       this.transform = new Transform(this);
       this.transform.onchange();

       this.physicsRun = false;
     }

     get coor() { return this.sketch.coor; }

     get width() { return this._width || 0; }
     set width(value) {
       this._width = value; /** to update the boundaries */
       this.transform.onchange();
     }
     get height() { return this._height || 0; }
     set height(value) {
       this._height = value; /** to update the boundaries */
       this.transform.onchange();
     }

     /**
      * @returns the i vector of the cartesian coordinates relative to (with respect to) the pixel coordinates
      */
     get iVector() {
       return vector.fromAngle(-this.transform.xAngle).mult(this.transform.xScale);
     }
     /**
     * @returns the j vector of the cartesian coordinates relative to (with respect to) the pixel coordinates
     */
     get jVector() {
       return vector.fromAngle(-this.transform.yAngle).mult(this.transform.yScale);
     }

     get center() { return this._center; }

     centrate() {
       this.transform.translate(new vector(
         this.width / 2 - this.center.x,
         this.height / 2 - this.center.y
       ));
     }

     reset() {
       this.transform.reset();
     }

     //#region convert { coor, px }

     coorTOpx(x, y) {
       return { x: this.xToPixel(x, y), y: this.yToPixel(x, y) };
     }
     pxTOcoor(x, y) {
       return { x: this.xToCoor(x, y), y: this.yToCoor(x, y) };
     }
     xToPixel(xCoorValue, yCoorValue) {
       return (this.center.x + (xCoorValue * this.transform.xScale) * Math.cos(this.transform.xAngle) + (yCoorValue * this.transform.yScale) * Math.cos(this.transform.yAngle));
     }
     yToPixel(xCoorValue, yCoorValue) {
       return (this.center.y - ((yCoorValue * this.transform.yScale) * Math.sin(this.transform.yAngle) + (xCoorValue * this.transform.xScale) * Math.sin(this.transform.xAngle)));
     }
     xToCoor(xPixelValue, yPixelValue) {
       xPixelValue = xPixelValue - this.center.x;
       yPixelValue = this.center.y - yPixelValue;
       return ((Math.cos(this.transform.yAngle) * yPixelValue - Math.sin(this.transform.yAngle) * xPixelValue) / Math.sin(this.transform.xAngle - this.transform.yAngle)) / this.transform.xScale;
     }
     yToCoor(xPixelValue, yPixelValue) {
       xPixelValue = xPixelValue - this.center.x;
       yPixelValue = this.center.y - yPixelValue;
       return ((Math.cos(this.transform.xAngle) * yPixelValue - Math.sin(this.transform.xAngle) * xPixelValue) / Math.sin(this.transform.yAngle - this.transform.xAngle)) / this.transform.yScale;
     }

     //#endregion

   }

   class Coordinates {

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

         defaultCoorSettings = {
            ...defaultCoorSettings,
            ...{
               color: defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 255) : new drawing.color(50, 50, 50, 255),
               drawDecimalLines: !defaultCoorSettings.background.isDark(),
               penDecimalLines: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 30) : new drawing.color(50, 50, 50, 30), 1),
               penMainLines: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 100) : new drawing.color(50, 50, 50, 100), 1),
               penXaxis: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(255, 255, 255, 150) : new drawing.color(0, 0, 0, 150), 2),
               penYaxis: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(255, 255, 255, 150) : new drawing.color(0, 0, 0, 150), 2),
               penPolarCircles: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 100) : new drawing.color(50, 50, 50, 50), 1),
               penPolarLines: new drawing.pen(defaultCoorSettings.background.isDark() ? new drawing.color(200, 200, 200, 100) : new drawing.color(50, 50, 50, 50), 1)
            }
         };

         if (coorSettings) {
            this.coorSettings = { ...defaultCoorSettings, ...coorSettings };
         } else {
            this.coorSettings = defaultCoorSettings;
         }

      }

      draw(canvas) {
         switch (this.coorSettings.type) {
            case 'default':
               this.custom(canvas);
               break;
            case 'rad':
               this.radian(canvas);
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
            this.coorSettings.penDecimalLines.setup(canvas);
            // x
            for (let i = start_x; i <= end_x; i += this.gs.transform.xSpaceValue * a / this.coorSettings.decimalLinesSpace)
               canvas.line(this.gs.xToPixel(i, start_y), this.gs.yToPixel(i, start_y),
                  this.gs.xToPixel(i, end_y), this.gs.yToPixel(i, end_y));
            // y
            for (let i = start_y; i <= end_y; i += this.gs.transform.ySpaceValue / this.coorSettings.decimalLinesSpace)
               canvas.line(this.gs.xToPixel(start_x, i), this.gs.yToPixel(start_x, i),
                  this.gs.xToPixel(end_x, i), this.gs.yToPixel(end_x, i));
         }

         if (this.coorSettings.drawMainLines) {
            this.coorSettings.penMainLines.setup(canvas);
            // x
            for (let i = start_x; i <= end_x; i += this.gs.transform.xSpaceValue * a)
               canvas.line(this.gs.xToPixel(i, start_y), this.gs.yToPixel(i, start_y),
                  this.gs.xToPixel(i, end_y), this.gs.yToPixel(i, end_y));
            // y
            for (let i = start_y; i <= end_y; i += this.gs.transform.ySpaceValue)
               canvas.line(this.gs.xToPixel(start_x, i), this.gs.yToPixel(start_x, i),
                  this.gs.xToPixel(end_x, i), this.gs.yToPixel(end_x, i));
         }

         if (this.coorSettings.drawAxisesLines) {
            this.coorSettings.penXaxis.setup(canvas);
            canvas.line(this.gs.xToPixel(start_x, 0), this.gs.yToPixel(start_x, 0),
               this.gs.xToPixel(end_x, 0), this.gs.yToPixel(end_x, 0));
            this.coorSettings.penYaxis.setup(canvas);
            canvas.line(this.gs.xToPixel(0, start_y), this.gs.yToPixel(0, start_y),
               this.gs.xToPixel(0, end_y), this.gs.yToPixel(0, end_y));
         }

         start_x = Math.floor(start_x / this.gs.transform.xSpaceValue / a);
         end_x = Math.ceil(end_x / this.gs.transform.xSpaceValue / a);
         start_y = Math.floor(start_y / this.gs.transform.ySpaceValue);
         end_y = Math.ceil(end_y / this.gs.transform.ySpaceValue);

         let y, x;
         let num;
         if (this.coorSettings.drawNumbers) {
            // label position x
            canvas.fill(...this.coorSettings.color.toArray())
               .stroke(...this.coorSettings.background.toArray().splice(0, 3), 200)
               .strokeWeight(3)
               .textSize(15); /// setting the label style.

            // canvas.push(); /// to allow rotation
            // canvas.rotate(this.gs.xAngle);

            let xD, yD;
            if (Math.abs(Math.tan(this.gs.transform.yAngle)) > Math.abs(Math.tan(this.gs.transform.xAngle))) { // && Math.tan(Math.abs(this.gs.transform._xAngle - this.gs.transform._yAngle)) >= 1
               // dealing horizetally when setting x labels vetically.
               xD = 'v'; yD = 'h';
            }
            else {
               xD = 'h'; yD = 'x';
            }

            for (let i = start_x; i <= end_x; i += 1) {
               x = i * this.gs.transform.xSpaceValue;
               num = (Math.abs(x) < 0.001 || Math.abs(x) >= 999999) ?
                  x.toExponential(3).replace(/\.?0+e\+?/, '×10^') :
                  x.toFixed(3).replace(/0+$/, "").replace(/\.$/, ''); /// .toFixed(3) returns 32146.000 if you input an integer, so I want to remove all the zeros from the end, and if "." remians, then remove it too, other wise keep all thing such as 2343165.123 
               if (x != 0) {
                  num += (a === Math.PI / 2 ? 'pi' : '') + this.coorSettings.xUnit;
                  let p = this.__getLabelPos(this.gs.coorTOpx(x, 0), num, xD, this.gs.jVector); /// position of the label of x which the line, which is parallel to yAxis, intersect xAxis;
                  canvas.text(num, p.x + 4, p.y + 4); /// drawing the label
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
                  let p = this.__getLabelPos(this.gs.coorTOpx(0, y), num, yD, this.gs.iVector);
                  canvas.text(num, p.x + 4, p.y + 4);
               }
            }
            // canvaks.pop();
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
      __getLabelPos(pos, number, dimension, unitVec) {
         let size = drawing.measureString(number);
         size.height = 10; // as there is no properity called height in size, gotten from measureString("string");
         pos = new vector(pos.x, pos.y);

         if (dimension === 'h') {
            let bounds = [4, this.gs.width - size.width - 10];
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
            /// if it is 'v' or even anything else.
            let bounds = [4, this.gs.height - size.height - 10];
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

         // previous trials to fetch the desired mechanism. 
         // if (point.y < 4) {
         //    return { x: point.x + (point.y - 4) / Math.tan(this.gs.transform.yAngle), y: 4 };
         // }
         // if (point.y + size.height + 8 > this.gs.height) {
         //    return { x: (point.x + (point.y - (this.gs.height - 8 - size.height)) / Math.tan(this.gs.transform.yAngle)), y: this.gs.height - 8 - size.height };
         // }
         // else {
         //    return point;
         // }

      }

   }

   /* eslint-disable no-unused-vars */

   class Sketch {

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

   }

   var subTools = {
      details: SUI.TempMessege({
         layer: false,
         toolsbar: true,
         onhoverFix: true,
         position: { bottom: 20, left: 20 },
         duration: 2500, // to make it fixed
         content: '<p style="background: green; color:white;">There is no god but Allah',
         parent: document.querySelector('.canvas-container')
      })
   };

   function updateObjsOrder() {
      let objs = document.querySelectorAll('.controls li');
      let order = 1;
      for (let obj of objs) {
         obj.querySelector('.order').textContent = order++;
      }
   }

   var controls = document.querySelector('.controls');
   var newControl = controls.parentElement.querySelector('.new-control');

   function addOC(control, index = 'last') {
      let objs = document.querySelectorAll('.controls li');
      index = (math.isNumeric(index) && index > objs.length - 1) ? 'last' : index;
      let i = index === 'last' ? objs.length - 1 : index;
      if (i > -1 && index !== 'last') {
         control.elt.querySelector('.order').textContent = index + 1;
         controls.insertBefore(control.elt, objs[i]);
         updateObjsOrder();
      } else {
         control.elt.classList.add('oc-add');
         control.elt.querySelector('.order').textContent = objs.length + 1;
         controls.appendChild(control.elt);
         setTimeout(() => {
            control.elt.classList.remove('oc-add');
         }, 300);
      }
   }

   var canvascontainer = document.querySelector('.canvas-container');
   function resize(setContainment = true) {

      resizeCanvas(canvascontainer.clientWidth, canvascontainer.clientHeight);

      let vp = mySketch.gs.viewport;
      mySketch.gs.width = width;
      mySketch.gs.height = height;
      mySketch.gs.transform.onchange(true);

      if (angles.minAngle(new vector(1, 0), vector.fromAngle(mySketch.gs.transform.xAngle)).toFixed(3) === (0).toFixed(3) && angles.minAngle(new vector(1, 0), vector.fromAngle(mySketch.gs.transform.yAngle)).toFixed(3) === (Math.PI / 2).toFixed(3)) {
         mySketch.gs.transform.invokeOnchange = false;
         mySketch.gs.transform.transformOrigin = undefined;
         let xs = mySketch.gs.transform.xScale;
         mySketch.gs.transform.setViewport(vp, null, true);
         mySketch.gs.transform.invokeOnchange = true;
         mySketch.gs.transform.onchange();
      }

      if (setContainment) {

         $(".sidebar-container .resizer")
            .draggable('option', 'containment', getContainment());
            // .css({ left: document.querySelector('.sidebar-container').clientWidth + 'px' });
      }

      mySketch.update();

   }

   function getContainment() {
      let sidebarStyle = window.getComputedStyle(document.querySelector('.sidebar-container'));
      let min = parseInt(sidebarStyle.minWidth.replace('px', '')),
         max = parseInt(sidebarStyle.maxWidth.replace('px', ''));
      /// this is for solving the problem when the max width 30%vw is lower than the min width 300px,
      ///   - which cuase a problem with the position (style.left) of the resizer. 
      if (min > max) {
         return [
            min, 0,
            min,
            parseInt(sidebarStyle.height.replace('px', ''))
         ];
      } else {
         return [
            min, 0,
            max,
            parseInt(sidebarStyle.height.replace('px', ''))
         ];
      }

   }

   class pen{
       constructor(color, weight = 1, style = 'solid'){
           this.color = color;
           this.weight = weight;
           this.style = style;
       }
       setup(canvas) {
           canvas.stroke(...this.color.toArray());
           canvas.strokeWeight(this.weight);
           canvas.noFill();
       }
   }

   class color{
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
   }

   /**
    * our color is an object has r g b as properties. {r: num, g: num, b: num}
    */
   class colorPackage{
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
           return new drawing.color(random(255), random(255),  random(255));
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

   function measureString(txt) {
       return canvas.elt.getContext("2d").measureText(txt);
   }

   var drawing$1 = /*#__PURE__*/Object.freeze({
      __proto__: null,
      pen: pen,
      color: color,
      colorPackage: colorPackage,
      measureString: measureString
   });

   function canvasEvents() {
      let mousepressed;

      canvas.elt.addEventListener('mousedown', (e) => {
         Object.assign(subTools, {
            type: subTools.type,
            mouse: new vector(mouseX, mouseY),
            iVector: new vector(...mySketch.gs.iVector.toArray()),
            jVector: new vector(...mySketch.gs.iVector.toArray())
         });

         mousepressed = true;
         if (subTools.type.search('axises') > -1) {
            let xEq = lines.lineEquation(-mySketch.gs.transform.xAngle, mySketch.gs.center),
               yEq = lines.lineEquation(-mySketch.gs.transform.yAngle, mySketch.gs.center);
            let d = 10;
            if (lines.distToLine(subTools.mouse, xEq) < d * 3 && lines.distToLine(subTools.mouse, yEq) < d * 3) {
               subTools.axis = 'xy';
               subTools.xSpace = mySketch.gs.transform.xSapce;
               subTools.ySpace = mySketch.gs.transform.ySapce;
               subTools.xAngle = mySketch.gs.transform.xAngle;
               subTools.yAngle = mySketch.gs.transform.yAngle;
               subTools.transformOrigin = new vector(mySketch.gs.center.x, mySketch.gs.center.y);
               subTools.xPenColor = Object.assign(new drawing.color(), mySketch.coor.coorSettings.penXaxis.color);
               subTools.yPenColor = Object.assign(new drawing.color(), mySketch.coor.coorSettings.penYaxis.color);
               mySketch.coor.coorSettings.penXaxis.color = new drawing.color(255, 0, 0, 155);
               mySketch.coor.coorSettings.penYaxis.color = new drawing.color(255, 0, 0, 155);
            }
            else if (lines.distToLine(subTools.mouse, xEq) < d) {
               subTools.axis = 'x';
               subTools.space = mySketch.gs.transform.xSapce;
               subTools.angle = mySketch.gs.transform.xAngle;
               let o = new vector(math.constrain(mySketch.gs.center.x, 0, mySketch.gs.width), math.constrain(mySketch.gs.center.y, 0, mySketch.gs.height));
               if (o.x !== mySketch.gs.center.x) {
                  o = subTools.mouse;
               }
               subTools.transformOrigin = o;
               subTools.penColor = [mySketch.coor.coorSettings.penXaxis.color].slice()[0];
               mySketch.coor.coorSettings.penXaxis.color = new drawing.color(255, 0, 0, 155);
            }
            else if (lines.distToLine(subTools.mouse, yEq) < d) {
               subTools.axis = 'y';
               subTools.space = mySketch.gs.transform.ySapce;
               subTools.angle = mySketch.gs.transform.yAngle;
               let o = new vector(math.constrain(mySketch.gs.center.x, 0, mySketch.gs.width), math.constrain(mySketch.gs.center.y, 0, mySketch.gs.height));
               if (o.y !== mySketch.gs.center.y) {
                  o = subTools.mouse;
               }
               subTools.transformOrigin = o;
               subTools.penColor = [mySketch.coor.coorSettings.penYaxis.color].slice()[0];
               mySketch.coor.coorSettings.penYaxis.color = new drawing.color(255, 0, 0, 155);
            }
            else {
               subTools.axis = undefined;
            }
            subTools.increment = 0;
            mySketch.draw();
         } else if (subTools.type === 'zoom') {
            subTools.pxViewport = {};
         }
         e.preventDefault();
         e.stopPropagation();
      });

      window.addEventListener('mouseup', (e) => {
         if (mousepressed) {
            mousepressed = false;
            if (subTools.type === 'move') {
               mySketch.draw();
            }
            else if (subTools.type.search('axises') > -1) {
               if (subTools.axis == 'x') {
                  mySketch.coor.coorSettings.penXaxis.color = subTools.penColor;
                  mySketch.draw();
               } else if (subTools.axis == 'y') {
                  mySketch.coor.coorSettings.penYaxis.color = subTools.penColor;
                  mySketch.draw();
               } else if (subTools.axis == 'xy') {
                  mySketch.coor.coorSettings.penXaxis.color = subTools.xPenColor;
                  mySketch.coor.coorSettings.penYaxis.color = subTools.yPenColor;
                  mySketch.draw();
               }
            }
            else if (subTools.type === 'zoom') {
               if (subTools.pxViewport.width && subTools.pxViewport.height) {
                  mySketch.gs.transform.transformOrigin = undefined;
                  mySketch.gs.transform.setViewport(mySketch.gs.transform.getViewport(subTools.pxViewport), new vector(subTools.pxViewport.xmin, subTools.pxViewport.ymin));
               }
               showTransDetails([
                  'x: {',
                  `  xmin: ${mySketch.gs.viewport.xmin},`,
                  `  xmax: ${mySketch.gs.viewport.xmax}`,
                  '},',
                  'y: {',
                  `  ymin: ${mySketch.gs.viewport.ymin},`,
                  `  ymax: ${mySketch.gs.viewport.ymax}`,
                  '}',
               ]);
               mySketch.update();
            }

            e.preventDefault();
            e.stopPropagation();
         }
      });

      window.addEventListener('mousemove', (e) => {
         if (mousepressed) {
            switch (subTools.type) {
               case 'move':
                  {
                     moveCoor();
                     break;
                  }
               case 'scale-axises':
                  {
                     scaleAxises();
                     break;
                  }
               case 'rotate-axises':
                  {
                     rotateAxises();
                     break;
                  }
               case 'zoom':
                  {
                     zoomBox(e);
                     break;
                  }
            }
            e.preventDefault();
         }
      });

      canvas.elt.addEventListener('mousewheel', (e) => {
         {
            e.preventDefault();
            e.stopPropagation();
            if (e.wheelDelta > 0) {
               mySketch.gs.transform.zoomIn(new vector(mouseX, mouseY));
               mySketch.update();
            } else {
               mySketch.gs.transform.zoomOut(new vector(mouseX, mouseY));
               mySketch.update();
            }
         }
      });

      //#region mouse move (tools'-subtools') functions

      function moveCoor(e) {
         mySketch.gs.transform.translate(new vector(mouseX - subTools.mouse.x, mouseY - subTools.mouse.y));
         mySketch.update();
         ellipse(mouseX, mouseY, 10);
         subTools.mouse = new vector(mouseX, mouseY);
      }

      function scaleAxises(e) {
         if (subTools.axis == 'x') {
            let rotatedMouse = subTools.mouse;
            let xEq = lines.lineEquation(-mySketch.gs.transform.xAngle, mySketch.gs.center);
            let incre = (math.dist(mouseX, mouseY, rotatedMouse.x, rotatedMouse.y) ** 2 - lines.distToLine(new vector(mouseX, mouseY), xEq) ** 2) ** 0.5;

            mySketch.gs.transform.transformOrigin = undefined;
            if (!isNaN(incre)) {
               let mina = angles.minAngle(vector.fromAngle(-mySketch.gs.transform.xAngle), new vector(mouseX, mouseY).subtract(rotatedMouse));
               let dir = mina < Math.PI / 2 ? 1 : (mina > Math.PI / 2 ? -1 : 0);

               mySketch.gs.transform.transformOrigin = subTools.transformOrigin;
               mySketch.gs.transform.xSpace += (incre * dir - subTools.increment);
               mySketch.gs.transform.reformXspace();
               subTools.increment = incre * dir;
            }

            mySketch.gs.transform.onchange(true);
            mySketch.update();
            ellipse(rotatedMouse.x, rotatedMouse.y, 10);
            ellipse(mouseX, mouseY, 10);

            showTransDetails([
               `*${(mySketch.gs.iVector.mag / subTools.iVector.mag).toFixed(2)}`
            ]);

         } else if (subTools.axis == 'y') {
            let rotatedMouse = subTools.mouse;
            let yEq = lines.lineEquation(-mySketch.gs.transform.yAngle, mySketch.gs.center);
            let incre = (math.dist(mouseX, mouseY, rotatedMouse.x, rotatedMouse.y) ** 2 - lines.distToLine(new vector(mouseX, mouseY), yEq) ** 2) ** 0.5;

            mySketch.gs.transform.transformOrigin = undefined;
            if (!isNaN(incre)) {
               let mina = angles.minAngle(vector.fromAngle(-mySketch.gs.transform.yAngle), new vector(mouseX, mouseY).subtract(rotatedMouse));
               let dir = mina < Math.PI / 2 ? 1 : (mina > Math.PI / 2 ? -1 : 0);

               mySketch.gs.transform.transformOrigin = subTools.transformOrigin;
               mySketch.gs.transform.ySpace += (incre * dir - subTools.increment);
               mySketch.gs.transform.reformYspace();
               subTools.increment = incre * dir;
            }

            mySketch.gs.transform.onchange(true);
            mySketch.update();
            ellipse(rotatedMouse.x, rotatedMouse.y, 10);
            ellipse(mouseX, mouseY, 10);
            showTransDetails([
               `*${(mySketch.gs.jVector.mag / subTools.jVector.mag).toFixed(2)}`
            ]);
         }
         else if (subTools.axis == 'xy') {
            let midEq = lines.lineEquation(-(mySketch.gs.transform.yAngle + mySketch.gs.transform.xAngle) / 2, mySketch.gs.center);
            let rotatedMouse = lines.projectionToLine(subTools.mouse, midEq); // rotatedMouse here is the modified start point which sets on the line between x and y axises 

            let incre = (math.dist(mouseX, mouseY, rotatedMouse.x, rotatedMouse.y) ** 2 - lines.distToLine(new vector(mouseX, mouseY), midEq) ** 2) ** 0.5; // pathagorean's method 

            mySketch.gs.transform.transformOrigin = undefined;
            if (!isNaN(incre)) {
               let mina = angles.minAngle(vector.fromAngle(-mySketch.gs.transform.yAngle), new vector(mouseX, mouseY).subtract(rotatedMouse));
               let dir = mina < Math.PI / 2 ? 1 : (mina > Math.PI / 2 ? -1 : 0);

               mySketch.gs.transform.transformOrigin = subTools.transformOrigin;
               let ratio = (mySketch.gs.transform.ySpace + (incre * dir - subTools.increment)) / mySketch.gs.transform.ySpace;
               ratio = math.constrain(ratio, 0.9, 1.1);
               mySketch.gs.transform.ySpace *= ratio;
               mySketch.gs.transform.xSpace *= ratio;
               mySketch.gs.transform.reformYspace();
               mySketch.gs.transform.reformXspace();
               subTools.increment = incre * dir;
            }

            mySketch.gs.transform.onchange(true);
            mySketch.update();
            ellipse(rotatedMouse.x, rotatedMouse.y, 10);
            ellipse(mouseX, mouseY, 10);
            showTransDetails([
               `*${(mySketch.gs.jVector.mag / subTools.jVector.mag).toFixed(2)}`
            ]);
         }
      }

      function rotateAxises(e) {
         if (subTools.axis == 'x') {
            if (math.dist(mySketch.gs.center.x, mySketch.gs.center.y, mouseX, mouseY) > 10) {
               let rotatedMouse = subTools.mouse;
               let rotationAngle = angles.angle(subTools.mouse.subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), new vector(mouseX, mouseY).subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), 'vectors');
               rotationAngle = angles.constrainAngle(rotationAngle);
               if (!isNaN(rotationAngle)) {
                  // mySketch.gs.transform.xAngle = snapAngle(subTools.angle - rotationAngle);
                  mySketch.gs.transform.xAngle = angles.snapAngle(subTools.angle - rotationAngle, [0, Math.PI]);
                  let center = mySketch.gs.center;
                  rotatedMouse = center.add(subTools.mouse.subtract(center).rotate(rotationAngle));
               }

               mySketch.gs.transform.transformOrigin = undefined;
               mySketch.gs.transform.invokeOnchange = true;
               mySketch.gs.transform.onchange();
               mySketch.update();

               ellipse(rotatedMouse.x, rotatedMouse.y, 10);
               ellipse(mouseX, mouseY, 10);
               showTransDetails([
                  `xAngle: ${angles.stringDegAngle(mySketch.gs.transform.xAngle.toFixed(2))}`,
                  `rotationAngle: ${angles.stringDegAngle(-rotationAngle)}`
               ]);
            }
         } else if (subTools.axis == 'y') {
            if (math.dist(mySketch.gs.center.x, mySketch.gs.center.y, mouseX, mouseY) > 10) {

               let rotatedMouse = subTools.mouse;
               let rotationAngle = angles.angle(subTools.mouse.subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), new vector(mouseX, mouseY).subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), 'vectors');
               rotationAngle = angles.constrainAngle(rotationAngle);
               if (!isNaN(rotationAngle)) {
                  mySketch.gs.transform.yAngle = angles.snapAngle(subTools.angle - rotationAngle);
                  let center = mySketch.gs.center;
                  rotatedMouse = center.add(subTools.mouse.subtract(center).rotate(rotationAngle));
               }

               mySketch.gs.transform.invokeOnchange = true;
               mySketch.gs.transform.onchange();
               mySketch.update();
               ellipse(rotatedMouse.x, rotatedMouse.y, 10);
               ellipse(mouseX, mouseY, 10);
               showTransDetails([
                  `yAngle: ${angles.stringDegAngle(mySketch.gs.transform.yAngle.toFixed(2))}`,
                  `rotationAngle: ${angles.stringDegAngle(-rotationAngle)}`
               ]);
            }
         } else if (subTools.axis == 'xy') {
            if (math.dist(mySketch.gs.center.x, mySketch.gs.center.y, mouseX, mouseY) > 10) {
               let rotatedMouse = subTools.mouse;
               let rotationAngle = angles.angle(subTools.mouse.subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), new vector(mouseX, mouseY).subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), 'vectors');
               rotationAngle = angles.constrainAngle(rotationAngle);
               if (!isNaN(rotationAngle)) {
                  mySketch.gs.transform.xAngle = subTools.xAngle - rotationAngle;
                  mySketch.gs.transform.yAngle = subTools.yAngle - rotationAngle;
                  let center = mySketch.gs.center;
                  rotatedMouse = center.add(subTools.mouse.subtract(center).rotate(rotationAngle));
               }

               mySketch.gs.transform.invokeOnchange = true;
               mySketch.gs.transform.onchange();
               mySketch.update();
               ellipse(rotatedMouse.x, rotatedMouse.y, 10);
               ellipse(mouseX, mouseY, 10);
               showTransDetails([
                  `xAngle: ${angles.stringDegAngle(mySketch.gs.transform.xAngle)}`,
                  `yAngle: ${angles.stringDegAngle(mySketch.gs.transform.yAngle)}`,
                  `rotationAngle: ${angles.stringDegAngle(-rotationAngle)}`
               ]);
            }
         }
      }

      function zoomBox(e) {

         //#region calculating box
         let s = { xmin: subTools.mouse.x, ymin: subTools.mouse.y, xmax: mouseX, ymax: mouseY };

         subTools.pxViewport.xmin = Math.min(s.xmin, s.xmax); subTools.pxViewport.ymin = Math.min(s.ymin, s.ymax);
         subTools.pxViewport.xmax = Math.max(s.xmin, s.xmax); subTools.pxViewport.ymax = Math.max(s.ymin, s.ymax);
         subTools.pxViewport.width = subTools.pxViewport.xmax - subTools.pxViewport.xmin;
         subTools.pxViewport.height = subTools.pxViewport.ymax - subTools.pxViewport.ymin;
         s = subTools.pxViewport;
         let slice;
         if (s.width < 10 && s.height < 10) {
            s.width = 0;
            s.height = 0;
         }
         // reserved ratios
         if (document.querySelector('#subtools-zoom-rr').checked || e.shiftKey) {
            let a = angles.minAngle(vector.fromAngle(0), new vector(mySketch.gs.width, mySketch.gs.height));
            let equ = lines.lineEquation(a, subTools.mouse);
            let p = lines.projectionToLine(new vector(mouseX, mouseY), equ);
            s = { xmin: subTools.mouse.x, ymin: subTools.mouse.y, xmax: Math.round(p.x), ymax: Math.round(p.y) };
            subTools.pxViewport.xmin = Math.min(s.xmin, s.xmax); subTools.pxViewport.ymin = Math.min(s.ymin, s.ymax);
            subTools.pxViewport.xmax = Math.max(s.xmin, s.xmax); subTools.pxViewport.ymax = Math.max(s.ymin, s.ymax);
            subTools.pxViewport.width = subTools.pxViewport.xmax - subTools.pxViewport.xmin;
            subTools.pxViewport.height = subTools.pxViewport.ymax - subTools.pxViewport.ymin;
            s = subTools.pxViewport;
         }
         else {
            if (s.height < 10 && s.width > 10) {
               slice = { type: 'vertical' };
               s.ymin = 0;
               s.ymax = mySketch.gs.height;
               s.height = mySketch.gs.height;
            }
            else if (s.height > 10 && s.width < 10) {
               slice = { type: 'horizental' };
               s.xmin = 0;
               s.xmax = mySketch.gs.width;
               s.width = mySketch.gs.width;
            }
         }
         //#endregion

         //#region drawing box
         mySketch.subcanvas.resizeCanvas(mySketch.gs.width, mySketch.gs.height);
         mySketch.subcanvas.clear();
         let c1 = mySketch.canvas.get(0, 0, mySketch.canvas.width, mySketch.canvas.height);
         let c2 = mySketch.canvas.get(s.xmin, s.ymin, s.width, s.height);
         mySketch.subcanvas.image(c1, 0, 0);
         let fadeColor = mySketch.coor.coorSettings.background.isDark() ? [255, 155] : [0, 155];
         mySketch.subcanvas.background(...fadeColor);
         if (s.width && s.height) {
            let size = 10,
               sw = 4 + (4), r = 3;
            if (!slice) {

               mySketch.subcanvas.stroke(0);
               mySketch.subcanvas.strokeWeight(sw);
               mySketch.subcanvas.rect(s.xmin, s.ymin, size, size, r);
               mySketch.subcanvas.rect(s.xmax - size, s.ymin, size, size, r);
               mySketch.subcanvas.rect(s.xmin, s.ymax - size, size, size, r);
               mySketch.subcanvas.rect(s.xmax - size, s.ymax - size, size, size, r);

               mySketch.subcanvas.stroke(255, 200);
               mySketch.subcanvas.strokeWeight(sw - 4);
               mySketch.subcanvas.rect(s.xmin, s.ymin, size, size, r);
               mySketch.subcanvas.rect(s.xmax - size, s.ymin, size, size, r);
               mySketch.subcanvas.rect(s.xmin, s.ymax - size, size, size, r);
               mySketch.subcanvas.rect(s.xmax - size, s.ymax - size, size, size, r);

            } else {
               let size = 20,
                  sw = 4 + (4), r = 3;
               if (slice.type === 'vertical') {
                  mySketch.subcanvas.stroke(0);
                  mySketch.subcanvas.strokeWeight(sw);
                  mySketch.subcanvas.rect(s.xmin, subTools.mouse.y - size / 2, size, size, r);
                  mySketch.subcanvas.rect(s.xmax - size, subTools.mouse.y - size / 2, size, size, r);
                  mySketch.subcanvas.stroke(255, 200);
                  mySketch.subcanvas.strokeWeight(sw - 4);
                  mySketch.subcanvas.rect(s.xmin, subTools.mouse.y - size / 2, size, size, r);
                  mySketch.subcanvas.rect(s.xmax - size, subTools.mouse.y - size / 2, size, size, r);
               } else {
                  mySketch.subcanvas.stroke(0);
                  mySketch.subcanvas.strokeWeight(8);
                  mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymin, size, size, r);
                  mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymax - size, size, size, r);
                  mySketch.subcanvas.stroke(255, 200);
                  mySketch.subcanvas.strokeWeight(4);
                  mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymin, size, size, r);
                  mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymax - size, size, size, r);
               }
            }

            mySketch.subcanvas.image(c2, s.xmin, s.ymin);
         }
         image(mySketch.subcanvas, 0, 0);

         //#endregion

      }

      /**
       * @param {Array} messeges ::: Array of string which will be converted into p html element
       */
      function showTransDetails(messeges) {
         let html = '<div class="subtools-details">';
         for (let msg of messeges) {
            html += '<p>' + msg + '</p>';
         }
         html += '</div>';
         subTools.details.setContent(html);
         subTools.details.show();
      }

      //#endregion

   }

   //#endregion

   function toolsEvents() {

      //#region zoom

      let zoom = (direction) => {
         var delay = 20;
         setTimeout(() => {
            if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
            setTimeout(() => {
               if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
               setTimeout(() => {
                  if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                  setTimeout(() => {
                     if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                     setTimeout(() => {
                        if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                        setTimeout(() => {
                           if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                           setTimeout(() => {
                              if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                              setTimeout(() => {
                                 if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                              }, delay);
                           }, delay);
                        }, delay);
                     }, delay);
                  }, delay);
               }, delay);
            }, delay);
         });
      };

      document.querySelector('#zoom-in-btn').addEventListener('click', () => {
         zoom('in');
      });

      document.querySelector('#zoom-out-btn').addEventListener('click', () => {
         zoom('out');
      });

      //#endregion tool - subtools events

      let inputCall = () => {
         subTools.type = el.checked ? el.dataset.type : subTools.type;
      };
      let radios = document.querySelectorAll('.subtools-container input[type*="radio"]');
      radios.forEach(el => {
         subTools.type = el.checked ? el.dataset.type : subTools.type;
         el.addEventListener('change', inputCall);
      });

      document.querySelector('#home').addEventListener('click', () => {
         mySketch.gs.reset();
         mySketch.update();
      });

      document.querySelector('#centrate').addEventListener('click', () => {
         mySketch.gs.centrate();
         mySketch.update();
      });

   }

   function setEvents () {
      window.addEventListener('resize', resize);

      document.querySelector('.new-control .new-expr').addEventListener('click', (e) => {
         let oc = new ChildControl$1(mySketch);
         addOC(oc);
      });

      canvasEvents();
      toolsEvents();
   }

   /**
    * """""""""""""""" reminder
    * app folder is associated with PLOTTO folder, both of them depends upon the other.
    */
    
   function setupAPP() {

     window.MP = MathPackage;
     window.angles = MP.Angles;
     window.lines = MP.Lines;
     window.math = MP.Core;
     window.drawing = drawing$1;
     window.vector = MP.entities.Vector;
     window.MQ = MathQuill.getInterface(2);
     window.mySketch = new Sketch();
     window.canvas = mySketch.canvas;
     canvas.parent(document.querySelector('.canvas-container'));

     let mathFields = $(".math-field");
     for (let i = 0; i < mathFields.length; i++) {
       MQ.StaticMath(mathFields[i]);
     }

     setEvents();

     setupResizer();
     setupSortable();
     
     resize();

     $('#loading-layer').fadeOut(1000, () => { 
       document.querySelector('.new-control .new-expr').click();
     });

     console.log('all-done');

   }

   function setupResizer(){

     //#region sidebar-resizer

     var sidebar = document.querySelector(".sidebar-container");
     var sidebarResizer = sidebar.querySelector(".resizer");
     let srDraggingConfig = {}; // sidebarResizerDraggingConfig

     $(sidebarResizer).draggable({
       axis: 'x',
       containment: getContainment(),

       start: (e) => {
         sidebarResizer.classList.add('dragging');
         srDraggingConfig.intialWidth = sidebar.clientWidth;
         srDraggingConfig.intialOffset = e.pageX;
         srDraggingConfig.cursor = document.body.style.cursor;
         document.body.style.cursor = 'e-resize';
       },

       stop: () => {
         sidebarResizer.classList.remove('dragging');
         sidebar.style.flexBasis = sidebarResizer.style.left;
         document.body.style.cursor = srDraggingConfig.cursor;
       },

       drag: () => {
         sidebar.style.flexBasis = sidebarResizer.style.left;
         resize(false);
       }

     });

     //#endregion
     
   }

   function setupSortable(){
     
     //#region sortable-sidebar

     var outer_ccc = document.querySelector('.outer-controls');
     var inner_ccc = outer_ccc.querySelector('.inner-controls');

     let startSorting = true;
     $(".controls.sortable").sortable({
       axis: "y",
       cancel: '.object-control [cancel-move]',

       start: function (e, ui) {
         startSorting = true;
         outer_ccc.classList.add('sorting');
         if (inner_ccc.clientHeight > outer_ccc.clientHeight) {
           outer_ccc.style.overflowY = 'scroll';
         }

         ui.item[0].classList.add('dragging');
         let id = ui.item[0].getAttribute('id');
         for (let child in mySketch.children) {
           if (child.id === id) {
             child.focus();
             continue;
           }
         }
       },

       stop: function (e, ui) {
         if (startSorting) {
           outer_ccc.classList.remove('sorting');
           outer_ccc.style.overflowY = 'auto';
           ui.item[0].classList.remove('dragging');
         } else {
           startSorting = false;
         }
       },

       update: function () {
         updateObjsOrder();
       }

     });
     $(".controls.sortable").disableSelection();

     //#endregion

   }

   return setupAPP;

})));
