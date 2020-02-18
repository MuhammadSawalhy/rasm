import canvasEvents from "./canvasEvents.js";
import toolsEvents from "./toolsEvents.js";
import ChildControl from "../ChildControl.js";
import { addControl, resize } from "../global.js";

export default function setEvents () {

   //#region window events
   window.addEventListener('resize', resize);
   window.addEventListener("mouseup", function (event) {
      //#region for backspace interval
      if (keyboardSettings.mouseDownForInterval) {
         keyboardSettings.mouseDownForInterval = false;
         clearInterval(keyboardSettings.backspaceInterval);
      }
      //#endregion
   });
   window.addEventListener('mouseup', function (e) {
      //#region hide keybad
      let keypadShown = /\sshow\s|^show\s|\sshow$/.test(keyboardSettings.showHideKeyBtn.className); // hasClass
      if (keyboardSettings.hideKeyPad && keypadShown) {
         keyboardSettings.showHideKeyBtn.click();
      }
      keyboardSettings.hideKeyPad = true;
      //#endregion
   });
   //#endregion

   document.querySelector('.new-control .new-expr').addEventListener('click', (e) => {
      let oc = new ChildControl();
      addControl(oc);
   });

   canvasEvents();
   toolsEvents();
}