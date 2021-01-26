import { subTools } from '../global.js';
import sketch from '../sketch.js';

export default function toolsEvents() {

   //#region zoom

   let zoom = (direction) => {
      var delay = 20;
      setTimeout(() => {
         if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
         setTimeout(() => {
            if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
            setTimeout(() => {
               if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
               setTimeout(() => {
                  if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
                  setTimeout(() => {
                     if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
                     setTimeout(() => {
                        if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
                        setTimeout(() => {
                           if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
                           setTimeout(() => {
                              if (direction == 'in') { sketch.gs.transform.zoomIn(); sketch.update(); } else { sketch.gs.transform.zoomOut(); sketch.update(); }
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
      sketch.gs.reset();
      sketch.update();
   });

   document.querySelector('#centrate').addEventListener('click', () => {
      sketch.gs.centrate();
      sketch.update();
   });

} 