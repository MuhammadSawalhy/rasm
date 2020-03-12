
import { addControl, removeControl, genRandomName, keypadSettings, slidersController } from './global.js';
import { Xfunction, XYfunction, Point, EvalExpr, Variable, Empty, Slider, Func } from '../PLOTTO/GraphChildren/index.js';
import { UndefError, ExistBefore } from '../PLOTTO/Errors/index.js';
import { getJSfunction } from '../PLOTTO/global.js';
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

      this.status = 'ready';
      this.graphChild = graphChild || new Empty({ sketch: mySketch, control: this });
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
      this._graphChild = value;
      this.id = value.id;
   }

   setEvents() {
      let scriptELT = this.elt.querySelector('.script');
      this.removeELT = this.elt.querySelector('.remove');
      this.orderELT = this.elt.querySelector('.order');

      //#region math, script field
      let mathField = MQ.MathField(scriptELT, {
         handlers: {
            edit: () => {
               this.update(mathField.latex());
            },

            enter: () => {
               this.enter();
            },
         }
      });
      this.mathField = mathField;
      //#endregion 

      this.elt.querySelector('.main').addEventListener('focusin', (e) => {
         this.focus(false);
      });

      this.elt.querySelector('.main').addEventListener('focusout', (e) => {
         this.blur(false);
      });

      this.removeELT.addEventListener('click', (e) => {
         this.remove();
      });

   }

   async update(latex) {
      if (!this.disableHandling) {
         if (this.status === 'ready') {
            if (this._graphChild instanceof Slider) {
               if ($('.slider-outer', this.elt).hasClass('play')) {
                  $('.play-pause', this.elt).trigger('click');
               }
            }
            this.status = 'updating';
            this._graphChild.remove();
            this.id = undefined;
            try {
               let prev = this._graphChild;
               if (latex === '') {
                  this.parsedScript = new MagicalParser.Node('');
                  this.graphChild = new Empty({ sketch: mySketch });
               } else {
                  if (latex) {
                     this.parsedScript = null; /// so when an error occur in the next code, in the necxt time the parsed script will be null.
                     this.parsedScript = mySketch.scriptParser.parse(MathPackage.Parser.latexTOmaxima(latex));
                     this.vars = this.__getAll(this.parsedScript, { type: 'variable' }).map(a => a.name);
                     this.funcs = this.__getAll(this.parsedScript, { type: 'functionCalling' }).map(a => a.name);
                  }
   
                  if (!this.parsedScript) return; /// syntax error ocurred, no possible update exist, this error happen before and now the parsedString is null, the error elt exists and stop updating all is done
   
                  let props = {
                     handlers: {
                        onremove: (removeElt) => {
                           if (removeElt) this.remove(false);
                        },
                        onerror: (e) => {
                           this.error(e);
                        }
                     },
                     control: this,
                  };
   
                  if (this.graphChild && this.graphChild.pen) props.pen = this.graphChild.pen;
                  this.graphChild = mySketch.childFromParsed(this.parsedScript, props); /// the parsed string is valid, no error are predicted on fetching the gc
               }
               this.__updateElts(
                  prev,
                  this.graphChild
               );
            } catch (e) {
               this.error(e);
            }
            if (!this.id) {
               /// consequently, am error occured, before assigning the new gc, after deleting the preious one.
               /// reverse the effect
               if (this._graphChild) {
                  this.id = this._graphChild.id;
                  mySketch.children.set(this.id, this.graphChild);
               }
            }
            this.__updateDependants();
            mySketch.update();
            if (this.status === 're-update') {
               this.status = 'ready';
               this.update(this.mathField.latex());
            } else if (this.status === 'updating') {
               this.status = 'ready';
            }
         } else {
            this.status = 're-update'; 
         }
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

   __updateDependants(prev) {
      if (this._graphChild instanceof Variable || this._graphChild instanceof Slider) {
         let size = mySketch.children.size;
         mySketch.children.forEach(gc => {
            size--;
            if (size < 0) return;
            if (gc && gc !== this._graphChild && gc.control.vars) {
               if (gc.control.vars.find(a => this._graphChild.id === a || (prev && a === prev.id)))
                  gc.control.update();
            }
         });
      }
      if (this._graphChild instanceof Func) {
         let size = mySketch.children.size;
         mySketch.children.forEach(gc => {
            size--;
            if (size < 0) return;
            if (gc && gc.control !== this && gc.control.vars) {
               if (gc.control.funcs.find(a => this._graphChild.id === a || (prev && a === prev.id)))
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
      if (this._graphChild instanceof Slider) {
         if ($('.slider-outer', this.elt).hasClass('play')) {
            $('.play-pause', this.elt).trigger('click');
         }
      }
      if (keypadSettings.focusedControl && keypadSettings.focusedControl !== this) keypadSettings.focusedControl.blur();
      // setting this to be focuses
      keypadSettings.focusedControl = this;
      keypadSettings.mathField = this.mathField;
      if (focusTheField) this.mathField.focus();
      this.elt.classList.add('focus');
   }

   blur(blurTheField = true) {
      // keypadSettings.focusedControl = undefined;
      if (blurTheField) this.mathField.blur();
      this.elt.classList.remove('focus');
   }

   enter() {
      let index = parseInt(this.orderELT.textContent);
      if (this.isError === 1) {
         this.blur();
         /// adding undefined
         let vars = this.elt.querySelectorAll('.not-exist .var');
         for (let v of vars) {
            v.click();
            index++;
         }

         let funcs = this.elt.querySelectorAll('.not-exist .func');
         for (let f of funcs) {
            f.click();
            index++;
         }
      }
      let newChild = new ChildControl();
      addControl(newChild, index);
   }

   error(e) {
      if (e instanceof UndefError) {
         let undef = e.undef;
         let undefVars = undef.vars.reduce((b, a) => b + a + ', ', '').slice(0, -2);
         let undefFuncs = undef.funcs.reduce((b, a) => b + a + ', ', '').slice(0, -2);
         let errorText = (undefVars ? `undefined vars [${undefVars}]` : '') + (undefFuncs ? `, undefined funcs [${undefFuncs}]` : '');
         this.error(new Error(errorText + ', click the button to add.'));

         if (this.isError === 1) { // this.isError is 1 when vars or funcs are not exists
            /// remove the previous elts
            this.elt.querySelector('.main .not-exist').remove();
         }

         let buttonsVars = '', buttonsFuncs = '';

         if (undef.vars.length > 0) {
            buttonsVars = '<div><span>vars: </span>';
            buttonsVars += undef.vars.reduce((b, a) => { return b + `<button class="var btn-3">${a}</button>`; }, '') || '';
            buttonsVars += undef.vars.length > 1 ? '<button class="all-vars btn-1">all</button>' : '';
            buttonsVars += '</div>';
         }

         if (undef.funcs.length > 0) {
            buttonsFuncs = '<div><span>funcs: </span>';
            buttonsFuncs += undef.funcs.reduce((b, a) => { return b + `<button class="func btn-3">${a}</button>`; }, '') || '';
            buttonsFuncs += undef.funcs.length > 1 ? '<button class="all-funcs btn-1">all</button>' : '';
            buttonsFuncs += '</div>';
         }

         let notExistElt = $(`<div class='not-exist'>${buttonsVars + buttonsFuncs}</div>`);

         let me = this;
         $('.var', notExistElt).bind('click', function () {
            let id = this.innerText;
            // let gc = new ChildControl(new Slider({ id, value: 1, sketch: mySketch }));
            addControl(`${id} = 1`, parseInt(me.orderELT.textContent));
         });

         $('.func', notExistElt).bind('click', function () {
            /// choosing a param
            let param = 'a';
            let counter = 0;
            let end;
            while (Math.hasOwnProperty(param) && !end) {
               if (counter > 300) {
                  param = 'a';
                  end = 1;
               } else if (counter > 100) {
                  param = String.fromCharCode(math.random(65, 90));
               } else {
                  param = String.fromCharCode(math.random(97, 122));
               }
               counter++;
            }
            let id = this.textContent;
            // let newChild = new ChildControl(new Func({ id, expr: new MagicalParser.Node('variable', [], { name: param }), params: [param], sketch: mySketch }));
            addControl(`${id}\\left(${param}\\right) = ${param}`, parseInt(me.orderELT.textContent));
         });

         $('.all-vars', notExistElt).bind('click', () => {
            let vars = this.elt.querySelectorAll('.not-exist .var');
            for (let v of vars) {
               v.click();
            }
         });

         $('.all-funcs', notExistElt).bind('click', () => {
            let funcs = this.elt.querySelectorAll('.not-exist .func');
            for (let f of funcs) {
               f.click();
            }
         });

         this.elt.querySelector('.main').append(notExistElt[0]);
         this.isError = 1;

      } else {
         if (this.isError) {
            let errorELT = this.elt.querySelector('.error-elt');
            errorELT.setAttribute('aria-label', e.message);
         } else {
            this.elt.classList.add('error');
            this.isError = true;
            this.graphChild.renderable = false;
            let errorELT = $(`
            <div class="error-elt">
               <i class="fas fa-bug"></i>
            </div>
            `);
            errorELT[0].setAttribute('data-balloon-pos', 'right');
            errorELT[0].setAttribute('aria-label', e.message);
            errorELT.hide();
            this.elt.querySelector('.side-status').append(errorELT[0]);
            errorELT.fadeOut(0).delay(200).fadeIn(500);
         }
         console.log(e);
      }
   }

   remove(removeGraphChild = true) {
      if (this._graphChild instanceof Slider) {
         if ($('.slider-outer', this.elt).hasClass('play')) {
            $('.play-pause', this.elt).trigger('click');
         }
      }
      removeControl(this);
      if (removeGraphChild) {
         if (this.graphChild) this.graphChild.remove();
         this.__updateDependants();
      }
      mySketch.update();
   }

   //#region updatingElt

   __updateElts(from, to) {
      //#region reset the current elts
      if (from && to && from.constructor !== to.constructor) {
         let eltsTOremove = this.elt.querySelectorAll('.special-elt');
         eltsTOremove.forEach(elt => { elt.remove(); });
      }
      if (this.isError === 1) {
         this.elt.querySelector('.not-exist').remove();
      }
      if (this.isError) {
         this.elt.classList.remove('error');
         this.elt.querySelector('.error-elt').remove();
         this.isError = false;
      }
      //#endregion

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
         } else if (to instanceof Slider) {
            if (from instanceof Slider) {
               this.__updateSlider();
            } else {
               this.__toSlider();
            }
         }
      }
   }

   __toEmpty() {
      let sideStatus = this.elt.querySelector('.side-status');
   }

   __toXfunction() {
      let sideStatus = this.elt.querySelector('.side-status');
      let $visibleElt = $(`<div class="visible-elt special-elt visible"><div class="inner"></div></div>`);
      $visibleElt.bind('click', ()=> {
         $visibleElt.toggleClass('visible');
         this.graphChild.renderable = $visibleElt.hasClass('visible');
         mySketch.draw();
      });
      sideStatus.append($visibleElt[0]);
      this.__updateXfunction();
   }

   __updateXfunction() {
      let visibleELt = this.elt.querySelector('.side-status').querySelector('.visible');
      visibleELt.setAttribute('style', `--color: ${this.graphChild.pen.color.toString()}`);
   }

   __toEvalExpr() {
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
      this.graphChild.handlers.onupdate = () => {
         this.__updateEvalExpr();
      };
      // this.__updateEvalExpr(); /// will be done on updating the sktech
   }

   __updateEvalExpr() {
      this.graphChild.handlers.onupdate = () => {
         this.__updateEvalExpr();
      };

      try {
         let value = this.graphChild.eval();
         if (!isNaN(value)) {
            value += 0; /// +0 is here to convert the object (representing the valueOf a variable) into a number 
            value = parseFloat(value.toFixed(10));
            switch (this.specialProps.valueType.getAttribute('type')) {
               case 'decimal':
                  {
                     this.specialProps.valueElt.innerHTML = `<span>${value}</span>`;
                  }
                  break;
               case 'fract':
                  {
                     if (value.indexOf('.') > -1 && value.split('.')[1].length < 5) {    
                        let fraction = MathPackage.Core.fraction(value);
                        if (fraction.denominator === 1) {
                           this.specialProps.valueElt.innerHTML = `<span>${fraction.numerator}</span>`;
                        } else {
                           this.specialProps.valueElt.innerHTML = `<span>\\frac{${fraction.numerator}}{${fraction.denominator}}</span>`;
                           MQ.StaticMath(this.specialProps.valueElt.children[0]);
                        }
                     } else {
                        this.specialProps.valueElt.innerHTML = `<span>${value}</span>`;
                     }
                  }
                  break;
               case 'quotient':
                  {
                     if (value.indexOf('.') > -1 && value.split('.')[1].length < 5) {
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
                     } else {
                        this.specialProps.valueElt.innerHTML = `<span>${value}</span>`;
                     }
                  }
                  break;
            }
         } else {
            this.specialProps.valueElt.innerHTML = '<span>NaN</span>';
         }
      } catch (e) {
         this.specialProps.valueElt.innerHTML = '<span>NaN</span>';
         this.error(e);
      }
   }

   __toSlider() {
      /// adding slider
      let $sliderOuter = $(`
      <div class="slider-outer special-elt">
         <div class='range-container'>
            <span class='slider-controller-toggle'>
               <i class="fas fa-angle-right right"></i>
            </span>
            <input type=range class=slider min=-5 max=5 step=0.01 />
            <span class='play-pause'>
               <svg role="img" width=15 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path class="path"></path>
               </sbg>
            </span>
         </div>
         <div class='slider-controller'>
            <label>min</label>:<span class="math-field min">-5</span>
            <label>max</label>:<span class="math-field max">5</span>
            <label>step</label>:<span class="math-field step">0.01</span>
         </div>
      </div>`);
      this.elt.querySelector('.main').append($sliderOuter[0]);
      let $slider = $('.slider', $sliderOuter);

      // sliderControllerMathFields
      let attrs = {
         min: MQ.MathField($sliderOuter[0].querySelector('.slider-controller .math-field.min'), {
            handlers: {
               edit: function () {
                  if ($sliderOuter.hasClass('play')) {
                     $('.play-pause', $sliderOuter).trigger('click');
                  }
                  $slider[0].min = (getJSfunction(attrs.min.latex()))();
               }
            }
         }),
         max: MQ.MathField($sliderOuter[0].querySelector('.slider-controller .math-field.max'), {
            handlers: {
               edit: function () {
                  if ($sliderOuter.hasClass('play')) {
                     $('.play-pause', $sliderOuter).trigger('click');
                  }
                  $slider[0].max = (getJSfunction(attrs.max.latex()))();
               }
            }
         }),
         step: MQ.MathField($sliderOuter[0].querySelector('.slider-controller .math-field.step'), {
            handlers: {
               edit: function () {
                  if ($sliderOuter.hasClass('play')) {
                     $('.play-pause', $sliderOuter).trigger('click');
                  }
                  $slider[0].step = (getJSfunction(attrs.step.latex()))();
               }
            }
         }),
         /** oscillate, forwards, backwards*/
         dir: 'oscillate',
         // positive int number represents the steps per second (the unit: sps)
         speed: 400,
         // to change the direction of the slider will working (the play button has been pressed)
         speedModifier: 1
      };

      /// the special properties for this specific type of GraphChild
      this.specialProps = {
         $slider,
         attrs,
         invokeOnchange: true,
      };

      {
         $slider
            .on('change', (event, ...handlerParams) => {
               if (this.specialProps.invokeOnchange) {
                  this.graphChild.setValue(parseFloat($slider[0].value), handlerParams);
                  this.setScript(this.graphChild.id + ' = ' + $slider[0].value, false);
               }
            })
            .on('mousemove touchmove', () => {
               if ($slider[0].ismousedown) {
                  $slider.trigger('change', false);
               }
            })
            .on('mousedown touchstart', () => {
               if ($sliderOuter.hasClass('play')) {
                  $('.play-pause', $sliderOuter).trigger('click');
               }
               $slider[0].ismousedown = true;
            })
            .on('mouseup touchend', () => {
               $slider[0].ismousedown = false;
            });

         $('.slider-controller-toggle', $sliderOuter).bind('click', () => {
            $sliderOuter.toggleClass('controller-opended');
         });

         let speedModifier = 1;

         $('.play-pause', $sliderOuter).bind('click', () => {
            $sliderOuter.toggleClass('play');
            if ($sliderOuter.hasClass('play')) {
               slidersController.push(this);
            } else {
               slidersController.pop(this);
            }
         });
      }


      this.__updateSlider();
   }

   __updateSlider() {
      let slider = this.specialProps.$slider[0];
      let value = this.graphChild.getValue();

      this.graphChild.handlers.onchange = (updateSlider = true, updateSketch = true) => {
         if (updateSlider) slider.value = this.graphChild.getValue();
         if (updateSketch) mySketch.update(true, false);
      };

      this.specialProps.attrs.min.latex(Math.min(parseFloat(slider.min), parseFloat(value)));
      this.specialProps.attrs.max.latex(Math.max(parseFloat(slider.max), parseFloat(value)));

      this.specialProps.invokeOnchange = false;
      slider.value = value;
      this.specialProps.invokeOnchange = true;

      // this.setScript(this.graphChild.id + ' = ' + slider.value, false);
   }

   __toVariable() {
      this.specialProps = {};

      // this.__updateEvalExpr(); /// will be done on updating the sktech
   }

   __updateVariable() {

   }
   //#endregion

}