import GraphChild from "./GraphChild.js";
import { getJSfunction } from '../global.js';

export default class Func /** or slider */ extends GraphChild {

   constructor(options) {
      //#region 
      let propName;
      propName = 'id';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + 'name' + ' property, or it is falsy value');
      }
      propName = 'expr';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + 'name' + ' property, or it is falsy value');
      }
      propName = 'params';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + 'name' + ' property, or it is falsy value');
      }
      //#endregion

      super(options, (me) => {
         if (!me.id.match(/[a-zA-Z_]+\d*/)) throw new Error(`${me.id} is invalid.`);
         me.func = getJSfunction(options.expr, options.params);
         Math[me.id] = me.func;
      });

   }

   _remove() {
      delete Math[this.id];
   }

}