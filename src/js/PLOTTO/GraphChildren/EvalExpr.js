import GraphChild from "./GraphChild.js";
import { getJSfunction } from '../global.js';

export default class EvalExpr extends GraphChild {
   constructor(options) {
      //#region 
      let propName;
      propName = 'expr';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + propName + ' property, or it is falsy value');
      }
      //#endregion

      super(options, (me) => {
         me.evalFunc = getJSfunction(me.expr);
      });
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
      return this.evalFunc();
   }

}