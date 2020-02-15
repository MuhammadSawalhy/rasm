export default class Canvas{

   /**
    * to create an instance of Canvas class, this offer some good methods and propeties.
    * @param {Objetc} options 
    * you can set parent, canvas, attributes which contains any attribute of html. 
    */
   constructor(options = {}) {
      this.elt = options.canvas || document.createElement("canvas");
      this.ctx = this.elt.getContext('2d');
      if (options.parent) options.parent.appendChild(this.elt);
      if (options.attributes) {
         for (let [name, value] in attributes) {
            this.elt.setAttribut(name, value);
         }
      }
      this.font = { width: 15, family: 'Arial' };
   }

   resize(width, height) {
      this.elt.width = width;
      this.elt.height = height;
   }

   clear(fillStyle) {
      if (fillStyle) {
         this.ctx.fillStyle = fillStyle;
         this.ctx.fillRect(0, 0, this.elt.clientWidth, this.elt.clientHeight);
      } else {
         this.ctx.clearRect(0, 0, this.elt.clientWidth, this.elt.clientHeight);
      }
   }

   line(x1, y1, x2, y2) {
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
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
}