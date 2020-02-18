import { keyboardSettings } from './index.js';

export default function(){
   //#region (keypad - showHideBtn) events
   let keypad = $('.keypad-container'),
      sh = $(keyboardSettings.showHideKeyBtn);

   keypad
      .on('mousedown', function () {
         keyboardSettings.mathField.focus();
      });


   sh.on("mouseup", function (e) {
      keyboardSettings.hideKeyPad = false;
   });

   $("[cancel-hiding-keypad]").bind("mousedown touchstart", function (e) {
      keyboardSettings.hideKeyPad = false;
   });

   $(".script-container").bind("touchstart", function (e) {
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
            keyboardSettings.mathField.cmd($(' > div.active > span.active', $this).attr('mq-cmd'));
         } else if ($this.hasClass('shiftable')) {
            keyboardSettings.mathField.cmd($(' > span.active', $this).attr('mq-cmd'));
         } else {
            keyboardSettings.mathField.cmd(this.getAttribute('mq-cmd'));
         }
         keyboardSettings.mathField.focus();
      });
   });

   $(".keypad-container .rows button[mq-write]").each(function (index) {
      $(this).on('click', function () {
         let $this = $(this);
         if ($this.hasClass('double-shiftable')) {
            keyboardSettings.mathField.write($(' > div.active > span.active', $this).attr('mq-write'));
         } else if ($this.hasClass('shiftable')) {
            keyboardSettings.mathField.write($(' > span.active', $this).attr('mq-write'));
         } else {
            keyboardSettings.mathField.write(this.getAttribute('mq-write'));
         }
         keyboardSettings.mathField.focus();
      });
   });

   $(".keypad-container .rows button[mq-func]").each(function (index) {
      $(this).on("click", function () {
         let $this = $(this);
         if ($this.hasClass("double-shiftable")) {
            keyboardSettings.mathField.write($(" > div.active > span.active", $this).attr("mq-func"));
         } else if ($this.hasClass("shiftable")) {
            keyboardSettings.mathField.write($(" > span.active", $this).attr("mq-func"));
         } else {
            keyboardSettings.mathField.write(this.getAttribute("mq-func"));
         }
         keyboardSettings.mathField.cmd("(");
         keyboardSettings.mathField.focus();
      });
   });

   $(".space").on("click", function () {
      keyboardSettings.mathField.keystroke("Right");
   });

   //keystrokes
   $(".backspace").on("mousedown", function () {
      keyboardSettings.mathField.keystroke("Backspace");
      keyboardSettings.mouseDownForInterval = true;
      setTimeout(function () {
         if (keyboardSettings.mouseDownForInterval) {
            keyboardSettings.backspaceInterval = setInterval(function () {
               keyboardSettings.mathField.keystroke("Backspace");
            }, 120);
         }
      }, 400);
   });

   //#endregion

   //#region direction

   $(".go-left").on("click", function () {
      keyboardSettings.mathField.keystroke("Left");
   });

   $(".go-right").on("click", function () {
      keyboardSettings.mathField.keystroke("Right");
   });

   $(".go-up").on("click", function () {
      keyboardSettings.mathField.keystroke("Up");
   });

   $(".go-down").on("click", function () {
      keyboardSettings.mathField.keystroke("Down");
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