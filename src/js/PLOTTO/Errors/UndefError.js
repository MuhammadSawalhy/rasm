export default class UndefError extends Error{
   constructor(undef) {
      super("");
      this.undef = undef;
   }
}