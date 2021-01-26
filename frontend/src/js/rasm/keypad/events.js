import { keypadSettings, addControl } from '../global.js';
import ChildControl from '../ChildControl.js';

export default function(){
   //#region (keypad - showHideBtn) events
   let keypad = $('.keypad-container'),
      sh = $(keypadSettings.showHideKeyBtn);

   keypad.bind('focusin', function () {
         keypadSettings.mathField.focus();
   });

   $(document.body).delegate("[cancel-hiding-keypad]", "mousedown touchstart", function (e) {
      keypadSettings.hideKeyPad = false;
   });

   $('.control').delegate(".main", "touchstart", function (e) {
      if (sh.hasClass("hide")) {
         sh.click();
      }
   });
   //#endregion

   //#region writing

   $(".keypad-container .rows button[mq-cmd]").each(function (index) {
      $(this).on('click', function () {
         let $this = $(this);
         if ($this.hasClass('double-shiftable')) {
            keypadSettings.mathField.cmd($(' > div.active > span.active', $this).attr('mq-cmd'));
         } else if ($this.hasClass('shiftable')) {
            keypadSettings.mathField.cmd($(' > span.active', $this).attr('mq-cmd'));
         } else {
            keypadSettings.mathField.cmd(this.getAttribute('mq-cmd'));
         }
         keypadSettings.focusedControl.focus();
      });
   });

   $(".keypad-container .rows button[mq-write]").each(function (index) {
      $(this).on('click', function () {
         let $this = $(this);
         if ($this.hasClass('double-shiftable')) {
            keypadSettings.mathField.write($(' > div.active > span.active', $this).attr('mq-write'));
         } else if ($this.hasClass('shiftable')) {
            keypadSettings.mathField.write($(' > span.active', $this).attr('mq-write'));
         } else {
            keypadSettings.mathField.write(this.getAttribute('mq-write'));
         }
         keypadSettings.focusedControl.focus();
      });
   });

   $(".keypad-container .rows button[mq-func]").each(function (index) {
      $(this).on("click", function () {
         let $this = $(this);
         if ($this.hasClass("double-shiftable")) {
            keypadSettings.mathField.write($(" > div.active > span.active", $this).attr("mq-func"));
         } else if ($this.hasClass("shiftable")) {
            keypadSettings.mathField.write($(" > span.active", $this).attr("mq-func"));
         } else {
            keypadSettings.mathField.write(this.getAttribute("mq-func"));
         }
         keypadSettings.mathField.cmd("(");
         keypadSettings.focusedControl.focus();
      });
   });

   $(".space").on("click", function () {
      keypadSettings.mathField.keystroke("Right");
   });

   //keystrokes
   $(".backspace").on("mousedown", function () {
      if (keypadSettings.mathField.latex() == '') {
         keypadSettings.focusedControl.remove();
      } else {
         keypadSettings.mathField.keystroke("Backspace");
      }

      //#region for keep backSpace on holing the button

      keypadSettings.mouseDownForInterval = true;
      setTimeout(function () {
         if (keypadSettings.mouseDownForInterval) {
            keypadSettings.backspaceInterval = setInterval(function () {
               keypadSettings.mathField.keystroke("Backspace");
            }, 120);
         }
      }, 400);

      //#endregion

   });

   //#endregion

   //#region direction

   $(".go-left").on("click", function () {
      keypadSettings.mathField.keystroke("Left");
   });

   $(".go-right").on("click", function () {
      keypadSettings.mathField.keystroke("Right");
   });

   $(".go-up").on("click", function () {
      keypadSettings.mathField.keystroke("Up");
   });

   $(".go-down").on("click", function () {
      keypadSettings.mathField.keystroke("Down");
   });

   $(".enter").on("click", function () {
      addControl(new ChildControl(), parseInt(keypadSettings.focusedControl.orderELT.textContent));
   });

   //#endregion

   //#region shift - double-shift

   var shift = $(".shift");
   shift.on("click", function () {
      let $this = $(this);
      let rows = $this.parents(".rows");
      if ($this.hasClass("active")) {
         $this.removeClass("active");
         $this.addClass("lock");
         rows.removeClass("shift-active");
         rows.addClass("shift-lock");
      } else {
         if ($this.hasClass("lock")) {
            let spans = $(
               ".shiftable > span, .double-shiftable > div > span",
               rows
            );
            spans.toggleClass("active");
            $this.removeClass("lock");
            rows.removeClass("shift-lock");
         } else {
            let spans = $(
               ".shiftable > span, .double-shiftable > div > span",
               rows
            );
            spans.toggleClass("active");
            $this.addClass("active");
            rows.addClass("shift-active");
         }
      }
   });

   // this for disabling shift if it is not .lock
   $(".keypad-container .rows button")
      .not('.shift, .double-shift')
      .on("click", function () {
         let $this = $(this);
         let rows = $this.parents(".rows");
         if (rows.hasClass("shift-active")) {
            let shift = $("button.shift", rows);
            let spans = $(".shiftable > span, .double-shiftable > div > span", rows);
            spans.toggleClass("active");
            shift.removeClass("active");
            rows.removeClass('shift-active');
         }
      });

   var dShift = $(".double-shift");
   dShift.on("click", function () {
      let $this = $(this);
      let divs = $(".double-shiftable > div", $this.parents(".rows"));
      divs.toggleClass("active");
      $this.toggleClass("active");

   });

      //#endregion
}