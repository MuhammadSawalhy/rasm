SUI.TempMessege = function (options = {}){
   options = {
      content: '',
      layer: false,
      toolsbar: true,
      duration: 2000,
      position: null,
      onhoverFix: true,
      parent: document.body,
      ...options
   };

   let me = {

      options,
      status: 'hidden',
      elt: (function __htmlToElement() {
         let div = document.createElement('div');
         
         //#region header
         let header = document.createElement('div');
         header.innerHTML = 
         `  <div class="header">
               <div class="tools">
                  <div class="fix">
                     <button class="fix-btn transbtn-1">
                        <i class="fas fa-crop-alt"></i>
                     </button>
                  </div>
                  
                  <div class="drag">
                     <div class="drag-inner">
                        <span></span><span></span>
                        <span></span><span></span>
                        <span></span><span></span>
                     </div>
                  </div>

                  <div class="close">
                     <button class='closebtn-1 transbtn-1'><div class='inner'></div></button>
                  </div>
               </div>
            </div>`;
         header = header.firstElementChild;
         //#endregion
         
         //#region content
         let content = document.createElement('div');
         content.classList.add('content-wrapper');
         //#endregion
         
         if(options.toolsbar) div.appendChild(header);
         div.appendChild(content);

         div.classList.add('sui-temp-messege');
         div.style.display = 'none';
         let parentStyle = getComputedStyle(options.parent);
         let zIndex = parentStyle.zIndex;
         zIndex = !isNaN(zIndex) ? Math.max(parentStyle.zIndex + 2, 2000) : 2000;
         div.style.zIndex =zIndex; // +1 for layer if exists +2 for messege
         options.zIndex = div.style.zIndex;
         return div;

      })(),

      setContent: function (html) {
         clearNodes(this.content);
         this.content.innerHTML = html;
      },

      setPosition: function (pos) {
         pos = pos || { top: 100, left: 100 };
         this.options.position = pos;
         this.__setBox();
      },

      show: function () {
         if (this.layer) this.layer.show(200);
         if (this.status === 'hiding' || this.status === 'hidden') {
            // when """""""""""" hidden or hiding """"""""""""
            let jelt = $(this.elt); // this is the same as me
            jelt.removeClass(this.status);
            jelt.addClass('showing');
            this.status = 'showing';
            if (!this.fixed) {
               /// fade out after a snap of time
               jelt
                  .stop(true)
                  .fadeIn('fast', () => {
                     jelt.removeClass('showing');
                     jelt.addClass('shown');
                     this.status = 'shown';
                  })
                  .delay(options.duration) /// delay won't work unless you use fageIn or Out just after it, animate jQuery API function won't work, moreover, there is no callBack function for delay, so using fadeIn after it solves this problematic situation. 
                  .fadeIn(0, () => {
                     this.hide();
                  });
            } else {
               jelt
                  .stop(true)
                  .fadeIn('fast', () => {
                     jelt.removeClass('showing');
                     jelt.addClass('shown');
                     this.status = 'shown';
                  })
            }
         } 
      },
      hide: function (closing = false) {
         let onhoverFix = this.options.onhoverFix;
         if (closing) this.options.onhoverFix = false;
         if (this.layer) this.layer.hide(200);
         if (this.status === 'showing' || this.status === 'shown') {

            let jelt = $(this.elt); // this is the same as me
            jelt.removeClass(this.status);
            jelt.addClass('hiding');
            this.status = 'hiding';
            jelt
               .stop(true)
               .fadeOut('slow', () => {
                  jelt.removeClass('hiding');
                  jelt.addClass('hidden');
                  this.status = 'hidden';
                  this.options.onhoverFix= onhoverFix;
               });
         }
      },

      toggleFix: function () {
         if (this.fixed) {
            /// un fix
            this.elt.classList.remove('fixed');
         } else {
            /// fix
            this.elt.classList.add('fixed');
         }
         this.fixed = !this.fixed;
         this.show(); 
      },

      __setBox: function () {
         let pos = this.options.position;
         if (pos) {     
            if (pos.top || pos.top === 0) { this.elt.style.top = pos.top + 'px'; }
            else { this.elt.style.top = '' }
            
            if (pos.left || pos.left === 0) { this.elt.style.left = pos.left + 'px'; }
            else { this.elt.style.left = '' }
           
            if (pos.bottom || pos.bottom === 0) { this.elt.style.bottom = pos.bottom + 'px'; }
            else { this.elt.style.bottom = '' }
            
            if (pos.right || pos.right === 0) { this.elt.style.right = pos.right + 'px'; }
            else { this.elt.style.right = '' }
         }
      }

   };
  
   me.content = me.elt.querySelector('.content-wrapper');
   if (options.toolsbar) {
      me.header = me.elt.querySelector('.header');
      me.tools = me.header.querySelector('.tools');
   }

   //#region setup
   
   let parent = options.parent;
   if (options.duration <= 0 || me.fixed) { me.fixed = true; me.elt.classList.add('fixed'); } // setting fixed to true
   if (options.toolsbar) {
      me.tools.querySelector('.close button').addEventListener('click', () => { 
         me.hide(true);
      });
      me.tools.querySelector('.fix button').addEventListener('click', () => { 
         me.toggleFix();
      });
   }

   if(options.onhoverFix){
      me.elt.addEventListener('mouseenter', () => {
         if (me.layer) me.layer.show(200);
         let jelt = $(me.elt);
         if (me.status === 'hiding' || me.status === 'hidden') {
            // when """""""""""" hidden or hiding """"""""""""
            jelt.removeClass(me.status);
            jelt.addClass('showing');
            me.status = 'showing';
            jelt
               .stop(true)
               .fadeIn('fast', () => {
                  jelt.removeClass('showing');
                  jelt.addClass('shown');
                  me.status = 'shown';
               });
         } else {
            /// I am doing this as it may been set to fadeOut after a delay, so I will complete showing if it is not completely shown, then I will stop all this or all thing will be finished, no fade out will occur.
            if (me.status === 'showing') {
               jelt
                  .stop(true) 
                  .fadeIn('fast', () => {
                     jelt.removeClass('showing');
                     jelt.addClass('shown');
                     me.status = 'shown';
                  });
            }
            // else is necessarily when me.status === 'shown'
            else {
               jelt
                  .stop(true)
            }
         }
      });
      me.elt.addEventListener('mouseleave', () => {
         // this boolean conditions in if must be by default either showing or shown.
         /// let us make these conditions for avoiding any problems.
         let jelt = $(me.elt);
         if (me.status === 'shown' || me.status === 'showing') {
            if (me.fixed) {
               jelt
                  .stop(true)
                  .fadeIn('fast', () => {
                     jelt.removeClass(me.status); // remove 'showing'
                     jelt.addClass('shown');
                     me.status = 'shown';
                  }); // if me.status was showing, then complete the "showning" procedures.
            } else {
               // the same as the pre-mentioned code here, but delayand fadeOut after that.
               jelt
                  .stop(true)
                  .fadeIn('fast', () => {
                     jelt.removeClass(me.status); // remove 'showing'
                     jelt.addClass('shown');
                     me.status = 'shown';
                  }) // if me.status was showing, then complete the "showning" procedures.
                  .delay(options.duration) // delaying
                  .fadeIn(0, () => {
                     me.hide();
                  }); // all is done, thatk belong to God (Allah) for blessing me wih new ideas and knowledge.
            }
         }
         
      });
   }

   me.setContent(options.content);
   me.setPosition(options.position);

   parent.appendChild(me.elt);

   //#endregion

   let layer;
   if (options.layer) layer = SUI.BackLayer({
      eltTOcover: parent,
      zIndex: options.zIndex - 1,
      onclick: () => {
         me.hide(true);
      }
   });
   me.layer = layer;
  
   return me;
}