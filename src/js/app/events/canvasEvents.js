
//#region canvas events
import { subTools, mouse } from '../global.js';

export default function canvasEvents() {
   
   let mousepressed;
   let lines = MathPackage.Lines;
   let dragInterval;

   let startTransFunc = (e) => {

      mousepressed = true;

      /// the mouse position
      let canvasPos = getPosittion(canvas.elt);
      if (e.type === 'mousedown') {
         mouse.x = e.clientX - canvasPos.left;
         mouse.y = e.clientY - canvasPos.top;
      } else {
         //touchstart
         let touch = e.touches[0];
         mouse.x = touch.clientX - canvasPos.left;
         mouse.y = touch.clientY - canvasPos.top;
      }

      Object.assign(subTools, {
         type: subTools.type,
         mouse: new vector(mouse.x, mouse.y),
         iVector: mySketch.gs.transform.iVector,
         jVector: mySketch.gs.transform.jVector
      });

      if (subTools.type === 'move') {
         mouse.prev = { x: mouse.x, y: mouse.y };
         mouse.vel = { x: 0, y: 0 };
         clearInterval(dragInterval);
         dragInterval = setInterval(() => {
            // mouse.prevVel = mouse.vel;
            mouse.vel = { x: mouse.x - mouse.prev.x, y: mouse.y - mouse.prev.y };
            // mouse.acc = { x: mouse.vel.x - mouse.prevVel.x, y: mouse.vel.y - mouse.prevVel.y };
            mouse.prev = { x: mouse.x, y: mouse.y };
         }, 20);
      }
      else if (subTools.type.search('axises') > -1) {
         let xEq = lines.lineEquation(-mySketch.gs.transform.xAngle, mySketch.gs.center),
            yEq = lines.lineEquation(-mySketch.gs.transform.yAngle, mySketch.gs.center);
         let d = 30;
         let distTo = {
            x: lines.distToLine(subTools.mouse, xEq),
            y: lines.distToLine(subTools.mouse, yEq)
         };
         if (distTo.x < d && distTo.y < d) {
            subTools.axis = 'xy';
            subTools.xSpace = mySketch.gs.transform.xSapce;
            subTools.ySpace = mySketch.gs.transform.ySapce;
            subTools.xAngle = mySketch.gs.transform.xAngle;
            subTools.yAngle = mySketch.gs.transform.yAngle;
            subTools.transformOrigin = new vector(mySketch.gs.center.x, mySketch.gs.center.y);
            subTools.xPenColor = Object.assign(new drawing.color(), mySketch.coor.coorSettings.penXaxis.color);
            subTools.yPenColor = Object.assign(new drawing.color(), mySketch.coor.coorSettings.penYaxis.color);
            mySketch.coor.coorSettings.penXaxis.color = new drawing.color(255, 0, 0, 155);
            mySketch.coor.coorSettings.penYaxis.color = new drawing.color(255, 0, 0, 155);
         }
         else if (distTo.x < d) {
            subTools.axis = 'x';
            subTools.space = mySketch.gs.transform.xSapce;
            subTools.angle = mySketch.gs.transform.xAngle;
            let o = new vector(math.constrain(mySketch.gs.center.x, 0, mySketch.gs.width), math.constrain(mySketch.gs.center.y, 0, mySketch.gs.height));
            if (o.x !== mySketch.gs.center.x) {
               o = subTools.mouse;
            }
            subTools.transformOrigin = o;
            subTools.penColor = [mySketch.coor.coorSettings.penXaxis.color].slice()[0];
            mySketch.coor.coorSettings.penXaxis.color = new drawing.color(255, 0, 0, 155);
         }
         else if (distTo.y < d) {
            subTools.axis = 'y';
            subTools.space = mySketch.gs.transform.ySapce;
            subTools.angle = mySketch.gs.transform.yAngle;
            let o = new vector(math.constrain(mySketch.gs.center.x, 0, mySketch.gs.width), math.constrain(mySketch.gs.center.y, 0, mySketch.gs.height));
            if (o.y !== mySketch.gs.center.y) {
               o = subTools.mouse;
            }
            subTools.transformOrigin = o;
            subTools.penColor = [mySketch.coor.coorSettings.penYaxis.color].slice()[0];
            mySketch.coor.coorSettings.penYaxis.color = new drawing.color(255, 0, 0, 155);
         }
         else {
            subTools.axis = undefined;
         }
         subTools.increment = 0;
         mySketch.draw();
      } else if (subTools.type === 'zoom') {
         /// setting the layer of zoomBox
         let boxElt = document.createElement('div');
         boxElt.classList.add('zoom-box');
         // boxElt.setAttribute('style', `--top: 0;--left: 0;--width: 0;--height: 0;`);
         canvasParent.append(boxElt);
         subTools.boxElt = boxElt;
         subTools.pxViewport = {};
      }
      e.preventDefault();
   };

   canvasParent.addEventListener('mousedown', startTransFunc);
   canvasParent.addEventListener('touchstart', startTransFunc);

   let updateTransFunc = (e) => {
      let canvasPos = getPosittion(canvas.elt);
      if (e.type === 'mousemove') {
         mouse.x = e.clientX - canvasPos.left;
         mouse.y = e.clientY - canvasPos.top;
      } else {
         //touchstart
         let touch = e.touches[0];
         mouse.x = touch.clientX - canvasPos.left;
         mouse.y = touch.clientY - canvasPos.top;
      }
      if (mousepressed) {
         switch (subTools.type) {
            case 'move':
               {
                  moveCoor(e);
                  break;
               }
            case 'scale-axises':
               {
                  scaleAxises(e);
                  break;
               }
            case 'rotate-axises':
               {
                  rotateAxises(e);
                  break;
               }
            case 'zoom':
               {
                  zoomBox(e);
                  break;
               }
         }
         e.preventDefault();
      }
   };

   window.addEventListener('mousemove', updateTransFunc, true);
   window.addEventListener('touchmove', updateTransFunc, { passive: false, capture: true });

   function getPosittion(elt) {
      let parentPos = { left: 0, top: 0 };
      if (elt.offsetParent) {
         parentPos = getPosittion(elt.offsetParent);
      }
      return { left: elt.offsetLeft + parentPos.left, top: elt.offsetTop + parentPos.top };
   }

   let transEndFunc = (e) => {
      if (mousepressed) {
         mousepressed = false;
        
         if (subTools.type === 'move') {
            clearInterval(dragInterval);
            mouse.vel = new vector(mouse.vel.x, mouse.vel.y);
            while (mouse.vel.mag > 50) {
               mouse.vel = mouse.vel.mult(0.9);
            }
            dragInterval = setInterval(() => {
               if (mouse.vel.mag > 1) {
                  mouse.vel = mouse.vel.mult(0.9);
               }
               mySketch.gs.transform.translate(mouse.vel);
               mySketch.update();
               if (mouse.vel.mag <= 1) clearInterval(dragInterval);
            }, 10);
         }
         else if (subTools.type.search('axises') > -1) {
            if (subTools.axis == 'x') {
               mySketch.coor.coorSettings.penXaxis.color = subTools.penColor;
            } else if (subTools.axis == 'y') {
               mySketch.coor.coorSettings.penYaxis.color = subTools.penColor;
            } else if (subTools.axis == 'xy') {
               mySketch.coor.coorSettings.penXaxis.color = subTools.xPenColor;
               mySketch.coor.coorSettings.penYaxis.color = subTools.yPenColor;
            }
         }
         else if (subTools.type === 'zoom') {
            subTools.boxElt.remove();
            if (subTools.pxViewport.width && subTools.pxViewport.height) {
               mySketch.gs.transform.transformOrigin = undefined;
               mySketch.gs.transform.setViewport(mySketch.gs.transform.getViewport(subTools.pxViewport));
            }
            showTransDetails([
               'x: {',
               `  xmin: ${mySketch.gs.viewport.xmin},`,
               `  xmax: ${mySketch.gs.viewport.xmax}`,
               '},',
               'y: {',
               `  ymin: ${mySketch.gs.viewport.ymin},`,
               `  ymax: ${mySketch.gs.viewport.ymax}`,
               '}',
            ], 'zoom');
            mySketch.update();
         }
      }
   };

   window.addEventListener('mouseup', transEndFunc);
   window.addEventListener('touchend', transEndFunc);

   canvasParent.addEventListener('mousewheel', (e) => {
      {
         e.preventDefault();
         let center = mySketch.gs.center;
         let mousePos = mouse;
         if (MathPackage.Core.dist(mouse.x, mouse.y, center.x, center.y) < 30) {
            mousePos = center;
         }
         if (e.wheelDelta > 0) {
            mySketch.gs.transform.zoomIn(new vector(mousePos.x, mousePos.y));
            mySketch.update();
         } else {
            mySketch.gs.transform.zoomOut(new vector(mousePos.x, mousePos.y));
            mySketch.update();
         }
      }
   });

   //#region mouse move (tools'-subtools') functions

   function moveCoor(e) {
      mySketch.gs.transform.translate(new vector(mouse.x, mouse.y).subtract(subTools.mouse));
      mySketch.update();
      canvas.ellipse(mouse.x, mouse.y, 5);
      subTools.mouse = new vector(mouse.x, mouse.y);
   }

   function scaleAxises(e) {
      if (subTools.axis == 'x') {
         let rotatedMouse = subTools.mouse;
         let xEq = lines.lineEquation(-mySketch.gs.transform.xAngle, mySketch.gs.center);
         let incre = (math.dist(mouse.x, mouse.y, rotatedMouse.x, rotatedMouse.y) ** 2 - lines.distToLine(new vector(mouse.x, mouse.y), xEq) ** 2) ** 0.5;

         mySketch.gs.transform.transformOrigin = undefined;
         if (!isNaN(incre)) {
            let mina = angles.minAngle(vector.fromAngle(-mySketch.gs.transform.xAngle), new vector(mouse.x, mouse.y).subtract(rotatedMouse));
            let dir = mina < Math.PI / 2 ? 1 : (mina > Math.PI / 2 ? -1 : 0);

            mySketch.gs.transform.transformOrigin = subTools.transformOrigin;
            mySketch.gs.transform.xSpace += (incre * dir - subTools.increment);
            mySketch.gs.transform.reformXspace();
            subTools.increment = incre * dir;
         }

         mySketch.gs.transform.onchange(true);
         mySketch.update();
         canvas.ellipse(rotatedMouse.x, rotatedMouse.y, 5);
         canvas.ellipse(mouse.x, mouse.y, 5);

         showTransDetails([
            `*${(mySketch.gs.iVector.mag / subTools.iVector.mag).toFixed(2)}`
         ]);

      } else if (subTools.axis == 'y') {
         let rotatedMouse = subTools.mouse;
         let yEq = lines.lineEquation(-mySketch.gs.transform.yAngle, mySketch.gs.center);
         let incre = (math.dist(mouse.x, mouse.y, rotatedMouse.x, rotatedMouse.y) ** 2 - lines.distToLine(new vector(mouse.x, mouse.y), yEq) ** 2) ** 0.5;

         mySketch.gs.transform.transformOrigin = undefined;
         if (!isNaN(incre)) {
            let mina = angles.minAngle(vector.fromAngle(-mySketch.gs.transform.yAngle), new vector(mouse.x, mouse.y).subtract(rotatedMouse));
            let dir = mina < Math.PI / 2 ? 1 : (mina > Math.PI / 2 ? -1 : 0);

            mySketch.gs.transform.transformOrigin = subTools.transformOrigin;
            mySketch.gs.transform.ySpace += (incre * dir - subTools.increment);
            mySketch.gs.transform.reformYspace();
            subTools.increment = incre * dir;
         }

         mySketch.gs.transform.onchange(true);
         mySketch.update();
         canvas.ellipse(rotatedMouse.x, rotatedMouse.y, 5);
         canvas.ellipse(mouse.x, mouse.y, 5);
         showTransDetails([
            `*${(mySketch.gs.jVector.mag / subTools.jVector.mag).toFixed(2)}`
         ]);
      }
      else if (subTools.axis == 'xy') {
         let midEq = lines.lineEquation(-(mySketch.gs.transform.yAngle + mySketch.gs.transform.xAngle) / 2, mySketch.gs.center);
         let rotatedMouse = lines.projectionToLine(subTools.mouse, midEq); // rotatedMouse here is the modified start point which sets on the line between x and y axises 

         let incre = (math.dist(mouse.x, mouse.y, rotatedMouse.x, rotatedMouse.y) ** 2 - lines.distToLine(new vector(mouse.x, mouse.y), midEq) ** 2) ** 0.5; // pathagorean's method 

         mySketch.gs.transform.transformOrigin = undefined;
         if (!isNaN(incre)) {
            let mina = angles.minAngle(vector.fromAngle(-mySketch.gs.transform.yAngle), new vector(mouse.x, mouse.y).subtract(rotatedMouse));
            let dir = mina < Math.PI / 2 ? 1 : (mina > Math.PI / 2 ? -1 : 0);

            mySketch.gs.transform.transformOrigin = subTools.transformOrigin;
            let ratio = (mySketch.gs.transform.ySpace + (incre * dir - subTools.increment)) / mySketch.gs.transform.ySpace;
            ratio = math.constrain(ratio, 0.9, 1.1);
            mySketch.gs.transform.ySpace *= ratio;
            mySketch.gs.transform.xSpace *= ratio;
            mySketch.gs.transform.reformYspace();
            mySketch.gs.transform.reformXspace();
            subTools.increment = incre * dir;
         }

         mySketch.gs.transform.onchange(true);
         mySketch.update();
         canvas.ellipse(rotatedMouse.x, rotatedMouse.y, 5);
         canvas.ellipse(mouse.x, mouse.y, 5);
         showTransDetails([
            `*${(mySketch.gs.jVector.mag / subTools.jVector.mag).toFixed(2)}`
         ]);
      }
   }

   function rotateAxises(e) {
      if (subTools.axis == 'x') {
         if (math.dist(mySketch.gs.center.x, mySketch.gs.center.y, mouse.x, mouse.y) > 10) {
            let rotatedMouse = subTools.mouse;
            let rotationAngle = angles.angle(subTools.mouse.subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), new vector(mouse.x, mouse.y).subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), 'vectors');
            rotationAngle = angles.constrainAngle(rotationAngle);
            if (!isNaN(rotationAngle)) {
               // mySketch.gs.transform.xAngle = snapAngle(subTools.angle - rotationAngle);
               mySketch.gs.transform.xAngle = angles.snapAngle(subTools.angle - rotationAngle, [0, Math.PI]);
               let center = mySketch.gs.center;
               rotatedMouse = center.add(subTools.mouse.subtract(center).rotate(rotationAngle));
            }

            mySketch.gs.transform.transformOrigin = undefined;
            mySketch.gs.transform.invokeOnchange = true;
            mySketch.gs.transform.onchange();
            mySketch.update();

            canvas.ellipse(rotatedMouse.x, rotatedMouse.y, 5);
            canvas.ellipse(mouse.x, mouse.y, 5);
            showTransDetails([
               `xAngle: ${angles.stringDegAngle(mySketch.gs.transform.xAngle.toFixed(2))}`,
               `rotationAngle: ${angles.stringDegAngle(-rotationAngle)}`
            ]);
         }
      } else if (subTools.axis == 'y') {
         if (math.dist(mySketch.gs.center.x, mySketch.gs.center.y, mouse.x, mouse.y) > 10) {

            let rotatedMouse = subTools.mouse;
            let rotationAngle = angles.angle(subTools.mouse.subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), new vector(mouse.x, mouse.y).subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), 'vectors');
            rotationAngle = angles.constrainAngle(rotationAngle);
            if (!isNaN(rotationAngle)) {
               mySketch.gs.transform.yAngle = angles.snapAngle(subTools.angle - rotationAngle);
               let center = mySketch.gs.center;
               rotatedMouse = center.add(subTools.mouse.subtract(center).rotate(rotationAngle));
            }

            mySketch.gs.transform.invokeOnchange = true;
            mySketch.gs.transform.onchange();
            mySketch.update();
            canvas.ellipse(rotatedMouse.x, rotatedMouse.y, 5);
            canvas.ellipse(mouse.x, mouse.y, 5);
            showTransDetails([
               `yAngle: ${angles.stringDegAngle(mySketch.gs.transform.yAngle.toFixed(2))}`,
               `rotationAngle: ${angles.stringDegAngle(-rotationAngle)}`
            ]);
         }
      } else if (subTools.axis == 'xy') {
         if (math.dist(mySketch.gs.center.x, mySketch.gs.center.y, mouse.x, mouse.y) > 10) {
            let rotatedMouse = subTools.mouse;
            let rotationAngle = angles.angle(subTools.mouse.subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), new vector(mouse.x, mouse.y).subtract(new vector(mySketch.gs.center.x, mySketch.gs.center.y)), 'vectors');
            rotationAngle = angles.constrainAngle(rotationAngle);
            if (!isNaN(rotationAngle)) {
               mySketch.gs.transform.xAngle = subTools.xAngle - rotationAngle;
               mySketch.gs.transform.yAngle = subTools.yAngle - rotationAngle;
               let center = mySketch.gs.center;
               rotatedMouse = center.add(subTools.mouse.subtract(center).rotate(rotationAngle));
            }

            mySketch.gs.transform.invokeOnchange = true;
            mySketch.gs.transform.onchange();
            mySketch.update();
            canvas.ellipse(rotatedMouse.x, rotatedMouse.y, 5);
            canvas.ellipse(mouse.x, mouse.y, 5);
            showTransDetails([
               `xAngle: ${angles.stringDegAngle(mySketch.gs.transform.xAngle)}`,
               `yAngle: ${angles.stringDegAngle(mySketch.gs.transform.yAngle)}`,
               `rotationAngle: ${angles.stringDegAngle(-rotationAngle)}`
            ]);
         }
      }
   }

   function zoomBox(e) {

      //#region calculating box
      let s = { xmin: subTools.mouse.x, ymin: subTools.mouse.y, xmax: mouse.x, ymax: mouse.y };

      subTools.pxViewport.xmin = Math.min(s.xmin, s.xmax); subTools.pxViewport.ymin = Math.min(s.ymin, s.ymax);
      subTools.pxViewport.xmax = Math.max(s.xmin, s.xmax); subTools.pxViewport.ymax = Math.max(s.ymin, s.ymax);
      subTools.pxViewport.width = subTools.pxViewport.xmax - subTools.pxViewport.xmin;
      subTools.pxViewport.height = subTools.pxViewport.ymax - subTools.pxViewport.ymin;
      s = subTools.pxViewport;
      let slice;
      if (s.width < 10 && s.height < 10) {
         s.width = 0;
         s.height = 0;
      }
      // reserved ratios
      if (document.querySelector('#subtools-zoom-rr').checked || e.shiftKey) {
         let a = angles.minAngle(vector.fromAngle(0), new vector(mySketch.gs.width, mySketch.gs.height));
         let equ = lines.lineEquation(a, subTools.mouse);
         let p = lines.projectionToLine(new vector(mouse.x, mouse.y), equ);
         s = { xmin: subTools.mouse.x, ymin: subTools.mouse.y, xmax: Math.round(p.x), ymax: Math.round(p.y) };
         subTools.pxViewport.xmin = Math.min(s.xmin, s.xmax); subTools.pxViewport.ymin = Math.min(s.ymin, s.ymax);
         subTools.pxViewport.xmax = Math.max(s.xmin, s.xmax); subTools.pxViewport.ymax = Math.max(s.ymin, s.ymax);
         subTools.pxViewport.width = subTools.pxViewport.xmax - subTools.pxViewport.xmin;
         subTools.pxViewport.height = subTools.pxViewport.ymax - subTools.pxViewport.ymin;
         s = subTools.pxViewport;
      }
      else {
         subTools.boxElt.classList.remove('v');
         subTools.boxElt.classList.remove('h');
         if (s.height < 10 && s.width > 10) {
            slice = { type: 'v' };
            subTools.boxElt.classList.add('v');
            s.ymin = 0;
            s.ymax = mySketch.gs.height;
            s.height = mySketch.gs.height;
         }
         else if (s.height > 10 && s.width < 10) {
            slice = { type: 'h' };
            subTools.boxElt.classList.add('h');
            s.xmin = 0;
            s.xmax = mySketch.gs.width;
            s.width = mySketch.gs.width;
         }
      }
      //#endregion

      let fadeColor = mySketch.coor.coorSettings.background.isDark() ? '#fff5' : '#0005';
      subTools.boxElt.setAttribute('style', `--left: ${s.xmin}px; --top: ${s.ymin}px; --width: ${s.width}px; --height: ${s.height}px; --background: ${fadeColor}`);

   }

   /**
    * @param {Array} messeges ::: Array of string which will be converted into p html element
    */
   function showTransDetails(messeges) {
      let html = '<div class="subtools-details">';
      for (let msg of messeges) {
         html += '<p>' + msg + '</p>';
      }
      html += '</div>';
      subTools.details.setContent(html);
      subTools.details.show();
   }

   //#endregion

}

//#endregion

