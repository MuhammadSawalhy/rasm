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
         this.evalFunc = getJSfunction(this.expr);
      }
   }

   static fromString(str, sketch) {
      if (str) {
         // TODO: getting it from "a = 1+2/4"
         return new EvalExpr({ expr: expr });
      }
      else
         throw new Error('your expression is empty :\'(');
   }

   eval() {
      try {
         return this.evalFunc();
      } catch (e) {
         this.error(e);
      }
   }

}