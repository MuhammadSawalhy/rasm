import { addControl, removeControl, genRandomName } from './global.js';
import { Xfunction } from '../PLOTTO/GraphChilds/index.js';
export default class {
   constructor(graphChild) {
      if (graphChild) {
         this.graphChild = graphChild;
      } else {
         this.id = genRandomName();
         mySketch.children.set(this.id, null);
      }

      this.elt = document.createElement('div');
      this.elt.innerHTML = `
      <li class="control" id="${this.id}">
        <div class="sideStatus" cancel-move>
          <div class="visible">
            <div class="inner">
              
            </div>
          </div>
          <div class="order-container">
            <span class='order'>12</span>
          </div>
        </div>
        <div class="script-container" cancel-move cancel-hiding-keypad>
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
   get graphChild() {
      return this._graphChild;
   }

   set graphChild(value) {
      if (!value) {
         /// delete the current graphChild from the sketch
         this._graphChild.remove([false]);
      } else {
         value.handlers.onremove = (removeElt) => {
            if (removeElt) this.remove(false);
         };
         mySketch.children.delete(this.id);
         mySketch.children.set(value.id, value);
         this._graphChild = value;
         this.id = value.id;
         mySketch.update();
      }
     
   }

   __setEvents() {
      let scriptELT = this.elt.querySelector('.script');
      this.removeELT = this.elt.querySelector('.remove');
      this.orderELT = this.elt.querySelector('.order');

      //#region math, script field
      let handleScript = (latex) => (this.handleScript(latex) );
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
         newGC = mySketch.childFromString(
            MathPackage.Parser.latexTOmaxima(latex)
         );
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

   __updateElts() {
      if (this.graphChild) {
         if (this.graphChild instanceof Xfunction) {
            this.elt.style.background = this.graphChild.color;
         }
      }
   }
}


