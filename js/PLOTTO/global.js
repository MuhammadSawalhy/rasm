
export function generateName() {
   return (Date.now() + generateName.randomNameNum++).toString(36);
}
generateName.randomNameNum = 0;

let mathFunc = {
   sin: x => Math.sin(x),
   cos: x => Math.cos(x),
   tan: x => Math.tan(x),
   asin: x => Math.asin(x),
   acos: x => Math.acos(x),
   atan: x => Math.atan(x),
   exp: x => Math.exp(x),
   ln: x => Math.log(x),
   log: function(x) {
      let base = arguments[1] || 10;
      return Math.log10(x) / Math.log(base);
   },
};

Object.assign(window, mathFunc);
