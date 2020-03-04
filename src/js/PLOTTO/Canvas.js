export default class Canvas{

   /**
    * to create an instance of Canvas class, this offer some good methods and propeties.
    * @param {Objetc} options 
    * you can set parent, canvas, attributes which contains any attribute of html. 
    */
   constructor(options = {}) {
      this.elt = options.canvas || document.createElement("canvas");
      if (options.parent) {
         options.parent.appendChild(this.elt);
         this.elt.width = options.parent.clientWidth;
         this.elt.height = options.parent.clientHeight;
      }
      if (options.attributes) {
         for (let name in options.attributes) {
            this.elt.setAttribute(name, options.attributes[name]);
         }
      }
      this.font = { width: 15, family: 'Arial' };

      this.ctx = this.elt.getContext('2d');
      this.ctx.textBaseline = 'top';
   }


   get width() {
      return this.elt.width;
   }

   get height() {
      return this.elt.height;
   }

   resize(width, height) {
      let names = ['lineJoin', 'textBaseline', 'miterLimit', 'lineWidth'];
      let props = {};
      for (let p of names) {
         props[p] = this.ctx[p];
      }
      this.elt.width = width;
      this.elt.height = height;
      Object.assign(this.ctx, props);
   }

   clear(fillStyle, viewport) {
      if (fillStyle) {
         viewport = viewport || [0, 0, this.elt.clientWidth, this.elt.clientHeight];
         this.ctx.fillStyle = fillStyle;
         this.ctx.fillRect(...viewport);
      } else {
         viewport = viewport || [0, 0, this.elt.clientWidth, this.elt.clientHeight];
         this.ctx.clearRect(...viewport);
      }
   }

   setFont(font) {
      if (font.size) this.font.size = font.size;
      if (font.family) this.font.family = font.family;
      this.ctx.font = `${this.font.size}px ${this.font.family}`;
   }

   measureString(txt) {
      let size = this.ctx.measureText(txt);
      size.height = this.font.size;
      return size;
   }

   get transform() {
      return this._trans;
   }
   /**
    * @param {Array} trans : [a, b, c, d, e, f]
    */
   set transform(trans) {
      this._trans = trans;
      let mag2 = ((this._trans[0] + this._trans[2]) ** 2 + (this._trans[1] + this._trans[3]) ** 2) ** 0.5;
   }

   setTransform(...params) {
      this.transform = params;
      this.ctx.setTransform(...params);
   }

   getTransform() {
      return this.transform;
   }

   get lineWidth() {
      return this.lw;
   }

   set lineWidth(lw) {
      let mag = ((this._trans[0] + this._trans[2]) ** 2 + (this._trans[1] + this._trans[3]) ** 2) ** 0.5;
      this.ctx.lineWidth = lw / mag;
      this.lw = lw;
   }

   //#region shapes

   line(x1, y1, x2, y2) {
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
   }

   ellipse(x, y, radius1, radius2, rotation = 0, startAngle = 0, endAngle = Math.PI*2, counterClockWise = false) {
      radius2 = radius2 || radius1;
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, radius1, radius2 || radius1, rotation, startAngle, endAngle, counterClockWise);
      this.ctx.fill();
      this.ctx.stroke();
   }

   //#endregion

}