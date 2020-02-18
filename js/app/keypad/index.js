import keypadEvents from './events.js';

export default function setupKeypad() {

   keyboardSettings.showHideKeyBtn.addEventListener("click", function (e) {
      let parent = document.querySelector(".keypad-container");
      let __keypadShown = $(this).hasClass("show");
      let from = __keypadShown ? "show" : "hide",
         to = __keypadShown ? "hide" : "show";

      keyboardSettings.showHideKeyBtn.classList.remove(from);
      keyboardSettings.showHideKeyBtn.classList.add(to);

      parent.classList.remove(from);
      parent.classList.add(to);
      if (__keypadShown) {
         document.body.appendChild(keyboardSettings.showHideKeyBtn);
         $(".sh-keypad-content").attr("aria-label", "show keypad");
      } else {
         parent.insertBefore(keyboardSettings.showHideKeyBtn, parent.firstElementChild);
         $(".sh-keypad-content").attr("aria-label", "hide keypad");
      }
   });

   keypadEvents();
}

export var keyboardSettings = {
   backspaceInterval: undefined,
   mouseDownForInterval: false,
   showHideKeyBtn: document.querySelector(".sh-keypad"),
   mathField: document.querySelector('.script')
};
