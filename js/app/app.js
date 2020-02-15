import { getContainment, updateObjsOrder, resize, canvasParent } from './global.js';
import Sketch from '../PLOTTO/Sketch.js';
import drawing from '../PLOTTO/drawing/index.js';
import setEvents from './events/index.js';
import setupKeypad from './keypad/index.js';

/**
 * """""""""""""""" reminder
 * app folder is associated with PLOTTO folder, both of them depends upon the other.
 */
export default function setupAPP(canvas) {

  window.MP = MathPackage;
  window.angles = MP.Angles;
  window.lines = MP.Lines;
  window.math = MP.Core;
  window.drawing = drawing;
  window.vector = MP.entities.Vector;
  window.MQ = MathQuill.getInterface(2);
  window.mySketch = new Sketch(canvas);
  window.canvas = mySketch.canvas;
  // canvasParent.appendChild(window.canvas.elt);

  let mathFields = $(".math-field");
  for (let i = 0; i < mathFields.length; i++) {
    MQ.StaticMath(mathFields[i]);
  }

  setEvents();
  setupKeypad();

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


setupAPP(document.querySelector('#canvas'));