/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import GraphSettings from './GraphSetting/GraphSettings.js';
import Coordinates from './Coordinates.js';
import Canvas from './Canvas.js';
import { Xfunction, EvalExpr, Point, Variable, Empty, Slider } from './GraphChildren/index.js';
export default class Sketch {

    constructor(canvasParent) {
        this.canvas = new Canvas({ parent: canvasParent, attributes: { id: 'canvas' } });
        this.childrenCanvas = new Canvas({ parent: canvasParent, attributes: { id: 'children-canvas' } });
        this.gs = new GraphSettings(this, this.canvas.width, this.canvas.height);
        // this.gs.transform.handlers.onchange = () => {
        //     let i = this.gs.iVector,
        //         j = this.gs.jVector,
        //         c = this.gs.center;
        //     this.childrenCanvas.setTransform(i.x, i.y, j.x, j.y, c.x, c.y);
        // };
        this.coor = new Coordinates(this.gs);
        this.children = new Map();
        this.scriptParser = new MagicalParser.CustomParsers.Math();

        this.childrenCanvas.ctx.miterLimit = 1;

        this.updator = { worker: new Worker('./updateChildren.js'), data: { status: 'ready'}};
    }

    appendChild(child) {
        if (!child.id) throw new Error('Your sketch child should have had an id :\'(');
        let append = (child instanceof GraphChild ? child : this.childFromScript(child));
        this.children.set(child.id, child);
    }

    childFromScript(script, propsTOset = {}) {
        let parsedString = this.getChildParser.parse(script.replace(/\^/g, '**'));
        return childFromParsed(parsedString, propsTOset);
    }

    childFromParsed(parsedString, propsTOset = {}) {
        propsTOset.sketch = this;
        if (parsedString.type === '') {
            return new Empty(propsTOset);
        }
        if (parsedString.name === '=') {
            let left = parsedString.args[0], right = parsedString.args[1];

            if (left.check({ type: 'variable', name: 'y' }) && !right.contains({ type: 'variable', name: 'y' })) {
                return new Xfunction(Object.assign(propsTOset, { expr: right, }));
            }

            //such : area( h , b , theta ) = 0.5 * h * b * sin( theta )
            //such : f(x) = x^2
            else if (left.check({ type: 'functionCalling' }) && !this.gs.reservedFunction.find(name => Math.hasOwnProperty(left.name))) {
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

            //such : a = 2
            else if (left.type === 'variable' && right.type === 'number') {
                return new Slider(Object.assign(propsTOset, { id: left.name, value: right.value }));
            }
            //such : a = -2
            else if (left.type === 'variable' && right.check({ type: 'prefixOperator', name: '-' }) && right.args[0].type === 'number') {
                return new Slider(Object.assign(propsTOset, { id: left.name, value: -right.args[0].value }));
            }
            //such : a = 2b+c
            else if (left.type === 'variable') {
                return new Variable(Object.assign(propsTOset, { id: left.name, value: right }));
            }

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
            return new Xfunction(Object.assign(propsTOset, { expr: parsedString, }));
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
                return new Point({ x: parsedString.args[0].args[0], y: parsedString.args[0].args[1], ...propsTOset });
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

        return new EvalExpr(Object.assign(propsTOset, { expr: parsedString, drawable: false }));
    }

    getChildById(id) {
        // for (let index = 0; index < this.children.length; index++) {
        //     if (this.children[index].id === id) return { child, index };
        //     continue;
        // }
        return this.children.get(id);
    }

    update(draw = true, coors = true) {
        if (draw && coors) {
            this.canvas.clear();
            this.coor.draw(this.canvas);
        }
        let pro = new Promise((res) => {
            res();
        });
        // let vp = this.gs.viewport;
        // this.childrenCanvas.clear(null, [vp.xmin, vp.ymin, vp.width, vp.height]);
        if (this.updator.status !== 'updating') {
            
            this.updator.data.status = 'updating';
            this.updator.data.children = this.children.values();
            this.updator.worker.onmessage = (msg) => {
                console.log(msg.data);
            }
            this.updator.worker.postMessage(1);

            // let interval = setInterval(() => { 
            //     if (this.updator.status === 'ready') {
            //         clearInterval(interval);
            //         if (draw) {
            //             this.draw(false);
            //         }
            //     }
            // }, 10);
        }
    }

    draw(coors = true) {
        if (coors) {
            this.canvas.clear();
            this.coor.draw(this.canvas);
        }
        this.childrenCanvas.clear();
        for (let child of this.children.values()) {
            if (child) {
                child.draw(this.childrenCanvas);
            }
        }
    }

}
