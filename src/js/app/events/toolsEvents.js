import { subTools } from '../global.js';

export default function toolsEvents() {

   //#region zoom

   let zoom = (direction) => {
      var delay = 20;
      setTimeout(() => {
         if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
         setTimeout(() => {
            if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
            setTimeout(() => {
               if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
               setTimeout(() => {
                  if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                  setTimeout(() => {
                     if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                     setTimeout(() => {
                        if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                        setTimeout(() => {
                           if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                           setTimeout(() => {
                              if (direction == 'in') { mySketch.gs.transform.zoomIn(); mySketch.update(); } else { mySketch.gs.transform.zoomOut(); mySketch.update(); }
                           }, delay);
                        }, delay);
                     }, delay);
                  }, delay);
               }, delay);
            }, delay);
         }, delay);
      });
   };

   document.querySelector('#zoom-in-btn').addEventListener('click', () => {
      zoom('in');
   });

   document.querySelector('#zoom-out-btn').addEventListener('click', () => {
      zoom('out');
   });

   //#endregion tool - subtools events

   let radios = document.querySelectorAll('.subtools-container input[type*="radio"]');
   radios.forEach(el => {
      subTools.type = el.checked ? el.dataset.type : subTools.type;
      el.addEventListener('change', () => {
         subTools.type = el.checked ? el.dataset.type : subTools.type;
      });
   });

   document.querySelector('#home').addEventListener('click', () => {
      mySketch.gs.reset();
      mySketch.update();
   });

   document.querySelector('#centrate').addEventListener('click', () => {
      mySketch.gs.centrate();
      mySketch.update();
   });

} 