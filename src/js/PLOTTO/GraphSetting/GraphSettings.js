import Transform from './Transform.js';

export default class {

  constructor(sketch, width, height) {
    this.sketch = sketch;
    this._width = width;
    this._height = height;
    this._center = new vector(this.width / 2, this.height / 2);

    this.transform = new Transform(this);
    this.transform.onchange();

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

  /**
   * @returns the i vector of the cartesian coordinates relative to (with respect to) the pixel coordinates
   */
  get iVector() {
    return vector.fromAngle(-this.transform.xAngle).mult(this.transform.xScale);
  }
  /**
  * @returns the j vector of the cartesian coordinates relative to (with respect to) the pixel coordinates
  */
  get jVector() {
    return vector.fromAngle(-this.transform.yAngle).mult(this.transform.yScale);
  }

  get center() { return this._center; }

  centrate() {
    this.transform.translate(new vector(
      this.width / 2 - this.center.x,
      this.height / 2 - this.center.y
    ));
  }

  reset() {
    this.transform.reset();
  }

  //#region convert { coor, px }

  coorTOpx(x, y) {
    return { x: this.xToPixel(x, y), y: this.yToPixel(x, y) };
  }
  pxTOcoor(x, y) {
    return { x: this.xTOcoor(x, y), y: this.yTOcoor(x, y) };
  }
  xToPixel(xCoorValue, yCoorValue) {
    return (this.center.x + (xCoorValue * this.transform.xScale) * Math.cos(this.transform.xAngle) + (yCoorValue * this.transform.yScale) * Math.cos(this.transform.yAngle));
  }
  yToPixel(xCoorValue, yCoorValue) {
    return (this.center.y - ((yCoorValue * this.transform.yScale) * Math.sin(this.transform.yAngle) + (xCoorValue * this.transform.xScale) * Math.sin(this.transform.xAngle)));
  }
  xTOcoor(xPixelValue, yPixelValue) {
    xPixelValue = xPixelValue - this.center.x;
    yPixelValue = this.center.y - yPixelValue;
    return ((Math.cos(this.transform.yAngle) * yPixelValue - Math.sin(this.transform.yAngle) * xPixelValue) / Math.sin(this.transform.xAngle - this.transform.yAngle)) / this.transform.xScale;
  }
  yTOcoor(xPixelValue, yPixelValue) {
    xPixelValue = xPixelValue - this.center.x;
    yPixelValue = this.center.y - yPixelValue;
    return ((Math.cos(this.transform.xAngle) * yPixelValue - Math.sin(this.transform.xAngle) * xPixelValue) / Math.sin(this.transform.yAngle - this.transform.xAngle)) / this.transform.yScale;
  }

  //#endregion

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


