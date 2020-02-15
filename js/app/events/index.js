import canvasEvents from "./canvasEvents.js";
import toolsEvents from "./toolsEvents.js";
import ChildControl from "../ChildControl.js";
import { addControl, resize } from "../global.js";

export default function setEvents () {
   window.addEventListener('resize', resize);

   document.querySelector('.new-control .new-expr').addEventListener('click', (e) => {
      let oc = new ChildControl(mySketch);
      addControl(oc);
   });

   canvasEvents();
   toolsEvents();
}