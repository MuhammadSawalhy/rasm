
export function generateName() {
   return (Date.now() + generateName.randomNameNum++).toString(36);
}
generateName.randomNameNum = 0;

// let mathFunc = {
//    sin: x => Math.sin(x),
//    cos: x => Math.cos(x),
//    tan: x => Math.tan(x),
//    asin: x => Math.asin(x),
//    acos: x => Math.acos(x),
//    atan: x => Math.atan(x),
//    exp: x => Math.exp(x),
//    ln: x => Math.log(x),
//    log: function (x) {
//       let base = arguments[1] || 10;
//       return Math.log10(x) / Math.log(base);
//    },
//    sqrt: x => Math.sqrt(x),
//    max: (...values) => Math.max(...values),
//    min: (...values) => Math.min(...values),
//    round: x => Math.round(x),
//    abs: x => Math.abs(x),
//    floor: x => Math.floor(x),
//    ceil: x => Math.ceil(x),
// };
let mathFunc = {
   log: function (x, base = 10) {
      return Math.log10(x) / Math.log10(base);
   },
   ln: x => Math.log(x, Math.E),

   sec: x => 1 / Math.cos(x),
   csc: x => 1 / Math.sin(x),
   cot: x => 1 / Math.tan(x),

   sinh: x => (Math.exp(x) - Math.exp(-x)) / 2,
   cosh: x => (Math.exp(x) + Math.exp(-x)) / 2,
   tanh: x => Math.sinh(x) / Math.cosh(-x),
   asinh: x => Math.log,
   acosh: x => (Math.exp(x) + Math.exp(-x)) / 2,
   atanh: x => Math.sinh(x) / Math.cosh(-x),

};
Object.assign(Math, mathFunc);

export function getJSfunction(input, params, parse = true) {
   if (input instanceof Function)
      return input;
   else if (input instanceof MagicalParser.Node) {
      return MathPackage.Parser.parsedTOjsFunction(input, params);
   } else {
      return MathPackage.Parser.maximaTOjsFunction(input, params, parse);
   }
}
