export default class ExistBefore extends Error{
   constructor(id) {
      super('"' + id + '" has been defined before.');
      this.id = id;
   }
}