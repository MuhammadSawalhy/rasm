import GraphChild from "./GraphChild.js";

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
      this.eval = this.expr instanceof Function ? this.expr : MathPackage.Parser.maximaTOjsFunction(this.expr);
   }

   static fromString(str, sketch) {
      if (str) {
         return new EvalExpr({ expr: expr });
      }
      else
         throw new Error('your expression is empty :\'(');
   }
}