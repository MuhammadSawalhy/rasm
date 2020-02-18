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
      parent: document.querySelector('.canvas-container')
   })
};
//#endregion

//#region methods

export function updateObjsOrder() {
   let objs = document.querySelectorAll('.controls li');
   let order = 1;
   for (let obj of objs) {
      obj.querySelector('.order').textContent = order++;
   }
}

var controls = document.querySelector('.controls');
var newControlBtn = controls.parentElement.querySelector('.new-control');

export function addControl(control, index = 'last') {
   index = (math.isNumeric(index) && index > controls.childElementCount - 1) ? 'last' : index;
   let i = index === 'last' ? controls.childElementCount - 1 : index;
   if (i > -1 && index !== 'last') {
      control.elt.querySelector('.order').textContent = index + 1;
      controls.insertBefore(control.elt, controls.children[i]);
      updateObjsOrder();
   } else {
      control.elt.querySelector('.order').textContent = controls.childElementCount + 1;
      controls.appendChild(control.elt);
   }
}

export function removeControl(control) {
   control.elt.remove();
   if (controls.childElementCount === 0) {
      newControlBtn.classList.add('animate-shake');
      controls.parentElement.classList.add('blink-error');
      setTimeout(() => {
         newControlBtn.classList.remove('animate-shake');
         controls.parentElement.classList.remove('blink-error');
         addControl(new ChildControl(mySketch));
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

export var canvasParent = document.querySelector('.canvas-container');
export function resize(setContainment = true) {

   canvas.resize(canvasParent.clientWidth, canvasParent.clientHeight);
   mySketch.gs.width = canvasParent.clientWidth;
   mySketch.gs.height = canvasParent.clientHeight;

   
   let vp = mySketch.gs.viewport;
   mySketch.gs.transform.onchange(true);
   // if (angles.minAngle(new vector(1, 0), vector.fromAngle(mySketch.gs.transform.xAngle)).toFixed(3) === (0).toFixed(3) && angles.minAngle(new vector(1, 0), vector.fromAngle(mySketch.gs.transform.yAngle)).toFixed(3) === (Math.PI / 2).toFixed(3)) {
   mySketch.gs.transform.invokeOnchange = false;
   mySketch.gs.transform.transformOrigin = undefined;
   let xs = mySketch.gs.transform.xScale;
   mySketch.gs.transform.setViewport(vp, null, true);
   mySketch.gs.transform.invokeOnchange = true;
   mySketch.gs.transform.onchange();
   // }

   if (setContainment) {

      $(".sidebar-container .resizer")
         .draggable('option', 'containment', getContainment());
      // .css({ left: document.querySelector('.sidebar-container').clientWidth + 'px' });
   }

   mySketch.update();

}

export function getContainment() {
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

export function genRandomName() {
   let num = 0;
   /// randomNameNum is here to avoid getting the same random name if the code is implemented so fast

   return (Date.now() + genRandomName.randomNameNum++).toString(36)
         .replace(new RegExp(num++, 'g'), 'a') /// I am using Regex for global replacement.
         .replace(new RegExp(num++, 'g'), 'b')
         .replace(new RegExp(num++, 'g'), 'c')
         .replace(new RegExp(num++, 'g'), 'd')
         .replace(new RegExp(num++, 'g'), 'e')
         .replace(new RegExp(num++, 'g'), 'f')
         .replace(new RegExp(num++, 'g'), 'g')
         .replace(new RegExp(num++, 'g'), 'h')
         .replace(new RegExp(num++, 'g'), 'i')
         .replace(new RegExp(num++, 'g'), 'j');
}
genRandomName.randomNameNum = 0;

//#endregion
