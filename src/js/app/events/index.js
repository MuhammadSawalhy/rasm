import canvasEvents from "./canvasEvents.js";
import toolsEvents from "./toolsEvents.js";
import ChildControl from "../ChildControl.js";
import { addControl, resize, keypadSettings, checkSM } from "../global.js";

export default function setEvents () {
   //#region window events
   window.addEventListener('resize', resize);
   window.addEventListener("mouseup", function (event) {
      //#region for backspace interval
      if (keypadSettings.mouseDownForInterval) {
         keypadSettings.mouseDownForInterval = false;
         clearInterval(keypadSettings.backspaceInterval);
      }
      //#endregion
      keypadSettings.hideKeyPad = true;
   });
   window.addEventListener("touchend", function (event) {
      //#region for backspace interval
      if (keypadSettings.mouseDownForInterval) {
         keypadSettings.mouseDownForInterval = false;
         clearInterval(keypadSettings.backspaceInterval);
      }
      //#endregion
      keypadSettings.hideKeyPad = true;
   });
   window.addEventListener('mousedown', function (e) {
      //#region hide keybad
      let keypadShown = /\svisible\s|^visible\s|\svisible$/.test(keypadSettings.showHideKeyBtn.className); // hasClass
      if (keypadSettings.hideKeyPad && keypadShown) {
         keypadSettings.showHideKeyBtn.click();
      }
      //#endregion
   });
   window.addEventListener('touchstart', function (e) {
      //#region hide keybad
      let keypadShown = /\svisible\s|^visible\s|\svisible$/.test(keypadSettings.showHideKeyBtn.className); // hasClass
      if (keypadSettings.hideKeyPad && keypadShown) {
         keypadSettings.showHideKeyBtn.click();
      }
      //#endregion
   });
   //#endregion

   document.querySelector('#add-new-control').addEventListener('click', (e) => {
      addControl(new ChildControl()); 
   });
   
   document.querySelector('#show-hide-sidebar').addEventListener('click',function (e) {
      let $this = $(this);
      let __visible = $this.hasClass("visible");
      let from = __visible ? "visible" : "unvisible",
         to = __visible ? "unvisible" : "visible";
     
         // let path = this.querySelector('path');
      let sidebar = document.body.querySelector('.sidebar-container');
      if (__visible) {
         
         if (checkSM.smallScreen) {
            sidebar.style = 'width: ' + sidebar.clientWidth + 'px';
            sidebar.style = 'height: ' + sidebar.clientHeight + 'px';
         } else {
            sidebar.style = 'width: ' + sidebar.clientWidth + 'px';
            sidebar.style = 'height: ' + sidebar.clientHeight + 'px';
         }

         document.body.querySelector('.app-container').appendChild(this);
         // path.setAttribute('d', path.getAttribute('right'));
      } else {
         sidebar.style = '';
         sidebar.querySelector('.header').append(this);
         // path.setAttribute('d', path.getAttribute('left'));
      }

      $this.removeClass(from);
      $this.addClass(to);

      sidebar.classList.remove(from);
      sidebar.classList.add(to);

      resize();
   });

   canvasEvents();
   toolsEvents();
}