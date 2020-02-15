import { addControl, removeControl } from './global.js';

export default class {
   constructor(sketch, value) {
      if (!sketch) throw new Error('sketch is not valid.');
      this.sketch = sketch;
      this.gs = this.sketch.gs;
      // value is the graph object
      this.value = value;
      this.elt = document.createElement('div');
      this.elt.innerHTML = `
      <li class="control">
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
          <span type="text" class="script"></span>
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
      let scriptELT = this.elt.querySelector('.script');
      this.removeELT = this.elt.querySelector('.remove');
      this.orderELT = this.elt.querySelector('.order');

      //#region math, script field
      let checkExpr = (latex) => {
         this.graphObject = getObject(
            this.sketch,
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
               let newChild = new ChildControl(sketch);
               addControl(newChild, parseInt(orderELT.textContent));
               newChild.focus();
            },
         }
      });
      this.mathField = mathField;
      //#endregion 

      this.removeELT.addEventListener('click', (e) => {
         removeControl(this);
         this.remove();
      });

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
      let me = this.sketch.removeChildById(this.sketchChild.id);
   }

   __updateElts() {
      if (this.graphObject) {
         if (this.graphObject instanceof Xfunction) {
            this.elt.style.background = this.graphObject.color;
         }
      }
   }
}


