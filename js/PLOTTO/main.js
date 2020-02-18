//#region Get a GraphChild;
import XFuntion from './GraphChilds/functions/XFunction.js';
var getChildParser = new MagicalParser.CustomParsers.Math();

/**
 * To get any supported sktech child (either drawable or not) from a mere string (the script).
 * This will not add anything to the sketch and the grahpsetting ( except you pass true for enrollName { To add the name to the GraphSettings } )
 * @param {*} script the string that represents the sketch child.
 * @param {*} selectName If the object's name is not assigned in the script we will select a one from the avaliable names.
 * @param {*} enrollName If you want to SetName for this Object ( this will add the name to the GraphSettings )
 */
export function getSketchChild(script, selectName = true, enrollName = true) {
   let parsed = getChildParser.parse(script);
   if (parsed.call({ name: '=' })) {
      let left = parsed.args[0], right = parsed.args[1];

      //#region points_dependant; such : childName = pdType(...args)
      if (left.isId && isPD(right)) {
         let pd = GetPD(right, false, false);
         if (!pd) // It will happen when the pd title is "Curve", as it may be ParametricFunction.
            goto Line1;
         pd.SetName(left);
         return pd;
      }
      //#endregion

      //#region explicit functions;
                // to add function  e.g. " y = sin(x) "
                else if (left.IsId && left.Name == GraphSettings.sy_y && !ContainsSymbol(right, GraphSettings.sy_y)) {

         XFunction f = new XFunction(GraphSettings);
         {
            Expression = MathPackage.Transformer.GetNodeFromLoycNode(right, GraphSettings.CalculationSettings);
         };
         if (selectName) {
            if (enrollName) {
               f.SetName(GraphSettings.selectName());
            }
            else {
               f.Name = GraphSettings.selectName();
            }
         }
         return f;

      }
      // to add function  e.g. " sin(x) = y "
      else if (right.IsId && right.Name == GraphSettings.sy_y && !ContainsSymbol(left, GraphSettings.sy_y)) {
         XFunction f = new XFunction(GraphSettings);
         {
            Expression = MathPackage.Transformer.GetNodeFromLoycNode(left, GraphSettings.CalculationSettings);
         };
         if (selectName) {
            if (enrollName) {
               f.SetName(GraphSettings.selectName());
            }
            else {
               f.Name = GraphSettings.selectName();
            }
         }
         return f;
      }
      //such : a = c * x^2 + sin( x )
      else if (left.IsId && left.Name != GraphSettings.sy_x && MathExpression(right) && ContainsSymbol(right, GraphSettings.sy_x) && !ContainsSymbol(right, GraphSettings.sy_y)) {
         LNode b = right, a = left;

         XFunction f = new XFunction(GraphSettings);
         {
            Expression = MathPackage.Transformer.GetNodeFromLoycNode(b, GraphSettings.CalculationSettings);
         };
         if (enrollName) {
            f.SetName(a.Name.ToString());
         }
         else {
            f.Name = a.Name.ToString();
         }

         return f;

      }

      //such : area( h , b , theta ) = 0.5 * h * b * sin( theta )
      //such : f(x) = x^2
      else if (IsFuncId(left) && !AvaliableFunctions().Contains(left.Target.Name.Name)) {
         // such : f(x) = x^2
         if (left.Args.Count == 1 && left.Args[0].IsId && left.Args[0].Name == GraphSettings.sy_x && !ContainsSymbol(right, GraphSettings.sy_y)) {
            XFunction f = new XFunction(GraphSettings);
            if (MathExpression(right)) {
               f.Expression = MathPackage.Transformer.GetNodeFromLoycNode(right, GraphSettings.CalculationSettings);
            }
            else {
               throw new Exception("The function expression is not valid.");
            }
            if (enrollName) {
               f.SetName(left.Target.Name.Name);
            }
            else {
               f.Name = left.Target.Name.Name;
            }
            return f;
         }
         //such : area( h , b , theta) = 0.5 * h * b * sin( theta )
         else {
            string name = null;
            List < string > args = new List<string>();
            LNode Process = null;
            if (enrollName) {
               if (GraphSettings.IsNameUsed(left.Target.Name.Name)) {
                  throw new Exception("This name has been used before.");
               }
               name = left.Target.Name.Name;
            }
            else {
               name = left.Target.Name.Name;
            }
            foreach(LNode arg in left.Args);
            {
               if (arg.IsId) {
                  args.Add(arg.Name.Name);
               }
               else {
                  throw new Exception($"The argument {arg.ToString().Substring(0, arg.ToString().length - 1)} of the function \"{name.ToString()}\" is invalid");
               }
            }
            if (MathExpression(right)) {
               Process = right;
            }
            else {
               throw new Exception($"The process {right.ToString().Substring(0, right.ToString().length - 1)} of the function \"{name.ToString()}\" is invalid");
            }


            MathPackage.Operations.Func func = new MathPackage.Operations.Func(name, args, MathPackage.Transformer.GetNodeFromLoycNode(Process, GraphSettings.CalculationSettings));
            return func;
         }
      }
      //#endregion

      //#region implicit functions;
                // to add function  e.g. " y = sin(x)*y "
                else if (ContainsSymbol(right, GraphSettings.sy_x)
         || ContainsSymbol(right, GraphSettings.sy_y)
         || ContainsSymbol(left, GraphSettings.sy_x)
         || ContainsSymbol(left, GraphSettings.sy_y)) {

         XYFunction f = new XYFunction(GraphSettings);
         {
            Expression = MathPackage.Transformer.GetNodeFromLoycNode(node, GraphSettings.CalculationSettings);
         };
         if (selectName) {
            if (enrollName) {
               f.SetName(GraphSettings.selectName());
            }
            else {
               f.Name = GraphSettings.selectName();
            }
         }
         return f;
      }
      //#endregion

      //#region points;
      //such : a = (2, 3)
      else if (left.IsId && right.Calls(CodeSymbols.Tuple) && right.Args.Count == 2) {
         LNode a = right, b = left;
         /// it is a parametricFunction
         if (ContainsSymbol(a.Args[0], (Symbol)"t") || ContainsSymbol(a.Args[1], (Symbol)"t")) {
            ParametricFunc func = new ParametricFunc(GraphSettings);
            {
               Parameter = "t",
                  Start = new MathPackage.Operations.Constant(-10),
                  End = new MathPackage.Operations.Constant(10),
                  x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[0], GraphSettings.CalculationSettings),
                  y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[1], GraphSettings.CalculationSettings),
                        };
            func.Step = null;
            if (enrollName)
               func.SetName(b.Name.ToString());
            else
               func.Name = b.Name.ToString();
            return func;
         }
         /// it is a point
         else {
            GPoint point = GetPointFromTuple(a, GraphSettings);
            if (enrollName) {
               point.SetName(b.Name.ToString());
            }
            else {
               point.Name = b.Name.ToString();
            }
            return point;

         }
      }
      //#endregion

      //#region ParametricFunction;

      //such : a = Curve(n,1,20, x_expression, y_expression)
      if (left.IsId && !MathExpression(right)) {
         if (right.Target.Name.ToString() == "Curve") {
            LNode a = right, b = left;
            if (a.Args.Count == 5) {
               // Checking for problems
               if (!a.Args[0].IsId || !MathExpression(a.Args[1]) || !MathExpression(a.Args[2]) || !MathExpression(a.Args[3]) || !MathExpression(a.Args[4]))
                  throw new Exception($"the arguments is not valid.\n{a.ToString().Remove(0, a.ToString().length - 1)}");
               // Getting the object
               ParametricFunc func = new ParametricFunc(GraphSettings);
               {
                  Parameter = a.Args[0].Name.Name,
                     Start = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[1], GraphSettings.CalculationSettings),
                     End = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[2], GraphSettings.CalculationSettings),
                     x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[3], GraphSettings.CalculationSettings),
                     y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[4], GraphSettings.CalculationSettings),
                            };
               func.Step = null;
               if (enrollName)
                  func.SetName(b.Name.ToString());
               else
                  func.Name = b.Name.ToString();
               return func;
            }
            else if (a.Args.Count == 6) {
               // Checking for problems
               if (!a.Args[0].IsId || !MathExpression(a.Args[1]) || !MathExpression(a.Args[2]) || !MathExpression(a.Args[3]) || !MathExpression(a.Args[4]) || !MathExpression(a.Args[5]))
                  throw new Exception($"the arguments is not valid.\n{a.ToString().Remove(0, a.ToString().length - 1)}");
               // Getting the object
               ParametricFunc func = new ParametricFunc(GraphSettings);
               {
                  Parameter = a.Args[0].Name.Name,
                     Start = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[1], GraphSettings.CalculationSettings),
                     End = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[2], GraphSettings.CalculationSettings),
                     Step = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[3], GraphSettings.CalculationSettings),
                     x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[4], GraphSettings.CalculationSettings),
                     y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(a.Args[5], GraphSettings.CalculationSettings),
                            };
               if (enrollName)
                  func.SetName(b.Name.ToString());
               else
                  func.Name = b.Name.ToString();
               return func;
            }
         }
      }
      //#endregion

      //#region varaibles;
                //such : a = 2 * c + sin( k )
                else if (left.IsId && MathExpression(right)) {
         LNode b = right, a = left;
         return new Variable(a.Name.Name, MathPackage.Transformer.GetNodeFromLoycNode(b, GraphSettings.CalculationSettings));
      }
      //#endregion

   }
   /// like 2+3*x = sin(y)^2
   else if ((IsBool(node)) && (ContainsSymbol(node, GraphSettings.sy_x) || ContainsSymbol(node, GraphSettings.sy_y))) {
      XYFunction f = new XYFunction(GraphSettings);
      {
         Expression = MathPackage.Transformer.GetNodeFromLoycNode(node, GraphSettings.CalculationSettings);
      };
      if (selectName) {
         if (enrollName) {
            f.SetName(GraphSettings.selectName());
         }
         else {
            f.Name = GraphSettings.selectName();
         }
      }
      return f;
   }
   /// to add a point like (1, 2)
   else if (node.Calls(CodeSymbols.Tuple)) {
      /// it is a parametricFunction
      if (ContainsSymbol(node.Args[0], (Symbol)"t") || ContainsSymbol(node.Args[1], (Symbol)"t")) {
         ParametricFunc func = new ParametricFunc(GraphSettings);
         {
            Parameter = "t",
               Start = new MathPackage.Operations.Constant(-10),
               End = new MathPackage.Operations.Constant(10),
               x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[0], GraphSettings.CalculationSettings),
               y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[1], GraphSettings.CalculationSettings),
                    };
         func.Step = null;
         if (selectName) {
            if (enrollName)
               func.SetName(GraphSettings.selectName());
            else
               func.Name = GraphSettings.selectName();
         }
         return func;
      }
      /// it is a point
      else {
         GPoint point = GetPointFromTuple(node, GraphSettings);
         if (selectName) {
            if (enrollName) {
               point.SetName(GraphSettings.selectName());
            }
            else {
               point.Name = GraphSettings.selectName();
            }
         }
         return point;
      }
   }
   /// to add function like : x^2
   else if (MathExpression(node) && ContainsSymbol(node, GraphSettings.sy_x) && !ContainsSymbol(node, GraphSettings.sy_y)) {
      XFunction f = new XFunction(GraphSettings);
      {
         Expression = MathPackage.Transformer.GetNodeFromLoycNode(node, GraphSettings.CalculationSettings);
      };
      if (selectName) {
         if (enrollName) {
            f.SetName(GraphSettings.selectName());
         }
         else {
            f.Name = GraphSettings.selectName();
         }
      }
      return f;
   }
   else {
      #region "Add PointsDependant";
      if (PDsTypes().Contains(node.Target.Name.ToString())) {
         PointsDependant pd = GetPD(node, GraphSettings, selectName, enrollName);
         if (pd != null) {
            return pd;
         }
      }
      #endregion
                else if (node.Target.Name.ToString() == "Curve") {
         if (node.Args.Count == 5) {
            // Checking for problems
            if (!node.Args[0].IsId || !MathExpression(node.Args[1]) || !MathExpression(node.Args[2]) || !MathExpression(node.Args[3]) || !MathExpression(node.Args[4]))
               throw new Exception($"the arguments is not valid.\n{node.ToString().Remove(0, node.ToString().length - 1)}");
            // Getting the object
            ParametricFunc func = new ParametricFunc(GraphSettings);
            {
               Parameter = node.Args[0].Name.Name,
                  Start = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[1], GraphSettings.CalculationSettings),
                  End = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[2], GraphSettings.CalculationSettings),
                  x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[3], GraphSettings.CalculationSettings),
                  y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[4], GraphSettings.CalculationSettings),
                        };
            func.Step = null;
            if (selectName) {
               if (enrollName)
                  func.SetName(GraphSettings.selectName());
               else
                  func.Name = GraphSettings.selectName();
            }
            return func;
         }
         else if (node.Args.Count == 6) {
            // Checking for problems
            if (!node.Args[0].IsId || !MathExpression(node.Args[1]) || !MathExpression(node.Args[2]) || !MathExpression(node.Args[3]) || !MathExpression(node.Args[4]) || !MathExpression(node.Args[5]))
               throw new Exception($"the arguments is not valid.\n{node.ToString().Remove(0, node.ToString().length - 1)}");
            // Getting the object
            ParametricFunc func = new ParametricFunc(GraphSettings);
            {
               Parameter = node.Args[0].Name.Name,
                  Start = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[1], GraphSettings.CalculationSettings),
                  End = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[2], GraphSettings.CalculationSettings),
                  Step = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[3], GraphSettings.CalculationSettings),
                  x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[4], GraphSettings.CalculationSettings),
                  y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(node.Args[5], GraphSettings.CalculationSettings),
                        };
            if (selectName) {
               if (enrollName)
                  func.SetName(GraphSettings.selectName());
               else
                  func.Name = GraphSettings.selectName();
            }
            return func;
         }
      }
   }

   throw new Exception($"Your script \"{script}\" is not valid.");
}
/*
getPD(node, selectName, enrollName);
{
   if (node.Target.Name.ToString() == "Circle" && node.Args.Count == 3) {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            throw new Exception($"Your arguments is not valid for {node.Target.Name.ToString()}.");
         }
      }
      // adding the points
      ThreePCircle obj = new ThreePCircle(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;
   }
   else if (node.Target.Name.ToString() == "Circle" && node.Args.Count == 2) {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            throw new Exception($"Your arguments is not valid for {node.Target.Name.ToString()}.");
         }
      }
      // adding the points
      TwoPCircle obj = new TwoPCircle(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;
   }
   else if (node.Target.Name.ToString() == "Circle2" && node.Args.Count == 2) {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            throw new Exception($"Your arguments is not valid for {node.Target.Name.ToString()}.");
         }
      }
      // adding the points
      TwoPCircle2 obj = new TwoPCircle2(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;
   }
   else if (node.Target.Name.ToString() == "SemiCircle" && node.Args.Count == 2) {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            throw new Exception($"Your arguments is not valid for {node.Target.Name.ToString()}.");
         }
      }
      // adding the points
      TwoPSemiCircle obj = new TwoPSemiCircle(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;
   }
   else if (node.Target.Name.ToString() == "Curve") {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            return null;
         }
      }
      // adding the points
      Curve obj = new Curve(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;
   }
   else if (node.Target.Name.ToString() == "Polygone") {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            throw new Exception($"Your arguments is not valid for {node.Target.Name.ToString()}.");
         }
      }
      // adding the points
      Polygone obj = new Polygone(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;

   }
   else if (node.Target.Name.ToString() == "Line" && node.Args.Count == 2) {
      // Checking the points
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (!IsPoints(node.Args[i], GraphSettings)) {
            throw new Exception($"Your arguments is not valid for {node.Target.Name.ToString()}.");
         }
      }
      // adding the points
      Line obj = new Line(GraphSettings);
      for (int i = 0; i < node.Args.Count; i++)
      {
         if (node.Args[i].IsId) {
            obj.Points.Add((GPoint)GraphSettings.GetObjByName(node.Args[i].Name.ToString()));
         }
         else {
            obj.Points.Add(GetPointFromTuple(node.Args[i], GraphSettings));
         }
      }
      if (selectName) {
         if (enrollName) {
            obj.SetName(GraphSettings.selectName());
         }
         else {
            obj.Name = GraphSettings.selectName();
         }
      }
      return obj;

   }
   return null;
}

isPoints(LNode node, GraphSettings GraphSettings);
{
   if (node.Calls(CodeSymbols.Tuple, 2)) {
      if (MathExpression(node.Args[0]) && MathExpression(node.Args[1])) {
         return true;
      }
   }
   else if (node.IsId) {
      if (GraphSettings.GetObjByName(node.Name.ToString()) is GPoint)
      {
         return true;
      }
   }
   return false;
}

isPD(LNode node);
{
   if (IsFuncId(node) && PDsTypes().Contains(node.Target.Name.ToString()))
      return true;
   return false;
}

ExpressionContainsList(LNode node, GraphSettings graphSettings);
{
   graphSettings.CalculationSettings.Vars[2].Value = new MathPackage.Operations.Constant(-1);
   try {
      double d = MathPackage.Transformer.GetNodeFromLoycNode(node, graphSettings.CalculationSettings).Calculate(graphSettings.CalculationSettings);
   }
   catch (MathPackage.OutOfRangeException)
   {
      return true;
   }
   return false;
}

IsBool(LNode node);
{
   if (node.Name.IsOneOf(CodeSymbols.Eq,
      CodeSymbols.GT, CodeSymbols.GE, CodeSymbols.LT,
      CodeSymbols.LE, CodeSymbols.Eq, CodeSymbols.Not
      , CodeSymbols.And, CodeSymbols.Or, CodeSymbols.Neq
      , CodeSymbols.Xor
   )
   )
      return true;
   return false;
}
*/
ContainsSymbol(LNode node, params Symbol[] symbol);
{
   if (node.IsId) {
      foreach(Symbol sy in symbol);
      {
         if (node.Name.Name == sy.Name)
            return true;
      }
      return false;
   }
   if (node.IsLiteral) {
      return false;
   }
   for (int i = 0; i < node.Args.Count; i++)
   {
      if (node.Target.Name != (Symbol)"'." && ContainsSymbol(node.Args[i], symbol))
      {
         return true;
      }
   }
   return false;
}

MathExpression(LNode node);
{
   if (node.IsId || node.IsLiteral) {
      return true;
   }
   else if (node.Calls(CodeSymbols.Tuple)) {
      return false;
   }
   foreach(LNode node_ in node.Args);
   {
      if (!MathExpression(node_)) {
         return false;
      }
   }
   return true;
}

IsFuncId(LNode node);
{
   if (node.Style == (NodeStyle.PrefixNotation | NodeStyle.OneLiner) || node.Style == NodeStyle.PrefixNotation) {
      return true;
   }
   return false;
}

/// <summary>
/// you should pass a {Tuple} LNode : e.g. : (2, 5*r+6)
/// </summary>
/*
GetPointFromTuple(LNode node, GraphSettings GraphSettings);
{
   return new GPoint(MathPackage.Transformer.GetNodeFromLoycNode(node.Args[0], GraphSettings.CalculationSettings), MathPackage.Transformer.GetNodeFromLoycNode(node.Args[1], GraphSettings.CalculationSettings), GraphSettings);
}
*/
//#endregion

//#region Changing Names

checkName(name);
{
   let valid = false;
   name.replace(/^\s*([_a-zA-z]+\d*)\s*$/, (match, name) => {
      valid = true;
   });
   if (!valid)
      throw new Error(`"${Name}" is not valid to use.`);
}

//#endregion
