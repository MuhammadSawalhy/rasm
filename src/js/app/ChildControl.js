"strict mode";

import { addControl, removeControl, genRandomName, keyboardSettings } from './global.js';
import { Xfunction, Point, EvalExpr, Variable, Empty } from '../PLOTTO/GraphChildren/index.js';
export default class ChildControl {
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

      this.graphChild = graphChild || new Empty({ sketch: mySketch });
      this.__updateElts(null, this.graphChild);

      this.setEvents();
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

      value.handlers.onremove = (removeElt) => {
         if (removeElt) this.remove(false);
      };
      value.handlers.onerror = (e) => {
         this.error(e);
      };
      value.control = this;

      mySketch.children.set(value.id, value); /// changing the id

      this._graphChild = value;
      this.id = value.id;

   }

   setEvents() {
      let scriptELT = this.elt.querySelector('.script');
      this.removeELT = this.elt.querySelector('.remove');
      let orderELT = this.elt.querySelector('.order');

      //#region math, script field
      let mathField = MQ.MathField(scriptELT, {
         handlers: {
            edit: () => {
               this.update(mathField.latex());
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

      this.elt.querySelector('.script').addEventListener('focusin', (e) => {
         this.focus(false);
      });

      this.elt.querySelector('.script').addEventListener('focusout', (e) => {
         this.blur(false);
      });

      this.removeELT.addEventListener('click', (e) => {
         this.remove();
      });

   }

   update(latex, disableHandling) {
      if (!(this.disableHandling || disableHandling)) {
         try {
            this._graphChild.remove();
            let prev = this._graphChild;
            if (latex === '') {
               this.parsedScript = new MagicalParser.Node('');
               this.graphChild = new Empty({ sketch: mySketch });
            } else {
               mySketch.gs.childrenIDs = mySketch.gs.childrenIDs.filter(a => a !== this.id); /// removing the id as if the id didn't not change but the values did, here will be error saying ${this.id} is defined before
               if (latex) {
                  this.parsedScript = null;
                  this.parsedScript = mySketch.scriptParser.parse(MathPackage.Parser.latexTOmaxima(latex));
               }
               if (!this.parsedScript) return; /// syntax error ocurred, no possible update exist, this error happen before and now the parsedString is null, the error elt exists and stop updating all is done
               let props = {};
               if (this.graphChild && this.graphChild.pen) props.pen = this.graphChild.pen;
               this.graphChild = mySketch.childFromParsed(this.parsedScript, props); /// the parsed string is valid, no error are predicted on fetching the gc
            }
            this.__updateElts(prev, this.graphChild);
            this.__checkVars();
         } catch (e) {
            this.error(e);
         }
         // if (!this.id) {
         //    /// consequently, am error occured, before assigning the new gc, after deleting the preious one.
         //    /// reverse the effect
         //    if (this._graphChild) {
         //       this.id = this._graphChild.id;
         //       mySkech.children.set(this.id, this.graphChild);
         //       mySketch.gs.childrenIDs.push(this.id);
         //    }
         // }
         this.__updateDependants();
         mySketch.update();
      }
   }

   __getAll(parsed, check = {}) {
      let vars = [];
      if (parsed.check(check)) {
         return [parsed];
      } else {
         for (let i = 0; i < parsed.args.length; i++) {
            vars = vars.concat(this.__getAll(parsed.args[i], check));
         }
      }
      return vars;
   }

   __checkVars() {

      let vars = this.__getAll(this.parsedScript, { type: 'variable' });
      this.vars = vars;
      let varsNotExist = [];
      let vneError;

      for (let i = 0; i < vars.length; i++)
         if (!Math.hasOwnProperty(vars[i].name) && !(this.graphChild instanceof Xfunction && vars[i].name === 'x')) {
            if (!varsNotExist.find(a => a.name === vars[i].name)) {
               varsNotExist.push(vars[i]);
            }
         } else {
            /// attach that var to me
         }

      if (this.varsNotExist /** from the previous handling not the current one */ && this.varsNotExist.length > 0) {
         /// remove the previous elts
         this.elt.querySelector('.main .vars-not-exist').remove();
         this.varsNotExist = [];
         if (this.isError) {
            this.elt.classList.remove('error');
            this.elt.querySelector('.error-elt').remove();
            this.isError = false;
         }
      }

      if (varsNotExist.length > 0) {
         let addVarsElt = $(`
               <div class='vars-not-exist'>
                  ${varsNotExist.reduce((b, a) => { return b + `<button class="var">${a.name}</button>`; }, '')}
               </div>
               `);

         $('.var', addVarsElt).bind('click', function () {
            alert('adding new var called: ' + this.innerText);
         });

         this.elt.querySelector('.main').append(addVarsElt[0]);
         this.varsNotExist = varsNotExist;
         this.graphChild.renderable = false;
         throw new Error('Undefined vars [' + varsNotExist.reduce((b, a) => { return b + `${a.name}, `; }, '').slice(0, -2) + '], click the button to define.');
      } else {
         this.graphChild.renderable = true;
      }

   }

   __updateDependants() {
      if (this._graphChild instanceof Variable) {
         let size = mySketch.children.size;
         mySketch.children.forEach(gc => {
            size--;
            if (size < 0) return;
            if (gc && gc !== this._graphChild && gc.control.vars) {
               if (gc.control.vars.find(a => this._graphChild.id === a.name))
                  gc.control.update();
            }
         });
      }
   }

   setScript(script, handle = true) {
      if (!handle) {
         this.disableHandling = true;
      }
      this.mathField.latex(script);
      if (!handle) {
         this.disableHandling = false;
      }
   }

   focus(focusTheField = true) {
      if (mySketch.focusedChild && mySketch.focusedChild !== this) mySketch.focusedChild.blur();
      // setting this to be focuses
      mySketch.focusedChild = this;
      keyboardSettings.mathField = this.mathField;
      if (focusTheField) this.mathField.focus();
      this.elt.classList.add('focus');
   }

   blur(blurTheField = true) {
      mySketch.focusedObject = undefined;
      if (blurTheField) this.mathField.blur();
      this.elt.classList.remove('focus');
   }

   error(e) {

      if (this.isError) {
         this.elt.querySelector('.error-elt').remove();
      }
      this.elt.classList.add('error');
      this.isError = true;

      this.graphChild.renderable = false;

      let errorELT = $(`
      <div class="error-elt">
         <i class="fas fa-bug"></i>
      </div>
      `);
      errorELT.balloon({
         html: true, contents: e.message, minLifetime: 1000,
         css: {
            "font-size": '1em',
         }
      });
      errorELT.hide();
      this.elt.querySelector('.side-status').append(errorELT[0]);
      errorELT.fadeOut(0).delay(200).fadeIn(500);

   }

   remove(removeGraphChild = true) {
      removeControl(this);
      if (removeGraphChild) {
         if (this.graphChild) this.graphChild.remove();
      }
      mySketch.update();
   }

   //#region updatingElt

   __updateElts(from, to) {
      if (this.isError) {
         this.elt.classList.remove('error');
         this.elt.querySelector('.error-elt').remove();
         this.isError = false;
      }
      if (to) {
         if (to instanceof Empty) {
            this.__toEmpty();
         } else if (to instanceof Xfunction) {
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
         } else if (to instanceof Variable) {
            if (from instanceof Variable) {
               this.__updateVariable();
            } else {
               this.__toVariable();
            }
         }
      }
   }

   __toEmpty() {
      this.elt.type = 'Xfunction';
      let sideStatus = this.elt.querySelector('.side-status');
      let eltsTOremove = this.elt.querySelectorAll('.special-elt');
      eltsTOremove.forEach(elt => { elt.remove(); });
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
      let eltsTOremove = this.elt.querySelectorAll('.special-elt');
      eltsTOremove.forEach(elt => { elt.remove(); });

      let value = $(`<div class="value special-elt"><span></span></div>`);
      value.hide();
      this.elt.querySelector('.main').append(value[0]);
      value.fadeIn();
      let valueType = $(
         `<div class="value-type special-elt" type=decimal>
            <span><i class="fas fa-divide"></i></span>
         </div>`
      );
      this.elt.querySelector('.side-status').append(valueType[0]);
      valueType.click(() => {
         switch (valueType.attr('type')) {
            case 'decimal':
               valueType.attr('type', 'fract');
               value.height(56);
               break;
            case 'fract':
               valueType.attr('type', 'quotient');
               value.height(56);
               break;
            case 'quotient':
               valueType.attr('type', 'decimal');
               value.height(33);
               break;
         }
         this.__updateEvalExpr();
      });

      this.specialProps = {
         valueType: valueType[0],
         valueElt: value[0]
      };
      this.graphChild.handlers.onrender = () => {
         this.__updateEvalExpr();
      };
      // this.__updateEvalExpr(); /// will be done on updating the sktech
   }

   __updateEvalExpr() {
      this.graphChild.handlers.onrender = () => {
         this.__updateEvalExpr();
      };

      try {
         let value = this.graphChild.eval();
         if (isNaN(value)) throw new Error('error on evaluating, it seems to be cause by undefined variable.');
         switch (this.specialProps.valueType.getAttribute('type')) {
            case 'decimal':
               {
                  this.specialProps.valueElt.innerHTML = `<span>${value}</span>`;
               }
               break;
            case 'fract':
               {
                  let fraction = MathPackage.Core.fraction(value);
                  if (fraction.denominator === 1) {
                     this.specialProps.valueElt.innerHTML = `<span>${fraction.numerator}</span>`;
                  } else {
                     this.specialProps.valueElt.innerHTML = `<span>\\frac{${fraction.numerator}}{${fraction.denominator}}</span>`;
                     MQ.StaticMath(this.specialProps.valueElt.children[0]);
                  }
               }
               break;
            case 'quotient':
               {
                  let fraction = MathPackage.Core.quotientRemainder(value);
                  if (fraction.numerator === 0) {
                     this.specialProps.valueElt.innerHTML = `<span>${fraction.quotient}</span>`;
                  } else {
                     if (fraction.quotient == 0) {
                        this.specialProps.valueElt.innerHTML = `<span>\\frac{${fraction.numerator}}{${fraction.denominator}}</span>`;
                     } else {
                        this.specialProps.valueElt.innerHTML = `<span>${fraction.quotient}\\frac{${fraction.numerator}}{${fraction.denominator}}</span>`;
                     }
                     MQ.StaticMath(this.specialProps.valueElt.children[0]);
                  }
               }
               break;
         }
      } catch (e) {
         this.specialProps.valueElt.innerHTML = '<span>NaN</span>';
         this.error(e);
      }
   }

   __toVariable() {
      this.elt.type = 'Variable';
      let eltsTOremove = this.elt.querySelectorAll('.special-elt');
      eltsTOremove.forEach(elt => { elt.remove(); });

      // for (let [id, gc] of mySketch.children) {
      //    gc.control.update();
      // }

      /// adding slider
      let sliderOuter = $(`
      <div class="slider-outer special-elt">
         <div class='range-container'>
            <span class='slider-controller-toggle'><i class="fas fa-sort-down"></i></span>
            <input type=range class=slider min=-5 max=5 step=0.1 />
            <span class='play-pause'><i class="fas fa-play"></i></span>
         </div>
         <div class='slider-controller'>
            <label>min</label>:<span class="math-field min">-5</span>
            <label>max</label>:<span class="math-field max">5</span>
            <label>step</label>:<span class="math-field step">0.1</span>
         </div>
      </div>`);
      this.elt.querySelector('.main').append(sliderOuter[0]);
      let slider = sliderOuter[0].querySelector('.slider');

      slider.addEventListener('change', () => {
         if (this.specialProps.invokeOnchange) {
            this.graphChild.setValue(parseFloat(slider.value), [false]);
            this.setScript(this.graphChild.id + ' = ' + slider.value, false);
            if (this.isError) {
               /// Math.${id} is undefined so setValue first
               this.isError = false;
               this.__updateDependants();
               this.elt.querySelector('.error-elt').remove();
            }
         }
      });
      $(slider).on('mousemove touchmove', () => {
         if (slider.ismousedown) {
            this.graphChild.setValue(parseFloat(slider.value));
            this.setScript(this.graphChild.id + ' = ' + slider.value, false);
            if (this.isError) {
               /// Math.${id} is undefined so setValue first
               this.isError = false;
               this.__updateDependants();
               this.elt.querySelector('.error-elt').remove();
            }
         }
      });
      $(slider).on('mousedown touchstart', () => {
         slider.ismousedown = true;
      });
      $(slider).on('mouseup touchend', () => {
         slider.ismousedown = false;
      });

      // sliderControllerMathFields
      let scmfs = {
         min: MQ.MathField(sliderOuter[0].querySelector('.slider-controller .math-field.min'), {
            handlers: {
               edit: function () {
                  slider.min = (MathPackage.Parser.maximaTOjsFunction(MathPackage.Parser.latexTOmaxima(scmfs.min.latex())))();
               }
            }
         }),
         max: MQ.MathField(sliderOuter[0].querySelector('.slider-controller .math-field.max'), {
            handlers: {
               edit: function () {
                  slider.max = (MathPackage.Parser.maximaTOjsFunction(MathPackage.Parser.latexTOmaxima(scmfs.max.latex())))();
               }
            }
         }),
         step: MQ.MathField(sliderOuter[0].querySelector('.slider-controller .math-field.step'), {
            handlers: {
               edit: function () {
                  slider.step = Math.max(0.01, MathPackage.Parser.maximaTOjsFunction(MathPackage.Parser.latexTOmaxima(scmfs.step.latex()))());
               }
            }
         })
      };

      /// the special properties for this specific type of GraphChild
      this.specialProps = {
         slider, scmfs,
         invokeOnchange: true
      };

      this.__updateVariable();
   }

   __updateVariable() {
      this.graphChild.handlers.onchange = (updateSlider = true) => {
         if (updateSlider)
            slider.value = this.graphChild.getValue();
         mySketch.update(true, false);
      };

      let slider = this.specialProps.slider;
      let value = this.graphChild.getValue();


      this.specialProps.scmfs.min.latex(Math.min(parseFloat(slider.min), parseFloat(value)));
      this.specialProps.scmfs.max.latex(Math.max(parseFloat(slider.max), parseFloat(value)));

      this.specialProps.invokeOnchange = false;
      slider.value = value;
      this.specialProps.invokeOnchange = true;

      // this.setScript(this.graphChild.id + ' = ' + slider.value, false);
   }

   //#endregion

}