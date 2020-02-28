
//#region canvas events
import { subTools, mouse } from '../global.js';

export default function canvasEvents() {
   let mousepressed;
   let lines = MathPackage.Lines;
   canvas.elt.addEventListener('mousedown', (e) => {
      Object.assign(subTools, {
         type: subTools.type,
         mouse: new vector(mouse.x, mouse.y),
         iVector: new vector(...mySketch.gs.iVector.toArray()),
         jVector: new vector(...mySketch.gs.iVector.toArray())
      });

      mousepressed = true;
      if (subTools.type.search('axises') > -1) {
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
         subTools.pxViewport = {};
      }
      e.preventDefault();
   });

   window.addEventListener('mousemove', (e) => {
      let canvasPos = getPosittion(canvas.elt);
      mouse.x = e.x - canvasPos.left;
      mouse.y = e.y - canvasPos.top;

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
   }, true);

   function getPosittion(elt) {
      let parentPos = {left: 0, top: 0};
      if (elt.offsetParent) {
         parentPos = getPosittion(elt.offsetParent);
      }
      return { left: elt.offsetLeft + parentPos.left, top: elt.offsetTop + parentPos.top};
   }

   window.addEventListener('mouseup', (e) => {
      if (mousepressed) {
         mousepressed = false;
         if (subTools.type === 'move') {
            mySketch.draw();
         }
         else if (subTools.type.search('axises') > -1) {
            if (subTools.axis == 'x') {
               mySketch.coor.coorSettings.penXaxis.color = subTools.penColor;
               mySketch.draw();
            } else if (subTools.axis == 'y') {
               mySketch.coor.coorSettings.penYaxis.color = subTools.penColor;
               mySketch.draw();
            } else if (subTools.axis == 'xy') {
               mySketch.coor.coorSettings.penXaxis.color = subTools.xPenColor;
               mySketch.coor.coorSettings.penYaxis.color = subTools.yPenColor;
               mySketch.draw();
            }
         }
         else if (subTools.type === 'zoom') {
            if (subTools.pxViewport.width && subTools.pxViewport.height) {
               mySketch.gs.transform.transformOrigin = undefined;
               mySketch.gs.transform.setViewport(mySketch.gs.transform.getViewport(subTools.pxViewport), new vector(subTools.pxViewport.xmin, subTools.pxViewport.ymin));
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

         e.preventDefault();
         e.stopPropagation();
      }
   });

   canvas.elt.addEventListener('mousewheel', (e) => {
      {
         e.preventDefault();
         let center = mySketch.gs.center;
         let mousePos = mouse;       
         if (MathPackage.Core.dist(mouse.x, center.x, mouse.y, center.y) < 30){
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
         if (s.height < 10 && s.width > 10) {
            slice = { type: 'vertical' };
            s.ymin = 0;
            s.ymax = mySketch.gs.height;
            s.height = mySketch.gs.height;
         }
         else if (s.height > 10 && s.width < 10) {
            slice = { type: 'horizental' };
            s.xmin = 0;
            s.xmax = mySketch.gs.width;
            s.width = mySketch.gs.width;
         }
      }
      //#endregion

      //#region drawing box
      mySketch.subcanvas.resize(mySketch.gs.width, mySketch.gs.height);
      mySketch.subcanvas.clear();
      let c1 = mySketch.canvas.get(0, 0, mySketch.canvas.width, mySketch.canvas.height);
      let c2 = mySketch.canvas.get(s.xmin, s.ymin, s.width, s.height);
      mySketch.subcanvas.image(c1, 0, 0);
      let fadeColor = mySketch.coor.coorSettings.background.isDark() ? [255, 155] : [0, 155];
      mySketch.subcanvas.background(...fadeColor);
      if (s.width && s.height) {
         let size = 10,
            sw = 4 + (4), r = 3;
         if (!slice) {

            mySketch.subcanvas.stroke(0);
            mySketch.subcanvas.strokeWeight(sw);
            mySketch.subcanvas.rect(s.xmin, s.ymin, size, size, r);
            mySketch.subcanvas.rect(s.xmax - size, s.ymin, size, size, r);
            mySketch.subcanvas.rect(s.xmin, s.ymax - size, size, size, r);
            mySketch.subcanvas.rect(s.xmax - size, s.ymax - size, size, size, r);

            mySketch.subcanvas.stroke(255, 200);
            mySketch.subcanvas.strokeWeight(sw - 4);
            mySketch.subcanvas.rect(s.xmin, s.ymin, size, size, r);
            mySketch.subcanvas.rect(s.xmax - size, s.ymin, size, size, r);
            mySketch.subcanvas.rect(s.xmin, s.ymax - size, size, size, r);
            mySketch.subcanvas.rect(s.xmax - size, s.ymax - size, size, size, r);

         } else {
            let size = 20,
               sw = 4 + (4), r = 3;
            if (slice.type === 'vertical') {
               mySketch.subcanvas.stroke(0);
               mySketch.subcanvas.strokeWeight(sw);
               mySketch.subcanvas.rect(s.xmin, subTools.mouse.y - size / 2, size, size, r);
               mySketch.subcanvas.rect(s.xmax - size, subTools.mouse.y - size / 2, size, size, r);
               mySketch.subcanvas.stroke(255, 200);
               mySketch.subcanvas.strokeWeight(sw - 4);
               mySketch.subcanvas.rect(s.xmin, subTools.mouse.y - size / 2, size, size, r);
               mySketch.subcanvas.rect(s.xmax - size, subTools.mouse.y - size / 2, size, size, r);
            } else {
               mySketch.subcanvas.stroke(0);
               mySketch.subcanvas.strokeWeight(8);
               mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymin, size, size, r);
               mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymax - size, size, size, r);
               mySketch.subcanvas.stroke(255, 200);
               mySketch.subcanvas.strokeWeight(4);
               mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymin, size, size, r);
               mySketch.subcanvas.rect(subTools.mouse.x - size / 2, s.ymax - size, size, size, r);
            }
         }

         mySketch.subcanvas.image(c2, s.xmin, s.ymin);
      }
      image(mySketch.subcanvas, 0, 0);

      //#endregion

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

