import ChildControl from './ChildControl.js';
import Sketch from '../PLOTTO/Sketch.js';

//#region variables
export var subTools = {
   details: SUI.TempMessege({
      layer: false,
      toolsbar: true,
      onhoverFix: true,
      position: { bottom: 20, left: 20 },
      duration: 2500, // to make it fixed
      content: '<p style="background: green; color:white;">There is no god but Allah',
      parent: document.querySelector('#canvas-parent')
   })
};
export var mouse = { x: undefined, y: undefined, friction: 1 /** used on draging the coordinates */ };

export var keypadSettings = {
   backspaceInterval: undefined,
   mouseDownForInterval: false,
   showHideKeyBtn: document.querySelector(".sh-keypad"),
   mathField: document.querySelector('.script')
};
//#endregion

//#region methods

export function updateObjsOrder() {
   let objs = document.querySelectorAll('.controls li');
   let order = 1;
   for (let obj of objs) {
      obj.setAttribute('index', order -1);
      obj.querySelector('.order').textContent = order++;
   }
}

export function addControl(control, index = 'last', autoFocus = true) {
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
         mySketch.children.get(alter.getAttribute('id')).control.focus();
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
   mySketch.appendChild(child);
}

export function resize(setContainment = true) {
   checkSM();

   document.body.style.height = window.innerHeight + 'px';

   mySketch.canvas.resize(canvasParent.clientWidth, canvasParent.clientHeight);
   mySketch.childrenCanvas.resize(canvasParent.clientWidth, canvasParent.clientHeight);
  
   mySketch.gs.transform.invokeOnchange = false;

   mySketch.gs.width = canvasParent.clientWidth;
   mySketch.gs.height = canvasParent.clientHeight;

   let vp = mySketch.gs.viewport;
   mySketch.gs.transform.onchange(true);
   // if (angles.minAngle(new vector(1, 0), vector.fromAngle(mySketch.gs.transform.xAngle)).toFixed(3) === (0).toFixed(3) && angles.minAngle(new vector(1, 0), vector.fromAngle(mySketch.gs.transform.yAngle)).toFixed(3) === (Math.PI / 2).toFixed(3)) {
   mySketch.gs.transform.transformOrigin = undefined;
   mySketch.gs.transform.setViewport(vp, true);
   mySketch.gs.transform.invokeOnchange = true;
   mySketch.gs.transform.onchange();
   // }

   if (setContainment) {
      let sideBar = document.querySelector('.sidebar-container');

      $(".resizer", sideBar)
         .draggable('option', 'containment', getContainment(sideBar));
      // .css({ left: document.querySelector('.sidebar-container').clientWidth + 'px' });
   }

   mySketch.update();
   resize.prevSize = { width: window.innerWidth, height: window.innerHeight };
}
export function checkSM(){
   if (window.innerWidth <= 600 && resize.prevSize.width > 600) {
      /// changing the element layout
      checkSM.smallScreen = true;
   } else if (window.innerWidth > 600 && resize.prevSize.width <= 600) {
      /// changing the element layout
      checkSM.smallScreen = false;
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

   return (Date.now() + genRandomName.randomNameNum++).toString(36);
}
genRandomName.randomNameNum = 0;


//#endregion
