
export default function() {
   let control = $('.controls .control');
   let scriptELT = control.querySelector('.script');
   let removeELT = control.querySelector('[class^="closebtn"]');
   let orderELT = control.querySelector('.order');
   let sketch = this.sketch;

   let checkExpr = (latex) => {
      this.graphObject = getObject(
         this.gs,
         MathPackage.transformer.latexTOsnode(latex)
      );
   };

   let mathField = MQ.MathField(scriptELT, {
      sumStartsWithNEquals: true,
      supSubsRequireOperand: true,
      // charsThatBreakOutOfSupSub: '+-=<>',
      autoSubscriptNumerals: true,
      // autoCommands: 'pi theta sqrt sum int prod',
      // // autoOperatorNames: '',
      maxDepth: 10,
      handlers: {
         edit: function () {
            checkExpr(mathField.latex());
         },

         enter: function () {
            let newObj = new ChildControl(sketch);
            __addOC(newObj, parseInt(orderELT.textContent));
            newObj.focus();
         },
      }
   });
   this.mathField = mathField;

   removeELT.onclick = (e) => {

   };


   $('.control .remove').bind('click', () => {
      removeOC(this);
      this.remove();
   });

}


