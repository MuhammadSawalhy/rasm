export default class CoorManager {

   constructor(transform) {
      this.transform = transform || {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
   }

   get transform() {
      return this.trans;
   }

   set transform(trans) {

      this.e = trans.e;
      this.f = trans.f;

      this.a = trans.a;
      this.b = trans.b;
      this.c = trans.c;
      this.d = trans.d;

      let matrixInverse = (m) => {
         let i = {};
         let det = m.a * m.d - m.c * m.b;
         i.a = m.d / det;
         i.d = m.a / det;
         i.c = -m.c / det;
         i.b = -m.b / det;
         return i;
      };

      let inverse = matrixInverse(trans);

      this.ia = inverse.a;
      this.ib = inverse.b;
      this.ic = inverse.c;
      this.id = inverse.d;
   }

   coorTOpx(x, y) {
      return { x: this.xToPixel(x, y), y: this.yToPixel(x, y) };
   }
   
   pxTOcoor(x, y) {
      return { x: this.xTOcoor(x, y), y: this.yTOcoor(x, y) };
   }

   xToPixel(x, y) {
      /// x and y are cartesian coordiantes
      return (this.a * x + this.c * y + this.e);
   }

   yToPixel(x, y) {
      /// x and y are cartesian coordiantes
      return (this.b * x + this.d * y + this.f);
   }

   xTOcoor(x, y) {
      x = x - this.e;
      y = y - this.f;
      return this.ia * x + this.ic * y;
   }

   yTOcoor(x, y) {
      x = x - this.e;
      y = y - this.f;
      return this.ib * x + this.id * y;
   }
   
}