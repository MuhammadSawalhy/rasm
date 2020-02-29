import keypadEvents from './events.js';
import { keypadSettings, resize, checkSM } from '../global.js';

export default function setupKeypad() {

   keypadSettings.showHideKeyBtn.addEventListener("click", function (e) {
      let sidebar = document.querySelector(".sidebar-container");
      let sidebarShown = /\svisible\s|^visible\s|\svisible$/.test(sidebar.className); // hasClass
      if (!sidebarShown) {
         document.querySelector("#show-hide-sidebar").click();
      }
      let parent = document.querySelector(".keypad-container");
      let $this = $(this);
      let __keypadShown = $this.hasClass("visible");
      let from = __keypadShown ? "visible" : "unvisible",
         to = __keypadShown ? "unvisible" : "visible";

      keypadSettings.showHideKeyBtn.classList.remove(from);
      keypadSettings.showHideKeyBtn.classList.add(to);

      parent.classList.remove(from);
      parent.classList.add(to);
      if (__keypadShown) {
         document.body.querySelector('.app-container').appendChild(keypadSettings.showHideKeyBtn);
      } else {
         parent.insertBefore(keypadSettings.showHideKeyBtn, parent.firstElementChild);
      }
      if (checkSM.smallScreen) {
         resize();
      }

      keypadSettings.focusedControl.focus();
   });

   SUI.tabs(document.body.querySelector('.keypad-container .tabs-1'));

   keypadEvents();
}
