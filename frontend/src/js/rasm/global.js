import ChildControl from './ChildControl.js';
import sketch from './sketch.js';

//#region variables
export var subTools = {
   details: SUI.TempMessege({
      layer: false,
      toolsbar: true,
      onhoverFix: true,
      position: { bottom: 20, left: 20 },
      duration: 2500, // to make it fixed
      content: '<p style="background: green; color:white;">There is no god but Allah',
      parent: document.querySelector('#canvas-parent').parentElement,
   })
};
export var mouse = { x: undefined, y: undefined };

export var keypadSettings = {
   backspaceInterval: undefined,
   mouseDownForInterval: false,
   showHideKeyBtn: document.querySelector(".sh-keypad"),
   mathField: document.querySelector('.script')
};

export var sidebar = document.querySelector('.sidebar-container');

//#endregion

//#region methods

export function updateObjsOrder() {
   let objs = document.querySelectorAll('.controls li');
   let order = 1;
   for (let obj of objs) {
      obj.setAttribute('index', order - 1);
      obj.querySelector('.order').textContent = order++;
   }
}

export function addControl(input, index = 'last', autoFocus = true) {
   let control = input;
   if ((typeof input).toLowerCase() === 'string') {
      control = new ChildControl();
      control.mathField.latex(input);
   }
   var controls = document.querySelector('.controls');
   index = (math.isNumeric(index) && index > controls.childElementCount - 1) ? 'last' : index;
   let i = index === 'last' ? controls.childElementCount - 1 : index;
   if (i > -1 && index !== 'last') {
      control.elt.querySelector('.order').textContent = i + 1;
      controls.insertBefore(control.elt, controls.children[i]);
      updateObjsOrder();
   } else {
      control.elt.setAttribute('index', controls.childElementCount);
      control.elt.querySelector('.order').textContent = controls.childElementCount + 1;
      controls.appendChild(control.elt);
   }
   if (autoFocus) control.focus();

}

export function removeControl(control) {
   if (control === keypadSettings.focusedControl) {
      let alter = control.elt.previousElementSibling || control.elt.nextElementSibling;
      if (alter) {
         sketch.children.get(alter.getAttribute('id')).control.focus();
      }
   }
   control.elt.remove();
   var controls = document.querySelector('.controls');
   var newControlBtn = controls.parentElement.querySelector('#add-new-control');
   if (controls.childElementCount === 0) {
      newControlBtn.classList.add('animate-shake');
      controls.parentElement.classList.add('blink-error');
      setTimeout(() => {
         newControlBtn.classList.remove('animate-shake');
         controls.parentElement.classList.remove('blink-error');
         addControl(new ChildControl());
      }, 400);
   }
}

export function addTOsketch(child, controlIndex = 'last' /* the index */) {
   if ((controlIndex || controlIndex === 0) && !child.control) {
      let control = new ChildControl(child);
      addControl(control, controlIndex);
   }
   sketch.appendChild(child);
}

export function resize(setContainment = true) {

   document.body.style.height = window.innerHeight + 'px';

   checkSM();

   sketch.canvas.resize(canvasParent.clientWidth, canvasParent.clientHeight);
   sketch.childrenCanvas.resize(canvasParent.clientWidth, canvasParent.clientHeight);

   sketch.gs.transform.invokeOnchange = false;

   sketch.gs.width = canvasParent.clientWidth;
   sketch.gs.height = canvasParent.clientHeight;

   let vp = sketch.gs.viewport;
   sketch.gs.transform.onchange(true);
   // if (angles.minAngle(new vector(1, 0), vector.fromAngle(sketch.gs.transform.xAngle)).toFixed(3) === (0).toFixed(3) && angles.minAngle(new vector(1, 0), vector.fromAngle(sketch.gs.transform.yAngle)).toFixed(3) === (Math.PI / 2).toFixed(3)) {
   sketch.gs.transform.transformOrigin = undefined;
   sketch.gs.transform.setViewport(vp, true);
   sketch.gs.transform.invokeOnchange = true;
   sketch.gs.transform.onchange();
   // }

   if (setContainment) {
      $(".resizer", sidebar)
         .draggable('option', 'containment', getContainment(sidebar));
      // .css({ left: document.querySelector('.sidebar-container').clientWidth + 'px' });
   }

   sketch.update();
   resize.prevSize = { width: window.innerWidth, height: window.innerHeight };
}
export function checkSM() {
   if (window.innerWidth <= 600 && resize.prevSize.width > 600) {
      /// changing the element layout
      document.body.querySelector('.app-container').classList.remove('large-screen');
      document.body.querySelector('.app-container').classList.add('small-screen');
   } else if (window.innerWidth > 600 && resize.prevSize.width <= 600) {
      /// changing the element layout
      document.body.querySelector('.app-container').classList.add('large-screen');
      document.body.querySelector('.app-container').classList.remove('small-screen');
   }
}
checkSM.prevSize = { width: window.innerWidth, height: window.innerHeight };

export function getContainment(elt) {
   let sidebarStyle = window.getComputedStyle(elt);
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
export function genRandomName() {
   let num = 0;
   /// randomNameNum is here to avoid getting the same random name if the code is implemented so fast

   return (Date.now() + genRandomName.randomNameNum++)
      .toString(36)
      .replace(/\d/g, (num) => {
         return String.fromCharCode(97 + parseInt(num));
      });
}
genRandomName.randomNameNum = 0;

export function hassClass(elt, c) {
   for (let _c of elt.classList) {
      if (c === _c) return true;
   }
   return false;
}


export var slidersController = {

   workingSliders: [],
   interval: 0,
   status: 'all-stoped',

   /**
    * @param {ChildControl} sliderControl 
    */
   push: function (sliderControl) {

      let $slider = sliderControl.specialProps.$slider;
      let slider = $slider[0];
      let attrs = sliderControl.specialProps.attrs;
      let sliderConfig = {
         min: parseFloat(slider.min),
         max: parseFloat(slider.max),
         step: parseFloat(slider.step),
         value: sliderControl.graphChild.getValue(),
      };
      let stepConfig = {
         current: (sliderConfig.value - sliderConfig.min) / sliderConfig.step,
         prev: (sliderConfig.value - sliderConfig.min) / sliderConfig.step,
         max: (sliderConfig.max - sliderConfig.min) / sliderConfig.step,
      };

      this.workingSliders.push({ sliderControl, stepConfig, sliderConfig, attrs, $slider });

      if (this.status === 'all-stoped') {
         this.status = 'working';
         this.startSlidersInterval();
      }
   },

   /**
    * @param {ChildControl} sliderControl
    */
   pop: function (sliderControl) {
      for (let i = 0; i < this.workingSliders.length; i++) {
         if (sliderControl === this.workingSliders[i].sliderControl) {
            this.workingSliders.splice(i, 1);
         }
      }
      if (this.workingSliders.length === 0) {
         this.status = 'all-stoped';
         clearInterval(this.interval);
      }
   },

   startSlidersInterval: function () {
      let intervalSleepDur = 15; /// in ms
      // let setNew = true;
      // let times = 0; 
      this.interval = setInterval(() => {
         // if (setNew) {
         //    setNew = false;
         //    setTimeout(() => {
         //       console.log((times * 15), 'fps');
         //       times = 0;
         //       setNew = true;
         //    }, 1000);
         // }
         // times++;
         // updating all working slliders
         for (let slider of this.workingSliders) {
            let stepConfig = slider.stepConfig;
            let sliderConfig = slider.sliderConfig;
            let $slider = slider.$slider;
            //#region stepConfig.current
            /**
             * the attrs.speed is in (step per second),
             * so let devide it bty 1000 to get the speed in (ms),
             * then multiply by the duration of sleeping of the interval,
             * with this computation, the slider will give an illusion of the given speed,
             * moreover, users eyes won't recognize what is happening.
             */
            stepConfig.current += (slider.attrs.speed * slider.attrs.speedModifier / 1000 * intervalSleepDur);
            //#endregion
            if (Math.abs(stepConfig.current - stepConfig.prev) > 1) {
               switch (slider.attrs.dir) {
                  case 'oscillate': {
                     let value = sliderConfig.min + (stepConfig.current * sliderConfig.step);
                     if (stepConfig.current < 0 || stepConfig.current > stepConfig.max) slider.attrs.speedModifier *= -1;
                     else {
                        $slider[0].value = value;
                        $slider.trigger('change', true, false);
                     }
                     break;
                  }
                  case 'forwards': {
                     let value = sliderConfig.min + (stepConfig.current * sliderConfig.step);
                     if (stepConfig.current > stepConfig.max) stepConfig.current = 0;
                     else {
                        $slider[0].value = value;
                        $slider.trigger('change', true, false);
                     }
                     break;
                  }
                  case 'backwards': {
                     let value = sliderConfig.min + (stepConfig.current * sliderConfig.step);
                     if (stepConfig.current < 0) stepConfig.current = stepConfig.max;
                     else {
                        $slider[0].value = value;
                        $slider.trigger('change', true, false);
                     }
                     break;
                  }
               }
               stepConfig.prev = stepConfig.current;
            }
         }
         sketch.update(true, false);
      }, intervalSleepDur);
   }
};


//#endregion
