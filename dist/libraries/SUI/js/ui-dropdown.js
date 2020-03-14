
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
                  toggleLocation.y - height/2,
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
      indicator: {size: { width: 20, height: 10}, shape: 'triangle'}
   }
   options = options || {};
   options = { ...defaultOptions, ...options };

   if (!options.target) throw new Error('Oops, your targetted html element (content) is undefined.');
   let obj = {
      options,
      target: options.target,
      toggle: options.target.querySelector('.toggle'),
      menu: options.target.querySelector('.menu'),
      layer: options.layer,
      location: { x: 0, y: 0},
      status: 'hidden',

      __setStatus: function(status) {
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

      prepare: function() {
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
}

