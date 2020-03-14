var SUI = {

};

function clearNodes(elt) {
   while (elt.hasChildNodes()) {
      elt.firstChild.remove();
   }
}

function getElementsFromHTML(html) {
   let div = document.createElement('div');
   div.innerHTML = html;
   return div.childNodes;
}


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
};

/**
 * an Example,,, 
 * 
 

let layer = SUI.BackLAyer({
   eltTOcover: eltTOcover,
   zIndex: zIndex,
   onclcik: () => { }
});

 
 */


//DropDown Is A Function That Processes An Already Existed Html Element(s).
/**
 * content is html object
 * 
 * layer, content, location, attached to the toggle, or set it by your self
 * make a func for setting location
 * ontoggling set the location of the toggle modefied according to the
 */
SUI.DropDown = function (options = {}) {
   var refineDDlocation = (dd, toggleLocation) => {
      /////// for the cloned DropDown ////////
      /////// for the cloned DropDown ////////
      /////// for the cloned DropDown ////////
      /////// for the cloned DropDown //////// 

      var location = dd.location,
         indSize = {
            width: dd.indicator.offsetWidth,
            height: dd.indicator.offsetHeight
         },
         indLocation = { x: 0, y: 0 },
         
         toggleSize = {
            width: dd.toggle.offsetWidth,
            height: dd.toggle.offsetHeight
         },

         menuSize = {
            width: dd.menu.offsetWidth,
            height: dd.menu.offsetHeight
         };


      let style = window.getComputedStyle(dd.menu);
      let margin = [
         parseInt(style.marginLeft.replace('px', '')),
         parseInt(style.marginTop.replace('px', '')),
         parseInt(style.marginRight.replace('px', '')),
         parseInt(style.marginBottom.replace('px', ''))
      ];
      
      var dir = 'top';
      if ((document.body.offsetWidth - dd.location.x - menuSize.width) < margin[2]) {
         dir = 'right';
         // exchange value of width and height as same as you rotate the shape by 90deg
         [indSize.width, indSize.height] = [indSize.height, indSize.width];
      } else if (dd.location.x < margin[1]) {
         dir = 'left';
         // exchange value of width and height as same as you rotate the shape by 90deg
         [indSize.width, indSize.height] = [indSize.height, indSize.width];
      }
      if ((document.body.offsetHeight - dd.location.y - menuSize.height) < margin[3]) {
         dir = 'bottom';
      }

      let newLocation;
      switch (dir) {
         case 'top':
            newLocation = {
               x: constrain(
                  location.x - menuSize.width / 2,
                  margin[0],
                  document.body.offsetWidth - dd.menu.offsetWidth - margin[2]
               ),
               y: constrain(
                  dd.location.y + toggleSize.height + indSize.height,
                  margin[1],
                  document.body.offsetHeight - dd.menu.offsetHeight - margin[3]
               )
            };
            break;
         case 'bottom':
            newLocation = {
               x: constrain(
                  location.x - menuSize.width / 2,
                  margin[0],
                  document.body.offsetWidth - dd.menu.offsetWidth - margin[2]
               ),
               y: constrain(
                  dd.location.y - menuSize.height - indSize.height,
                  margin[1],
                  document.body.offsetHeight - dd.menu.offsetHeight - margin[3]
               )
            };
            break;
         case 'right':
            newLocation = {
               x: constrain(
                  location.x - toggleSize.width - indSize.width,
                  margin[0],
                  document.body.offsetWidth - dd.menu.offsetWidth - margin[2]
               ),
               y: constrain(
                  dd.location.y - menuSize.height / 2,
                  margin[1],
                  document.body.offsetHeight - dd.menu.offsetHeight - margin[3]
               )
            };
            break;
         case 'left':
            newLocation = {
               x: constrain(
                  location.x + toggleSize.width + indSize.width,
                  margin[0],
                  document.body.offsetWidth - dd.menu.offsetWidth - margin[2]
               ),
               y: constrain(
                  location.y - menuSize.height / 2,
                  margin[1],
                  document.body.offsetHeight - dd.menu.offsetHeight - margin[3]
               )
            };
            break;
      }

      console.log('dir', dir);
      console.log('toggleLocation', toggleLocation);
      console.log('location', location);
      console.log('newLocation', newLocation);

      dd.location = newLocation;

      dd.menu.style.top = (newLocation.y) + 'px';
      dd.menu.style.left = (newLocation.x) + 'px';

      /////// for the indicator ////////
      /////// for the indicator ////////
      dd.indicator.className = `indicator ${dir}`;

      switch (dir) {
         case 'top':
            indLocation = {
               x: constrain(
                  toggleLocation.x - width / 2,
                  newLocation.x + 5,
                  newLocation.x + menuSize.width - width - 5
               ),
               y: newLocation.y - height
            };
            break;
         case 'bottom':
            indLocation = {
               x: constrain(
                  toggleLocation.x - width / 2,
                  newLocation.x + 5,
                  newLocation.x + menuSize.width - width - 5
               ),
               y: newLocation.y + menuSize.height
            };
            break;
         case 'right':
            indLocation = {
               x: newLocation.x + menuSize.width,
               y: constrain(
                  toggleLocation.y - height / 2,
                  newLocation.y + 5,
                  newLocation.y + menuSize.height - height - 5
               )
            };
            break;
         case 'left':
            indLocation = {
               x: newLocation.x - width,
               y: constrain(
                  toggleLocation.y - height / 2,
                  newLocation.y + 5,
                  newLocation.y + menuSize.height - height - 5
               )
            };
            break;
      }

      dd.indicator.style.top = (indLocation.y) + 'px';
      dd.indicator.style.left = (indLocation.x) + 'px';
   }
   var setClonedDDstyles = (dd) => {
      let rect = dd.toggle.getBoundingClientRect();
      let location = {
         x: rect.left,
         y: rect.top
      };
      dd.location = {
         x: location.x,
         y: location.y
      };

      dd.menu.style.left = (dd.location.x) + 'px';
      dd.menu.style.top = (dd.location.y) + 'px';
      refineDDlocation(dd, location);
   }

   let defaultOptions = {
      target: null,
      layer: null,
      toggleEvents: ['click'],
      animationDuration: 300,
      indicator: { size: { width: 20, height: 10 }, shape: 'triangle' }
   }
   options = options || {};
   options = Object.assign(defaultOptions, options);

   if (!options.target) throw new Error('Oops, your targetted html element (content) is undefined.');
   let obj = {
      options,
      target: options.target,
      toggle: options.target.querySelector('.toggle'),
      menu: options.target.querySelector('.menu'),
      layer: options.layer,
      location: { x: 0, y: 0 },
      status: 'hidden',

      __setStatus: function (status) {
         this.target.classList.remove(obj.status);
         this.clonedDD.classList.remove(obj.status);
         this.status = status;
         this.target.classList.add(obj.status);
         this.clonedDD.classList.add(obj.status);
      },

      show: function () {
         if (this.status !== 'hidden') return;

         this.setStatus('showing');
         setClonedDDstyles(this);

         setTimeout(() => {
            this.setStatus('shown');
         }, this.options.animationDuration);
      },

      hide: function () {
         if (this.status !== 'opened') return;

         this.setStatus('closing');

         setTimeout(() => {
            this.setStatus('closed');
         }, this.options.animationDuration);
      },

      prepare: function () {
         var toggle = this.toggle,
            menu = this.menu;

         var indicator = document.createElement('div');
         var layer = document.createElement('div');
         var cloned = document.createElement('div');

         //#region adding classes and events

         cloned.classList.add('cloned-dropdown');
         indicator.classList.add('indicator');
         layer.classList.add('layer');

         for (let evt of options.toggleEvents) {
            toggle.addEventListener(evt, (e) => {
               if (this.status === 'opened') {
                  this.close();
               } else if (this.status === 'closed') {
                  this.open();
               }
            });
         }

         layer.addEventListener('click', () => {
            if (this.status === 'opened') {
               this.close();
            }
         });


         //#endregion
         indicator.style.width = this.options.indicatorSize.width + 'px';
         indicator.style.height = this.options.indicatorSize.height + 'px';
         cloned.appendChild(indicator);
         cloned.appendChild(layer);
         cloned.appendChild(menu);
         this.clonedDD = cloned;
         this.indicator = indicator;
         this.setStatus('closed');

         document.body.appendChild(cloned);
      }

   };

   return obj;
};


SUI.TempMessege = function (options = {}) {
   options = Object.assign({
      content: '',
      layer: false,
      toolsbar: true,
      duration: 2000,
      position: null,
      onhoverFix: true,
      parent: document.body,
   }, options);

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
         
         if (options.toolsbar) div.appendChild(header);
         div.appendChild(content);

         div.classList.add('sui-temp-messege');
         div.style.display = 'none';
         let parentStyle = getComputedStyle(options.parent);
         let zIndex = parentStyle.zIndex;
         zIndex = !isNaN(zIndex) ? Math.max(parentStyle.zIndex + 2, 2000) : 2000;
         div.style.zIndex = zIndex; // +1 for layer if exists +2 for messege
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
                  this.options.onhoverFix = onhoverFix;
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

   if (options.onhoverFix) {
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
};

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
