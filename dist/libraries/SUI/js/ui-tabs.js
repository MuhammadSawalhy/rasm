SUI.tabs = function (tabsElt) {
   $("> .tabs > li", tabsElt).bind("click", function () {
      var $this = $(this),
         $parent = tabsElt;
      $('.tabs > li', $parent).removeClass("active");
      $this.addClass("active");
      $(".tabs-content > li", $parent).removeClass("active");
      $(".tabs-content > li", $parent)
         .eq($this.index())
         .addClass("active");
   });
};