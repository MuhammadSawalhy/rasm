import GraphChild from "./GraphChild.js";
import { getJSfunction } from '../global.js';

export default class EvalExpr extends GraphChild{
   constructor(options) {
      //#region 
      let propName;
      propName = 'expr';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + propName + ' property, or it is falsy value');
      }
      options.drawable = false;
      //#endregion
      super(options);

      if (this.expr.check({ type: 'operator', name: '=' })) {
         this.eval = new Function(
            'return ' +
            MathPackage.Parser.__generateJS(this.expr.args[0]) +
            ' === ' +
            MathPackage.Parser.__generateJS(this.expr.args[1])
         );         
      } else {
         this.eval = getJSfunction(this.expr);
      }
   }

   static fromString(str, sketch) {
      if (str) {
         return new EvalExpr({ expr: expr });
      }
      else
         throw new Error('your expression is empty :\'(');
   }
}