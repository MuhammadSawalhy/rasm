export default class GraphChild {
    constructor(graphSettings, name, _pen) {
        this.gs = graphSettings;
        this.id = Date.now().toString(36);
        this.name = name;
        this.pen = _pen;
    }

    static from(str) {
        return null;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        if (value && value !== this.name) {
            var this_ = this;
            (function checkName() {
                if (value.replace(/^\s*([-a-zA-z][a-zA-z]*\d*)\s*$/, '') !== '' || value === '_') {
                    throw (`thi name: "${value}" is not valid :(`);
                }
                for (let obj of this_.gs.sketch.objs) {
                    if (obj.name === value) {
                        throw (`thi name: "${value}" has been used before.`);
                    }
                }
            })();
            value.replace(/^\s*([-a-zA-z][a-zA-z]*\d*)\s*$/, (match, group1) => {
                this._name = group1;
            });
        }
    }

    /**
     * methods are here
     */

    /** */
    remove() { }
}
