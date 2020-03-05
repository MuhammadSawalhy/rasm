import Transform from './Transform.js';
import CoorManager from './CoorManager.js';
export default class {

  constructor(sketch, width, height) {
    this.sketch = sketch;
    this._width = width;
    this._height = height;

    this.coorManager = new CoorManager();
    this.transform = new Transform(this);

    this.center = new vector(this.width / 2, this.height / 2);

    this.physicsRun = false;

    this.childrenIDs = [];
  
  }

  get coor() { return this.sketch.coor; }

  get width() { return this._width || 0; }
  set width(value) {
    this._width = value; /** to update the boundaries */
    this.transform.onchange();
  }
  get height() { return this._height || 0; }
  set height(value) {
    this._height = value; /** to update the boundaries */
    this.transform.onchange();
  }

  get center() {
    return this.transform.center;
  }

  set center(vec) {
    this.transform.center = vec;
  }

  get iVector() {
    return this.transform.iVector;
  }

  get jVector() {
    return this.transform.jVector;
  }

  centrate() {
    this.transform.center = new vector(this.width / 2, this.height / 2);
  }

  reset() {
    this.transform.reset();
  }

  checkId(id) {
    if (!id) throw new Error('can\'t set a falsy value to the name of this sketch child.');
    let __id = id.replace(/^\s*([_a-zA-z\d]+)\s*$/, '$1');
    if (!__id)
      throw new Error(`"${id}" is not valid to use.`);
    else {
      if (this.childrenIDs.find(a=> a === id)) {
        throw new Error(`"${id}" is used before.`);
      }
    }
    return __id;
  }

}


