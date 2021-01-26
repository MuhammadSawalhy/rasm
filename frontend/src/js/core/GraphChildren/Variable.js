import GraphChild from "./GraphChild.js";
import { getJSfunction } from '../global.js';

export default class Variable /** or slider */ extends GraphChild {

   constructor(options) {
      //#region
      let propName;
      propName = 'id';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + 'name' + ' property, or it is falsy value');
      }
      propName = 'value';
      if (!options[propName]) {
         throw new Error('Your options passed to the shetchChild is not valid, it doesn\'t has ' + 'name' + ' property, or it is falsy value');
      }
      //#endregion
      super(options, (me) => {
         if (!me.id.match(/[a-zA-Z_]+\d*/)) throw new Error(`${me.id} is invalid.`);
         me.value = { valueOf: getJSfunction(me.value) };
         Math[me.id] = me.value;
      });
   }

   setValue(value, handlerOptions = []) {
      Math[this.id] = value;
      if (this.handlers.onchange) this.handlers.onchange(...handlerOptions);
   }

   getValue() {
      return Math[this.id];
   }

   _remove() {
      delete Math[this.id];
   }

}