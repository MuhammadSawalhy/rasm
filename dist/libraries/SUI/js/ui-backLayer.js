/**
 * @param {object} options had inside:
 * 1. cover
*/
SUI.BackLayer = function (options) {
   let layer = {
      options,
      eltTOcover: options.eltTOcover,
      status: 'hidden',
      elt: (function () { 
         let elt = document.createElement('div');
         elt.classList.add('sui-layer');
         elt.classList.add('hidden');
         elt.style.display = 'none';
         elt.addEventListener('click', options.onclick);
         document.body.appendChild(elt);
         elt.style.zIndex = (options.zIndex) ? options.zIndex : 1999
         return elt;
      })(),
      show: function (duration) {
         this.__setBox();
         let jelt = $(this.elt);
         if (this.status === 'hidden') {
            // when """"""""""""hidden
            this.revealed = true;
            jelt.removeClass('hidden');
            jelt.addClass('showing');
            this.status = 'showing';
            jelt
               .fadeIn(duration, () => {
                  jelt.removeClass('showing');
                  jelt.addClass('shown');
                  this.status = 'shown';
               });
         } else if (this.status === 'hiding') {
            // for the status of hiding
            jelt.removeClass('hiding');
            jelt.addClass('showing');
            this.status = 'showing';
            jelt
               .stop(true)
               .fadeIn(duration, () => {
                  jelt.removeClass('showing');
                  jelt.addClass('shown');
                  this.status = 'shown';
               });
         }
         
      },
      hide: function (duration) {
         let jelt = $(this.elt);
         if (this.status === 'shown' || this.status === 'showing') {
            jelt.removeClass('shown');
            jelt.removeClass('showing');
            jelt.addClass('hiding');
            this.status = 'hiding';
            jelt
               .stop(true) // for the status = 'showing'
               .fadeOut(duration, () => {
                  jelt.removeClass('hiding');
                  jelt.addClass('hidden');
                  this.status = 'hidden';
               })
         }
      }, 
      remove: function () {
         this.elt.remove();
      },
      __setBox: function () {
         let box = this.eltTOcover.getBoundingClientRect();
         this.elt.style.top = box.top + 'px';
         this.elt.style.left = box.left + 'px';
         this.elt.style.width = box.right + 'px';
         this.elt.style.height = box.bottom + 'px';
      }
   };
   return layer;
}

/**
 * an Example,,, 
 * 
 

let layer = SUI.BackLAyer({
   eltTOcover: eltTOcover,
   zIndex: zIndex,
   onclcik: () => { }
});

 
 */
