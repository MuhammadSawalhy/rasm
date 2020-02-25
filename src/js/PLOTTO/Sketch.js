/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import GraphSettings from './GraphSetting/GraphSettings.js';
import Coordinates from './Coordinates.js';
import Canvas from './Canvas.js';
import { Xfunction, EvalExpr, Point } from './GraphChilds/index.js';
export default class Sketch {

    constructor(canvas) {
        this.gs = new GraphSettings(this, canvas.clientWidth, canvas.clientHeight);
        this.coor = new Coordinates(this.gs);
        this.canvas = new Canvas({ canvas: canvas});
        this.subcanvas = new Canvas();
        this.childsCanvas = new Canvas();
        // this.canvas.ctx.textAlign = 'left';
        // this.subcanvas.ctx.textAlign = 'left';
        // this.childsCanvas.ctx.textAlign = 'left';

        this.children = new Map();
        this.getChildParser = new MagicalParser.CustomParsers.Math();
    }

    appendChild(child) {
        if (!child.id) throw new Error('Your sketch child should have had an id :\'(');
        let append = (child instanceof GraphChild ? child : this.childFromString(child));
        this.children.set(child.id, child);
    }

    childFromString(script, propsTOset = {}) {
        propsTOset.sketch = this;
        let parsedString = this.getChildParser.parse(script.replace(/\^/g, '**'));
        if (parsedString.check({ name: '=' })) {
            let left = parsedString.args[0], right = parsedString.args[1];
            
            if (left.check({ type: 'variable', name: 'y' }) && !right.contains({ type: 'variable', name: 'y' })) {
                return new Xfunction({ expr: right, ...propsTOset });
            }
           
            //such : area( h , b , theta ) = 0.5 * h * b * sin( theta )
            //such : f(x) = x^2
            else if (left.check({ type: 'functionCalling' }) && !this.gs.reservedFunction.find(name => name === left.name)) {
                // such : f(x) = x^2
                if (left.args.length == 1 && left.args[0].check({ type: 'variable', name: 'x' }) && !right.contains({ type: 'variable', name: 'y' })) {
                    return new Xfunction({ sketch: this, expr: right, id: left.name });
                }
                /*
                //such : area( h , b , theta) = 0.5 * h * b * sin( theta )
                else {
                    List < string > args = new List<string>();
                    LNode Process = null;
                    
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
                */
            }

            /*
            //such : a = 2 * c + sin( k )
            else if (left.IsId && MathExpression(right)) {
                LNode b = right, a = left;
                return new Variable(a.Name.Name, MathPackage.Transformer.GetNodeFromLoycNode(b, GraphSettings.CalculationSettings));
            }
            */

        }
        // /// like 2+3*x = sin(y)^2
        // else if ((IsBool(parsedString)) && (ContainsSymbol(parsedString, GraphSettings.sy_x) || ContainsSymbol(parsedString, GraphSettings.sy_y))) {
        //    XYFunction f = new XYFunction(GraphSettings);
        //    {
        //       Expression = MathPackage.Transformer.GetNodeFromLoycNode(parsedString, GraphSettings.CalculationSettings);
        //    };
        //    if (selectName) {
        //       if (enrollName) {
        //          f.SetName(GraphSettings.selectName());
        //       }
        //       else {
        //          f.Name = GraphSettings.selectName();
        //       }
        //    }
        //    return f;
        // }
        
        /// to add function like : x^2
        else if (parsedString.contains({ type: 'variable', name: 'x' })) {
            return new Xfunction({ expr: parsedString, ...propsTOset });
        }
    
        /// to add a point like (1, 2)
        else if (parsedString.check({ type: 'block', name: '()' }) && parsedString.args.length == 1 && parsedString.args[0].check({ type: 'separator', name: ',', length: 2 })) {
            /// it is a parametricFunction
            if (vars.contains('t')) {
                //    let func = new ParametricFunc({
                //       Parameter: "t",
                //       Start: new MathPackage.Nodes.Constant(-10),
                //       End: new MathPackage.Nodes.Constant(10),
                //       x_Expression: MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[0], GraphSettings.CalculationSettings),
                //       y_Expression: MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[1], GraphSettings.CalculationSettings),
                //    });
                //   ;
                //    func.Step = null;
                //    if (selectName) {
                //       if (enrollName)
                //          func.SetName(GraphSettings.selectName());
                //       else
                //          func.Name = GraphSettings.selectName();
                //    }
                //    return func;
            }
            /// it is a point
            else {
                return new Point({ x: parsedString.args[0].args[0], y: parsedString.args[0].args[1] , ...propsTOset });
            }
        }
    
        {
            /*

        else {
            //#region "Add PointsDependant";
            if (PDsTypes().Contains(parsedString.Target.Name.ToString())) {
                PointsDependant pd = GetPD(parsedString, GraphSettings, selectName, enrollName);
                if (pd != null) {
                    return pd;
                }
            }
            //#endregion
            else if (parsedString.Target.Name.ToString() == "Curve") {
                if (parsedString.Args.Count == 5) {
                    // Checking for problems
                    if (!parsedString.Args[0].IsId || !MathExpression(parsedString.Args[1]) || !MathExpression(parsedString.Args[2]) || !MathExpression(parsedString.Args[3]) || !MathExpression(parsedString.Args[4]))
                        throw new Exception($"the arguments is not valid.\n{parsedString.ToString().Remove(0, parsedString.ToString().length - 1)}");
                    // Getting the object
                    ParametricFunc func = new ParametricFunc(GraphSettings);
                    {
                        Parameter = parsedString.Args[0].Name.Name,
                            Start = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[1], GraphSettings.CalculationSettings),
                            End = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[2], GraphSettings.CalculationSettings),
                            x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[3], GraphSettings.CalculationSettings),
                            y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[4], GraphSettings.CalculationSettings),
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
                else if (parsedString.Args.Count == 6) {
                    // Checking for problems
                    if (!parsedString.Args[0].IsId || !MathExpression(parsedString.Args[1]) || !MathExpression(parsedString.Args[2]) || !MathExpression(parsedString.Args[3]) || !MathExpression(parsedString.Args[4]) || !MathExpression(parsedString.Args[5]))
                        throw new Exception($"the arguments is not valid.\n{parsedString.ToString().Remove(0, parsedString.ToString().length - 1)}");
                    // Getting the object
                    ParametricFunc func = new ParametricFunc(GraphSettings);
                    {
                        Parameter = parsedString.Args[0].Name.Name,
                            Start = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[1], GraphSettings.CalculationSettings),
                            End = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[2], GraphSettings.CalculationSettings),
                            Step = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[3], GraphSettings.CalculationSettings),
                            x_Expression = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[4], GraphSettings.CalculationSettings),
                            y_Expression = MathPackage.Transformer.GetNodeFromLoycNode(parsedString.Args[5], GraphSettings.CalculationSettings),
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

    */
        }

        return new EvalExpr({ expr: parsedString, ...propsTOset, drawable: false });
    }

    getChildById(id) {
        // for (let index = 0; index < this.children.length; index++) {
        //     if (this.children[index].id === id) return { child, index };
        //     continue;
        // }
        return this.children.get(id);
    }

    update() {
        if (this.canvas) {
            this.canvas.resize(this.gs.width, this.gs.height);
            this.childsCanvas.resize(this.gs.width, this.gs.height);
            this.childsCanvas.clear();
            for (let child of this.children.values()) {
                if (child && child.drawable) {
                    child.draw(this.childsCanvas);
                }
            }
            this.draw();
        }
    }

    draw() {
        this.canvas.clear(this.coor.coorSettings.background.toString());
        this.coor.draw(this.canvas);
        this.canvas.ctx.drawImage(this.childsCanvas.elt, 0, 0);
    }

}