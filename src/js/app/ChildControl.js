import { addControl, removeControl, genRandomName } from './global.js';
import { Xfunction, Point, EvalExpr } from '../PLOTTO/GraphChilds/index.js';
export default class {
   constructor(graphChild) {
      this.elt = document.createElement('div');
      this.elt.innerHTML = `
      <li class="control" id="${this.id}">
        <div class="side-status" cancel-move>
          <div class="order-container">
            <span class='order'>12</span>
          </div>
        </div>
        <div class="main" cancel-move cancel-hiding-keypad>
         <div class=script-container><span type="text" class="script"></span></div>
        </div>
        <div class="side-ctrl">
          <button class="closebtn-2 remove" cancel-move><div class="inner"></div></button>
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

      if (graphChild) {
         this.graphChild = graphChild;
      } else {
         this.id = genRandomName();
         mySketch.children.set(this.id, null);
      }

      this.__setEvents();
   }

   get id() {
      return this._id;
   }
   set id(newid) {
      this._id = newid;
      this.elt.id = newid;
   }

   get graphChild() {
      return this._graphChild;
   }
   set graphChild(value) {
      if (!value && this._graphChild) {
         /// delete the current graphChild from the sketch
         this._graphChild.drawable = false;
      } else if (value) {
         value.handlers.onremove = (removeElt) => {
            if (removeElt) this.remove(false);
         };
         mySketch.children.delete(this.id);
         mySketch.children.set(value.id, value); /// changing the id
         let prev = this._graphChild;
         this._graphChild = value;
         this.id = value.id;
         this.__updateElts(prev, value);
         mySketch.update();
         
      }
   }

   __setEvents() {
      let scriptELT = this.elt.querySelector('.script');
      this.removeELT = this.elt.querySelector('.remove');
      this.orderELT = this.elt.querySelector('.order');

      //#region math, script field
      let handleScript = (latex) => (this.handleScript(latex));
      let mathField = MQ.MathField(scriptELT, {
         sumStartsWithNEquals: true,
         supSubsRequireOperand: true,
         // charsThatBreakOutOfSupSub: '+-=<>',
         autoSubscriptNumerals: true,
         autoCommands: 'pi theta sqrt abs floor ceil round random sum int prod',
         // // autoOperatorNames: '',
         maxDepth: 10,
         handlers: {
            edit: function () {
               handleScript(mathField.latex());
            },

            enter: function () {
               let newChild = new ChildControl();
               addControl(newChild, parseInt(orderELT.textContent));
               newChild.focus();
            },
         }
      });
      this.mathField = mathField;
      //#endregion 

      this.removeELT.addEventListener('click', (e) => {
         this.remove();
      });

   }

   handleScript(latex) {
      let newGC;
      try {
         let props = {};
         if (this.graphChild && this.graphChild.pen) props.pen = this.graphChild.pen;
         newGC = mySketch.childFromString(
            MathPackage.Parser.latexTOmaxima(latex), props);
      } catch (e) {
         this.error(e);
      }
      this.graphChild = newGC;
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

   error(e) {
      console.log(e);
   }

   remove(removeGraphChild = true) {
      removeControl(this);
      if (removeGraphChild) {
         this.graphChild.remove();
      }
      mySketch.update();
   }

   //#region updatingElt

   __updateElts(from, to) {
      if (to) {
         if (to instanceof Xfunction) {
            if (from instanceof Xfunction) {
               this.__updateXfunction();
            } else {
               this.__toXfunction();
            }
         } else if (to instanceof EvalExpr) {
            if (from instanceof EvalExpr) {
               this.__updateEvalExpr();
            } else {
               this.__toEvalExpr();
            }
         }
      }
   }

   __toXfunction() {
      this.elt.type = 'Xfunction';
      let sideStatus = this.elt.querySelector('.side-status');
      let eltsTOremove = this.elt.querySelectorAll('.special-elt');
      eltsTOremove.forEach(elt => { elt.remove(); });
      sideStatus.append($(`<div class="visible special-elt"><div class="inner"></div></div>`)[0]);
      this.__updateXfunction();
   }
   __updateXfunction() {
      let visibleELt = this.elt.querySelector('.side-status').querySelector('.visible');
      visibleELt.setAttribute('style', `--color: ${this.graphChild.pen.color.toString()}`);
   }

   __toEvalExpr() {
      this.elt.type = 'EvalExpr';

      let main = this.elt.querySelector('.main');
      let sideStatus = this.elt.querySelector('.side-status');
      let eltsTOremove = this.elt.querySelectorAll('.special-elt');

      eltsTOremove.forEach(elt => { elt.remove(); });

      main.append($(`<div class="value special-elt"><span></span></div>`)[0]);
      sideStatus.append($(`<div class="isFract special-elt"><input type='checkbox'/><label></label></div>`)[0]);

      this.__updateEvalExpr();
   }
   __updateEvalExpr() {
      let main = this.elt.querySelector('.main');
      let value = main.querySelector('.value span');
      value.textContent = this.graphChild.eval();
   }

   //#endregion


}


