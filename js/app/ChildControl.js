export default class {
   constructor(sketch, value) {
      if (!sketch) throw new Error('sketch is not valid.');
      this.sketch = sketch;
      this.gs = this.sketch.gs;
      // value is the graph object
      this.value = value;
      this.elt = document.createElement('div');
      this.elt.innerHTML = `
      <li class="control">
        <div class="sideStatus" cancel-move>
          <div class="visible">
            <div class="inner">
              
            </div>
          </div>
          <div class="order-container">
            <span class='order'>12</span>
          </div>
        </div>
        <div class="script-container" cancel-move>
          <span type="text" class="obj-script"></span>
        </div>
        <div class="side-ctrl">
          <button class="closebtn-2 remove" cancel-move><div class="inner"></div></button>
          <span class="move">
            <div>
              <span>..</span>
              <span>..</span>
              <span>..</span>
            </div>
          </span>
        </div>
      </li>
      `;
      this.elt = (this.elt.childNodes[1]);

      this.__setEvents();
      this.__updateElts(); /// updating elements
   }
   get graphObject() {
      return this._graphObject;
   }
   set graphObject(value) {
      if (value) {
         if (!this._graphObject) {
            this.sketch.addObj(value);
         }
         this._graphObject = value;
      }
   }

   focus() {
      this.sketch.focusedObject.blur();

      // setting this to be focuses
      this.sketch.focusedObject = this;
      this.mathField.focus();
      this.elt.classList.add('focus');
   }

   blur() {
      this.sketch.focusedObject = undefined;
      this.mathField.blur();
      this.elt.classList.remove('focus');
   }

   remove(removeELT) {
      if (removeELT) {
         this.removeELT.click();
      }
      let me = this.sketch.getChildById(this.id);
      this.sketch.children.splice(me.index, 1);
   }

   __updateElts() {
      if (this.graphObject) {
         if (this.graphObject instanceof Xfunction) {
            this.elt.style.background = this.graphObject.color;
         }
      }
   }
}

