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
      super(options);

      if (!this.id.match(/[a-zA-Z_]+\d*/)) throw new Error(`${this.id} is invalid.`);
      
      Math[this.id] = this.value;

   }

   setValue(value, handlerOptions = []) {
      Math[this.id] = value;
      if (this.handlers.onchange) this.handlers.onchange(...handlerOptions);
   }

   getValue() {
      return Math[this.id];
   }

   remove() {
      delete Math[this.id];
      this.sketch.children.delete(this.id);
      this.gs.childrenIDs = this.gs.childrenIDs.filter(a => a !== this.id);
      if (this.handlers.remove) this.handlers.remove(...handlerArgs);
   }

}