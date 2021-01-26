/*!
 * 
 * magical-parser v1.0.0       Mon Feb 24 2020 04:30:59 GMT+0200 (Eastern European Standard Time)
 * by Mohammed Samir       ms.2052001@gmail.com
 * https://github.com/scicave/magical-parser#readme
 * 
 * Copyright: 2020 NTNU;
 * License: Apache
 * 
 * Build: 39403ffcdb51a7d3840b
 *    
 */
(function webpackUniversalModuleDefinition(root, factory) {
   if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory();
   else if (typeof define === 'function' && define.amd)
      define([], factory);
   else if (typeof exports === 'object')
      exports["MagicalParser"] = factory();
   else
      root["MagicalParser"] = factory();
})(self, function () {
   return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
         /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
}
         /******/
};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
         /******/
};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
         /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
         /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/index.js");
      /******/
})
/************************************************************************/
/******/({

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

            // var Parser = require('../src/Parser').default;
            // var CustomParsers = require('../src/customParsers/index').default;
            var MagicalParser = __webpack_require__(/*! ../src/MagicalParser.js */ "./src/MagicalParser.js")["default"];

            module.exports = MagicalParser;

            /***/
}),

/***/ "./src/Grammer.js":
/*!************************!*\
  !*** ./src/Grammer.js ***!
  \************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Grammer; });
/* harmony import */ var _rules_Block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules/Block.js */ "./src/rules/Block.js");
            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



            var Grammer =
               /*#__PURE__*/
               function () {
                  function Grammer(rule) {
                     _classCallCheck(this, Grammer);

                     this.rule = rule;
                  }

                  _createClass(Grammer, [{
                     key: "prepareBlocks",
                     // addRule(rule) {
                     //    if (!this.rules) this.rules = []; // to avoid errors on push into an undefined variable.
                     //    this.rules.push(rule);
                     //    this.blocks.push(rule.getBlocksInside());
                     //    this.regex.push(rule.getRegex());
                     // }
                     value: function prepareBlocks() {
                        this.blocks = this.rule.getBlocksInside();
                     }
                  }, {
                     key: "prepareRegexes",
                     value: function prepareRegexes() {
                        this.regex = rule.getRegex();
                     }
                  }, {
                     key: "rule",
                     get: function get() {
                        return this._rule;
                     },
                     set: function set(value) {
                        this._rule = value;
                        this.prepareBlocks();
                        this.prepareRegexes();
                     }
                  }]);

                  return Grammer;
               }();



            /***/
}),

/***/ "./src/MagicalParser.js":
/*!******************************!*\
  !*** ./src/MagicalParser.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parser.js */ "./src/Parser.js");
/* harmony import */ var _OperatorsParser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorsParser.js */ "./src/OperatorsParser.js");
/* harmony import */ var _customParsers_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customParsers/index.js */ "./src/customParsers/index.js");
/* harmony import */ var _tokens_TOKENS_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens/TOKENS.js */ "./src/tokens/TOKENS.js");
/* harmony import */ var _tokens_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens/index.js */ "./src/tokens/index.js");
/* harmony import */ var _rules_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rules/index.js */ "./src/rules/index.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Node.js */ "./src/Node.js");







            var MagicalParser = {
               Node: _Node_js__WEBPACK_IMPORTED_MODULE_6__["default"],
               Parser: _Parser_js__WEBPACK_IMPORTED_MODULE_0__["default"],
               OperatorsParser: _OperatorsParser_js__WEBPACK_IMPORTED_MODULE_1__["default"],
               CustomParsers: _customParsers_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
               TOKENS: _tokens_TOKENS_js__WEBPACK_IMPORTED_MODULE_3__["default"],
               Tokens: _tokens_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
               Rules: _rules_index_js__WEBPACK_IMPORTED_MODULE_5__["default"]
            };
/* harmony default export */ __webpack_exports__["default"] = (MagicalParser);

            /***/
}),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Node; });
            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            /**
               sNode stands for structural node, used to represent the structure of the input text.,,,
               you can use the result (which is tree node of sNode with particular properities to do incredible things),
               it is used as a parse in mathpackage: {<https://github.com/ms2052001/mathpackage>}
            */
            var Node =
               /*#__PURE__*/
               function () {
                  /**
                   * @param {string} type is a on of these
                   *  'id', 'func', 'num', 'bool_op', 'binray_op', 'bool', op = {'+', '-', '*', '/', '^', '=', ...}
                   * 
                   * @param {*} args array of sNode
                   * @param {*} attributes object contains attributes names and values.
                   */
                  function Node(type) {
                     var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                     var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                     _classCallCheck(this, Node);

                     Object.assign(this, attributes);
                     this.args = args instanceof Array ? args : [args];
                     this.type = type; // if (type === 'op') {
                     //    let boolOps = ['and', 'or', 'xor', 'not', '&&', '||', '!'];
                     //    if (this.__contains(this.name, ...boolOps)) {
                     //       this.type = 'bool_op';
                     //    }
                     //    else if (this.name == ' ==') {
                     //       this.type = 'assign_op';
                     //    }
                     //    else {
                     //       this.type = type;
                     //    }
                     // } else {
                     //    this.type = type;
                     // }
                     // if (this.type === 'id') {
                     //    if (this.name === 'true' || this.name === 'false') {
                     //       this.type = 'bool';
                     //    }
                     // }
                  }

                  _createClass(Node, [{
                     key: "check",
                     value: function check(props) {
                        var argsCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.args.length;

                        for (var prop in props) {
                           if (this[prop] !== props[prop]) return false;
                        }

                        return true; // return (this.type === type || (this.type === 'op' && this.name === type)) && this.args.length === argsCount && this.type === type_;
                     }
                  }, {
                     key: "contains",
                     value: function contains(check) {
                        if (this.check(check)) {
                           return true;
                        }

                        if (this.args) for (var i = 0; i < this.args.length; i++) {
                           if (this.args[i].contains(check)) return true;
                        }
                        return false;
                     }
                  }, {
                     key: "isLiteral",
                     get: function get() {
                        return this.type === 'literal';
                     }
                  }]);

                  return Node;
               }();



            /***/
}),

/***/ "./src/OperatorsParser.js":
/*!********************************!*\
  !*** ./src/OperatorsParser.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return OperatorsParser; });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/Node.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ "./src/global.js");
/* harmony import */ var _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens/Operators.js */ "./src/tokens/Operators.js");
            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            /**
             * here is the flow chart of the algorithms::: {<https://www.lucidchart.com/invitations/accept/1c02df38-de1b-48da-8942-652652d373ea>}
             * 
             * options include:
             * functions:: if is is applied the expr " 1 + rg(2)" will be considered as " 1 + rg*(2)", thus rg is constants, here we sill consider the functions you insert in addtion to the common functions such as ['sin', 'cos', ...]
             *
             * operators search regex at regexr.com "https://regexr.com/4tbfe"
            
             */
            // import sNode from './sNode';




            var OperatorsParser =
               /*#__PURE__*/
               function () {
                  function OperatorsParser() {
                     var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                     _classCallCheck(this, OperatorsParser);

                     this.options = options;
                     Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["prepareOptions"])(options);
                  }
                  /**
                   * @param {string} str the string to be parsed 
                   * @param {object} options if you want to override the aleardy existing options
                   * @param {array} operations 
                   */


                  _createClass(OperatorsParser, [{
                     key: "parse",
                     value: function parse(str) {
                        var operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                        var options = this.options;
                        var forbiddenChars = options.forbiddenChars;
                        var snode;
                        operations = operations instanceof Map ? operations : new Map();
                        this.__clonedStr = str;
                        this.__realPos = 0; //#region pre codes
                        // checking errors

                        for (var i = 0; i < forbiddenChars.length; i++) {
                           if (Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["contains"])(str, forbiddenChars[i])) Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["sendError"])('forbidden char ' + forbiddenChars[i]);
                        } // if empty of characters


                        str = str.replace(/^\s*$/, function () {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('');
                        });
                        if (snode) return snode;
                        str = this.__parseBlocks(str, operations);

                        for (var _i = 0; _i < options.rulesRegex.length; _i++) {
                           str = str.replace(options.rulesRegex[_i], function () {
                              return;
                           });
                        }

                        str = this.__parseOpertors(str, operations); //#endregion

                        this.__parse(str, options, operations, {
                           parseBlocks: false,
                           parseOperators: false
                        });
                     }
                  }, {
                     key: "__parse",
                     value: function __parse(str, options, operations) {
                        var _this = this;

                        var subOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
                        subOptions = _objectSpread({
                           parseBlocks: true,
                           parseOperators: true
                        }, subOptions); /// or use Object.assign

                        var snode;

                        if (subOptions.parseBLocks) {
                           str = this.__parseBlocks(str, operations);
                        }

                        if (subOptions.parseOperators) {
                           str = this.__parseBlocks(str, operations);
                        } //#region final codes
                        // if empty of characters


                        str = str.replace(/^\s*$/, function () {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('');
                        });
                        if (snode) return snode; // if name of operation

                        str = str.replace(new RegExp("^\\s*(##".concat(options.nameTest, "##)\\s*$")), function (match, opName) {
                           snode = operations.get(opName).sNode;
                        });
                        if (snode) return snode; // something.abc.funcName(arg1, ...)

                        str = str.replace(new RegExp("^\\s*(".concat(options.nameTest, "\\s*\\.\\s*)+(?:(").concat(options.nameTest, ")\\s*(##").concat(options.nameTest, "##))\\s*$")), function (match, pathTOme, funcName, funcArgs) {
                           var args = operations.get(funcArgs);

                           if (options.all.prefixOperators.search(new RegExp(" \\(@(".concat(name, "),#(\\d*)\\) "))) > -1) {
                              var _arg = operations.get(args);

                              var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('prefixOperator', _arg, {
                                 name: name
                              });
                              operations.set(name, sn);
                           } else if (args.sNode.calls('()')) {
                              var func;

                              var extension = _this.parse(pathTOme, operations);

                              func = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('implementFunction', args.sNode.args, {
                                 name: funcName
                              }); // args.sNode.args the args of the bracket  it may be one or more;

                              snode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('.', [extension, func], {
                                 dotType: 'function',
                                 fullName: pathTOme + funcName
                              });
                           }
                        });
                        if (snode) return snode; //something.id

                        str = str.replace(/^\s*(.*)\.(\$\$[_a-zA-z]+\d*\$\$)\s*$/, function (match, pathTOme, id) {
                           if (match) {
                              snode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('.', [_this.parse(first, operations), new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('id', [], {
                                 name: id
                              })], {
                                 dotType: 'id',
                                 extension: match
                              });
                           }
                        });
                        if (snode) return snode; // if literal, number or variable or bool {true or false}, ...

                        str = str.replace(/^\s*(([_a-zA-z]+)\d*)\s*$/, function (match, value, notNum) {
                           if (match) {
                              snode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](notNum ? 'id' : 'num', [], {
                                 value: value
                              });
                           }
                        });
                        if (snode) return snode;
                        str = str.replace(/^(-?\d+\.?\d*)|(-?\d*\.?\d+)$/, function (match, value, notNum) {
                           if (match) {
                              snode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](notNum ? 'id' : 'num', [], {
                                 value: value
                              });
                           }
                        });
                        if (snode) return snode;
                        throw new Error('invalid script.\n' + str); // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements
                        //#endregion
                     }
                  }, {
                     key: "__parseBlocks",
                     value: function __parseBlocks(str, options, operations) {
                        var _this2 = this;

                        //#region brackets
                        var blocks = options.blocks;
                        var b;

                        var repBlock = function repBlock(match, content) {
                           var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();
                           var childArg = b.parser ? b.parser.parse(content) : _this2.__parse(content, options, operations);
                           var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('block', childArg, {
                              id: b.id,
                              tokenRef: b
                           });
                           operations.set(name, sn);
                           return name;
                        };

                        for (var i = 0; i < blocks.length; i++) {
                           b = blocks[i];
                           str = str.replace(b.regex, repBlock);
                        } //#endregion


                        return str;
                     }
                  }, {
                     key: "__parseOperators",
                     value: function __parseOperators(str, options, operations) {
                        /// RegExp: (var or num or block)(suffix)(op)(prefix)(var or num or block)
                        /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))
                        //#region separators
                        //if (!_contains(str, ...operators)) str = str.replace(/\s/g, '');
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                           for (var _iterator = options.separators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var s = _step.value;

                              if (new RegExp(s.regex).test(str)) {
                                 var _name9 = this.__get;
                                 var args = [];
                                 var strs = str.split(s);
                                 var _iteratorNormalCompletion2 = true;
                                 var _didIteratorError2 = false;
                                 var _iteratorError2 = undefined;

                                 try {
                                    for (var _iterator2 = strs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                       var str_ = _step2.value;
                                       args.push(this.parse(str_, operations));
                                    }
                                 } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                 } finally {
                                    try {
                                       if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                          _iterator2["return"]();
                                       }
                                    } finally {
                                       if (_didIteratorError2) {
                                          throw _iteratorError2;
                                       }
                                    }
                                 }

                                 operations.set(_name9, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('separator', args, {
                                    name: s,
                                    length: args.length
                                 }));
                              }
                           } //#endregion
                           //#region preparing ofr parsing process

                        } catch (err) {
                           _didIteratorError = true;
                           _iteratorError = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                 _iterator["return"]();
                              }
                           } finally {
                              if (_didIteratorError) {
                                 throw _iteratorError;
                              }
                           }
                        }

                        var argTest = "".concat(options.nameTest, "|").concat(options.numTest, "|##").concat(options.nameTest, "##");
                        var search = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")?\\s*(").concat(options.allRegex.operators, ")\\s*(").concat(options.allRegex.prefixOperators, ")?\\s*(").concat(argTest, ")\\s*")),
                           intialSearch = new RegExp("^\\s*(".concat(options.allRegex.prefixOperators, ")?\\s*(").concat(argTest, ")")),
                           finalSearch = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")\\s*$"));
                        var _str = '',
                           prevArg = {
                              name: null,
                              sn: null
                           }; //#endregion
                        //#region searchong for operators and parsing process
                        /// intial replacement

                        str = str.replace(intialSearch, function (match, prefix, arg) {
                           if (prefix) {
                              var _a = arg,
                                 b = 'prefixOperator',
                                 c = prefix;

                              if (!isNaN(_a)) {
                                 /// number
                                 var _name = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                 var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('number', [], {
                                    value: parseInt(_a)
                                 }), {
                                    name: c
                                 });
                                 operations.set(_name, sn);
                                 prevArg = {
                                    name: _name,
                                    sn: sn
                                 };
                              } else {
                                 var found = false;

                                 _a.replace("##".concat(options.nameTest, "##"), function () {
                                    found = true;
                                 });

                                 if (found) {
                                    /// operations
                                    var _sn = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, operations.get(_a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                       {
                                          name: c
                                       });

                                    operations.set(_a, _sn);
                                    prevArg.sn = {
                                       name: _a,
                                       sn: _sn
                                    };
                                 } else {
                                    /// varName
                                    var _name2 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                    var _sn2 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('variable', [], {
                                       name: _a
                                    }), {
                                       name: c
                                    });

                                    operations.set(_name2, _sn2);
                                    prevArg = {
                                       name: _name2,
                                       sn: _sn2
                                    };
                                 }
                              }
                           } else {
                              var _found = false;
                              arg.replace("##".concat(options.nameTest, "##"), function () {
                                 _found = true;
                              });

                              if (_found) {
                                 prevArg = {
                                    name: arg,
                                    sn: operations.get(arg)
                                 };
                              } else {
                                 prevArg = {
                                    name: arg
                                 };
                              }
                           }

                           return '';
                        });
                        var a;

                        while (a !== str) {
                           a = str; /// if replacement is not implemented, str will sstill the same and while loop will close

                           str = str.replace(search, function (match, suffix, op, prefix, arg) {
                              if (!op) {
                                 Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["sendError"])('operators', 'invalid operators', str, null);
                              }

                              if (suffix) {
                                 for (var i = 0; i < options.suffixOperators.length; i++) {
                                    if (options.suffixOperators[i].regex.test(suffix)) {
                                       /// creating an operations with type of  prefix operator,,, its arg is the prev arg
                                       var _a2 = prevArg.name,
                                          b = 'suffixOperator',
                                          c = suffix;

                                       if (!isNaN(_a2)) {
                                          /// number
                                          var _name3 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                          var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('number', [], {
                                             value: parseInt(_a2)
                                          }), {
                                             name: c
                                          });
                                          operations.set(_name3, sn);
                                          prevArg = {
                                             name: _name3,
                                             sn: sn
                                          };
                                       } else {
                                          var found = false;

                                          _a2.replace("##".concat(options.nameTest, "##"), function () {
                                             found = true;
                                          });

                                          if (found) {
                                             /// operations
                                             var _sn3 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                                {
                                                   name: c
                                                });

                                             operations.set(_a2, _sn3);
                                             prevArg.sn = _sn3;
                                          } else {
                                             /// varName
                                             var _name4 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                             var _sn4 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('variable', [], {
                                                name: _a2
                                             }), {
                                                name: c
                                             });

                                             operations.set(_name4, _sn4);
                                             prevArg = {
                                                name: _name4,
                                                sn: _sn4
                                             };
                                          }
                                       }
                                    }
                                 }
                              }

                              _str += prevArg.name + ' ' + op + ' ';

                              if (prefix) {
                                 var _a3 = arg,
                                    _b = 'prefixOperator',
                                    _c = prefix;

                                 if (!isNaN(_a3)) {
                                    /// number
                                    var _name5 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                    var _sn5 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('number', [], {
                                       value: parseInt(_a3)
                                    }), {
                                       name: _c
                                    });

                                    operations.set(_name5, _sn5);
                                    prevArg = {
                                       name: _name5,
                                       sn: _sn5
                                    };
                                 } else {
                                    var _found2 = false;

                                    _a3.replace("##".concat(options.nameTest, "##"), function () {
                                       _found2 = true;
                                    });

                                    if (_found2) {
                                       /// operations
                                       var _sn6 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](_b, operations.get(_a3), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                          {
                                             name: _c
                                          });

                                       operations.set(_a3, _sn6);
                                       prevArg.sn = {
                                          name: _a3,
                                          sn: _sn6
                                       };
                                    } else {
                                       /// varName
                                       var _name6 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                       var _sn7 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('variable', [], {
                                          name: _a3
                                       }), {
                                          name: _c
                                       });

                                       operations.set(_name6, _sn7);
                                       prevArg = {
                                          name: _name6,
                                          sn: _sn7
                                       };
                                    }
                                 }
                              } else {
                                 var _found3 = false;
                                 arg.replace("##".concat(options.nameTest, "##"), function () {
                                    _found3 = true;
                                 });

                                 if (_found3) {
                                    prevArg = {
                                       name: arg,
                                       sn: operations.get(arg)
                                    };
                                 } else {
                                    prevArg = {
                                       name: arg
                                    };
                                 }
                              }

                              return '';
                           });
                        } // final search


                        if (str !== '') {
                           str = str.replace(finalSearch, function (match, suffix) {
                              var a = prevArg.name,
                                 b = 'suffixOperator',
                                 c = suffix;

                              if (!isNaN(a)) {
                                 /// number
                                 var _name7 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                 var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('number', [], {
                                    value: parseInt(a)
                                 }), {
                                    name: c
                                 });
                                 operations.set(_name7, sn);
                                 prevArg = {
                                    name: _name7,
                                    sn: sn
                                 };
                              } else {
                                 var found = false;
                                 a.replace("##".concat(options.nameTest, "##"), function () {
                                    found = true;
                                 });

                                 if (found) {
                                    /// operations
                                    var _sn8 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                       {
                                          name: c
                                       });

                                    operations.set(a, _sn8);
                                    prevArg.sn = {
                                       name: a,
                                       sn: _sn8
                                    };
                                 } else {
                                    /// varName
                                    var _name8 = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["getRandomName"])();

                                    var _sn9 = new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_0__["default"]('variable', [], {
                                       name: a
                                    }), {
                                       name: c
                                    });

                                    operations.set(_name8, _sn9);
                                    prevArg = {
                                       name: _name8,
                                       sn: _sn9
                                    };
                                 }
                              }

                              _str += prevArg.name;
                              return '';
                           });
                           if (str !== '') Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["sendError"])('operators', 'invalid suffix operator at the end', '', null);
                        } //#endregion


                        return _str;
                     } //#region deprecated
                     //// deprecated // deprecated // deprecated // deprecated // deprecated 
                     //// deprecated // deprecated // deprecated // deprecated // deprecated 
                     //// deprecated // deprecated // deprecated // deprecated // deprecated
                     // __parseBlocks(str, options, operations) {
                     //    //#region brackets
                     //    var that = this;
                     //    var blocks = options.blocks;
                     //    let __parseBlock__ = (index, str_) => {
                     //       //// checking error,,, this ill be done on handling bracket's content, so don't do for this. 
                     //       let name = getRandomName();
                     //       // let str_ = str.slice(index.opening, index.closing); /// cut the text from the next sibiling of the opening char until the current closing index
                     //       let b = blocks.openedBlock.ref;
                     //       let searchingTxt = b.opening + str_ + b.closing;
                     //       str = str.replace(searchingTxt, name); // if the replacement is global or not, there will no be any problem unless the developer using this library set a block with the same features as the bolck of our operation name.
                     //       let childArg;
                     //       if (b.handleContent) {
                     //          childArg = that.parse(str_); /// here you are parsing new string with no operations yet. /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
                     //       } else {
                     //          childArg = new Node('undefined', [], { content: str_ }); /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
                     //       }
                     //       let sn = new Node('block', [childArg], { opening: b.opening, closing: b.closing, name: b.name });
                     //       operations.set(name, sn);
                     //       b.opened = false; blocks.openedBlock = null; // reset
                     //       return index.closing + (name.length - searchingTxt.length); /// new_i /// setting the index, as the string may shrink or be taller, it depends on the length of the name
                     //    };
                     //    let __parseBlocks__ = (i_intial = 0) => {
                     //       for (let i = i_intial; i < str.length; i++) {
                     //          if (this.__realPos || this.__realPos === 0) this.__realPos += 1; // dealing with the intial str be fore the parsing process
                     //          for (let b of blocks) {
                     //             /// if a block is opened, closing has the priority, unless, opening has the priority::: you can notice this in ***Mohammed***, if you check the opening char first the num will increase to 2, thus the block will not be closed,,, and an error will occur.
                     //             if (blocks.openedBlock) {
                     //                if (str.slice(i, i + b.closing.length) === b.closing) {
                     //                   if (b !== options.blocks.openedBlock.ref) {
                     //                      let iof = options.blocks.openedBlock.ref.opening.indexOf(b.opening);
                     //                      if (iof > -1) {
                     //                         // options.blocks.openedBlock.ref.opening  contains  b.closing::: for example *** contains **, you can use these blocks formatting typing, **Mohammed** will be bold.
                     //                         options.blocks.openedBlock.mayCloseAt = { ref: b, index: i, iof };
                     //                      } else {
                     //                         b.num--;
                     //                      }
                     //                   } else {
                     //                      b.num--;
                     //                   }
                     //                } else if (str.slice(i, i + b.opening.length) === b.opening) {
                     //                   b.num++;
                     //                   i += b.opening.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 
                     //                   this.__realPos += b.opening.length - 1;
                     //                }
                     //             } else {
                     //                if (str.slice(i, i + b.opening.length) === b.opening) {
                     //                   b.num++;
                     //                   i += b.opening.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 
                     //                   this.__realPos += b.opening.length - 1;
                     //                   // if (!blocks.openedBlock) { /// if not open, then open
                     //                   b.opened = true;
                     //                   blocks.openedBlock = { ref: b, index: i };
                     //                   // }
                     //                } else if (str.slice(i, i + b.closing.length) === b.closing) {
                     //                   b.num--;
                     //                }
                     //             }
                     //             /// when a bracket is close, but not opened. e.g. ::: " 1+2-5) "
                     //             if (b.num < 0) {
                     //                if (b.mustOpen) {
                     //                   sendError('closing a block not opened.');
                     //                } else {
                     //                   b.num = 0;
                     //                }
                     //             }
                     //             /// if true, the bracket's block is defined.
                     //             if (b.num === 0 && b.opened) { /// may other brackets' num be zero, as it does not exist or as it is closed but it closed inside the block that we are setting,,, e.g.::: " 1+2({1,2,3}^-1) "
                     //                let index = {
                     //                   opening: blocks.openedBlock.index + blocks.openedBlock.ref.opening.length,
                     //                   closing: i
                     //                };
                     //                let _str = str.slice(index.opening, index.closing);
                     //                if (checker.check(_str, b.content)) {
                     //                   i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i
                     //                } else {
                     //                   b.num++; // the considered closing found is not compatible, so continue shearching for another closing char
                     //                }
                     //             }
                     //          }
                     //       }
                     //    };
                     //    __parseBlocks__();
                     //    /// after finishing looping searching for brackets blocks, oooops, what is this?!!!, oh, the bracket is not closed. send an error
                     //    if (blocks.openedBlock) {
                     //       if (blocks.openedBlock.mayCloseAt) {
                     //          let index = {
                     //             opening:
                     //                blocks.openedBlock.index +
                     //                // blocks.openedBlock.mayCloseAt.ref.opening.length +    this will be added later
                     //                blocks.openedBlock.mayCloseAt.iof,
                     //             closing: blocks.openedBlock.mayCloseAt.index
                     //          };
                     //          /// the opening can be for another block e.g.::: (( and (,when we close with )) the blocks is ((content)), otherwise if we close with ) our block is (content) and the second "(" is the first char in the content 
                     //          blocks.openedBlock.ref.opened = false;
                     //          blocks.openedBlock.ref.num = 0;
                     //          blocks.openedBlock = { ref: blocks.openedBlock.mayCloseAt.ref, index: index.opening };
                     //          index.opening += blocks.openedBlock.mayCloseAt.ref.opening.length;
                     //          let _str = str.slice(index.opening, index.closing);
                     //          this.__realPos = str.length - 1 - index.closing;
                     //          let new_i;
                     //          if (checker.check(_str, blocks.openedBlock.mayCloseAt.ref.content)) {
                     //             new_i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i
                     //             __parseBlocks__(new_i);
                     //          } else {
                     //             if (blocks.openedBlock.ref.mustClose) {
                     //                sendError('block is not closed.', this.__realPos);
                     //             }
                     //             // the considered closing found is not compatible as content failed at the test, so continue shearching for another closing char
                     //             // so start just after the opening of the openedBlock.ref,,, 
                     //             // new_i = index.opening;
                     //             this.__realPos -= _str.length;
                     //             __parseBlocks__(index.opening);
                     //          }
                     //       } else {
                     //          if (blocks.openedBlock.ref.mustClose) {
                     //             sendError('block is not closed.', this.__realPos);
                     //          } else {
                     //             let new_i = blocks.openedBlock.index + blocks.openedBlock.ref.opening.length;
                     //             this.__realPos -= (str.length - 1) - new_i;
                     //             blocks.openedBlock.ref.opened = false;
                     //             blocks.openedBlock = null;
                     //             __parseBlocks__(new_i);
                     //          }
                     //       }
                     //    }
                     //    //#endregion
                     //    return str;
                     // }
                     //#endregion

                  }]);

                  return OperatorsParser;
               }();



            /***/
}),

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Parser; });
/* harmony import */ var _src_global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/global.js */ "./src/global.js");
/* harmony import */ var _Grammer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Grammer.js */ "./src/Grammer.js");
/* harmony import */ var _rules_Rule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules/Rule.js */ "./src/rules/Rule.js");
            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





            var Parser =
               /*#__PURE__*/
               function () {
                  function Parser(grammer) {
                     var _this = this;

                     _classCallCheck(this, Parser);

                     this.grammer = grammer instanceof _Grammer_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? grammer : grammer instanceof _rules_Rule_js__WEBPACK_IMPORTED_MODULE_2__["default"] ? new _Grammer_js__WEBPACK_IMPORTED_MODULE_1__["default"](grammer) : grammer;
                     this.blockState = !grammer.blocks || grammer.blocks.length === 0; // on this.prepareRegex();, if any Block Rule can't be searched as regex, this will be true

                     this.matchesTest = new RegExp("(".concat(_src_global_js__WEBPACK_IMPORTED_MODULE_0__["operationBlockChar"], "\\w+").concat(_src_global_js__WEBPACK_IMPORTED_MODULE_0__["operationBlockChar"], ")").concat(_src_global_js__WEBPACK_IMPORTED_MODULE_0__["operationBlockChar"], "(\\d+)").concat(_src_global_js__WEBPACK_IMPORTED_MODULE_0__["operationBlockChar"]), 'g');
                     this.matches = []; //#region seting the rootParser

                     var setRootParser = function setRootParser(rule) {
                        rule.rootParser = _this;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                           for (var _iterator = rule.childrenRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var child = _step.value;
                              setRootParser(child);
                           }
                        } catch (err) {
                           _didIteratorError = true;
                           _iteratorError = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                 _iterator["return"]();
                              }
                           } finally {
                              if (_didIteratorError) {
                                 throw _iteratorError;
                              }
                           }
                        }
                     };

                     setRootParser(this.grammer); //#endregion

                     this.prepareRegex();
                  }

                  _createClass(Parser, [{
                     key: "prepareRegex",
                     value: function prepareRegex() {
                        this.regex = new RegExp('^\\s*' + this.grammer.getRegex() + '\\s*$');
                     }
                  }, {
                     key: "parse",
                     value: function parse(str) {
                        var _this2 = this;

                        if (this.regex && str) {
                           //#region getting groups
                           var groups;

                           if (this.blockState) {
                              /**  
                               * this when a Block in this.grammer can't be searched as regex,
                               *  we will use Block.id for searchin them
                               */
                              //#region brackets
                              var _iteratorNormalCompletion2 = true;
                              var _didIteratorError2 = false;
                              var _iteratorError2 = undefined;

                              try {
                                 var _loop = function _loop() {
                                    var block = _step2.value;

                                    var getMatches = function getMatches(_str, matches) {
                                       var shift = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                                       var openingIndex = _str.search(block.openingReg),
                                          closingIndex = _str.search(block.closingReg);

                                       var contentStart, startIndex, contentEnd, endIndex;
                                       var length; /// to know the opening or closing string length 
                                       //#region getting the matched string

                                       if (openingIndex > -1 && closingIndex > -1 && closingIndex > openingIndex) {
                                          //#region evaluating indexes
                                          length = 0;

                                          _str.replace(block.openingReg, function (match) {
                                             length = match.length;
                                          });

                                          startIndex = openingIndex;
                                          contentStart = openingIndex + length;
                                          _str = _str.slice(contentStart); // the string after the opening string of the block

                                          var num = 1; /// searching for closing index

                                          while (num > 0) {
                                             openingIndex = _str.search(block.openingReg);
                                             closingIndex = _str.search(block.closingReg);

                                             if (closingIndex > -1) {
                                                if (openingIndex > closingIndex || openingIndex === -1) {
                                                   // here you are closing
                                                   num--;
                                                } else {
                                                   // here you are opening new block of the same opening
                                                   num++;
                                                }
                                             } else {
                                                throw new Error("block seams not to be closed, correct it and try again.");
                                             }
                                          }

                                          length = 0;

                                          _str.slice(closingIndex).replace(block.closingReg, function (match) {
                                             length = match.length;
                                          });

                                          contentEnd = contentStart + closingIndex
                                             /* the length of the content */
                                             ;
                                          endIndex = contentEnd + length
                                             /* the length of the closing string of the block */
                                             ; //#endregion
                                          //#region here we have our indexes, well done.
                                          //start is the startingIndex in the origin string, and so for end;

                                          matches.push({
                                             str: str.slice(startIndex + shift, endIndex + shift),
                                             content: str.slice(contentStart + shift, contentEnd + shift),
                                             start: startIndex + shift,
                                             end: endIndex + shift,
                                             contentStart: contentStart + shift,
                                             contentEnd: contentEnd + shift,
                                             realIndexes: {
                                                start: startIndex + shift,
                                                end: endIndex + shift,
                                                contentStart: contentStart + shift,
                                                contentEnd: contentEnd + shift
                                             }
                                          }); //#endregion
                                          // if we are not at the end of the string,,, get match from the reset of the passed _str

                                          _str = _str.slice(closingIndex + length); // getting the rest of the string

                                          if (_str !== '') {
                                             /// myClosingIndex  !== str.length - 1
                                             getMatches(_str, matches, shift + endIndex);
                                          }
                                       } //#endregion

                                    };

                                    var matches = [];
                                    getMatches(str, matches);
                                    _this2.matches = _objectSpread({}, _this2.matches, _defineProperty({}, block.id, matches));

                                    for (var i = 0; i < matches.length; i++) {
                                       // there is matched string in the "str"
                                       if (block.realRegex.test(matches[i].str)) {
                                          var id = block.getMatchId(i);
                                          str = str.slice(0, matches[i].start) + id + str.slice(matches[i].end);

                                          for (var ii = i + 1; ii < matches.length; ii++) {
                                             var shift = id.length - matches[i].str.length;
                                             matches[ii].start += shift;
                                             matches[ii].end += shift;
                                             matches[ii].contentStart += shift;
                                             matches[ii].contentEnd += shift;
                                          }
                                       }
                                    }
                                 };

                                 for (var _iterator2 = this.blocksRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    _loop();
                                 } //#endregion

                              } catch (err) {
                                 _didIteratorError2 = true;
                                 _iteratorError2 = err;
                              } finally {
                                 try {
                                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                       _iterator2["return"]();
                                    }
                                 } finally {
                                    if (_didIteratorError2) {
                                       throw _iteratorError2;
                                    }
                                 }
                              }
                           }
                           /* else {    
                            // this is an awesome state, when all blocks can be represented as regex...
                            // I wish all the code to be wrapped around by an awesome algorithms and special states
                           } */


                           str.replace(this.regex, function () {
                              groups = arguments;
                           });
                           if (!groups) throw new Error("your code doesn't match"); // groups = [...groups]; 

                           groups.pop();
                           groups.pop(); //#endregion

                           return this.grammer.parse(groups);
                        } else {
                           throw new Error('Ops, there was a problem in parsing process, perhaps your string is not valid for starting parsing, or your grammer is not precise');
                        }
                     }
                  }]);

                  return Parser;
               }();



            /***/
}),

/***/ "./src/customParsers/Math.js":
/*!***********************************!*\
  !*** ./src/customParsers/Math.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return CustomMathParser; });
/* harmony import */ var _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokens/Operators.js */ "./src/tokens/Operators.js");
/* harmony import */ var _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tokens/Block.js */ "./src/tokens/Block.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global.js */ "./src/global.js");
            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






            var CustomMathParser =
               /*#__PURE__*/
               function () {
                  function CustomMathParser(options) {
                     _classCallCheck(this, CustomMathParser);

                     this._options = {
                        autoMultSign: true,
                        vars: [],
                        /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
                        nameTest: "[a-zA-Z_]+\\d*",
                        numTest: "\\d+\\.?\\d*|\\d*\\.?\\d+",
                        prefixOperators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["PrefixOperator"]({
                           id: "+"
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["PrefixOperator"]({
                           id: "-"
                        })],
                        suffixOperators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["SuffixOperator"]({
                           id: "!"
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["SuffixOperator"]({
                           id: "deg"
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["SuffixOperator"]({
                           id: "rad"
                        })],
                        operators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "^",
                           zIndex: 10
                        }), // the first operator to process
                        new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "**",
                           zIndex: 10
                        }), // the first operator to process
                        new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "*",
                           zIndex: 9
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "/",
                           zIndex: 9
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "mod",
                           zIndex: 9
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "+",
                           zIndex: 7
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "-",
                           zIndex: 7
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: ">>",
                           zIndex: 6
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "<<",
                           zIndex: 6
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: ">=",
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "<=",
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "!=",
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "<",
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: ">",
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "==",
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "&",
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "band",
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "|",
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "bor",
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "bxor",
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "constrain",
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "in",
                           zIndex: 3
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "out",
                           zIndex: 3
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "xnor",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "xor",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "nand",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "nor",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "or",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "and",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "||",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "&&",
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: "=",
                           zIndex: 0
                        }) // the last operator to be applied
                        ],
                        separators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Separator"]({
                           id: ";"
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Separator"]({
                           id: ","
                        })],
                        blocks: [new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: /\(([^(]*?)\)/,
                           opening: '(',
                           closing: ')'
                        }), new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: /\{([^{]*?)\}/,
                           opening: '{',
                           closing: '}'
                        }), new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: /\[([^[]*?)\]/,
                           opening: '[',
                           closing: ']'
                        }), new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: /"((.*?|\\"))*"/,
                           opening: '"',
                           closing: '"'
                        }), /// string: ""
                        new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: /'((.*?|\\'))*'/,
                           opening: "'",
                           closing: "'"
                        }) /// string: ''
                        ],
                        forbiddenChars: []
                     };
                     this.options = _objectSpread({}, this._options, {}, options || {});
                  }

                  _createClass(CustomMathParser, [{
                     key: "parse",
                     value: function parse(str) {
                        var operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                        var options = this.options;
                        operations = operations instanceof Map ? operations : new Map(); //#region pre codes

                        for (var i = 0; i < options.forbiddenChars.length; i++) {
                           if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(str, options.forbiddenChars[i])) Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])("forbiddenSymbol", "forbidden symbol.");
                        } // // if empty
                        // str = str.replace(/\s+/g, () => {
                        //    return ' ';
                        // });
                        //#endregion


                        return this.__parse(str, options, operations);
                     }
                  }, {
                     key: "__parse",
                     value: function __parse(str, options, operations) {
                        var subOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
                        subOptions = _objectSpread({
                           parseBlocks: true,
                           parseOperators: true
                        }, subOptions); /// or use Object.assign
                        // if empty of characters

                        var snode;
                        str = str.replace(/^\s*$/, function () {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("", [], {
                              match: str
                           });
                        });
                        if (snode) return snode;

                        if (subOptions.parseBlocks) {
                           str = this.__parseBlocks(str, options, operations);
                        }

                        if (subOptions.parseOperators) {
                           str = this.__parseOperators(str, options, operations);
                        }

                        var returnedValue = this.__parseArg(str, options, operations);

                        returnedValue.match = returnedValue.match || options.getMatchedString(str, operations);
                        return returnedValue;
                     }
                     /**
                      * this modified version of __parseBlocks is much better and faster,,, we have gotten rid of if statements and varaible and alot of code that are redundant
                      */

                  }, {
                     key: "__parseBlocks",
                     value: function __parseBlocks(str, options, operations) {
                        var _this = this;

                        //#region brackets
                        var blocks = options.blocks;
                        var b;
                        var end; // for while loop in replacing

                        var repBlock = function repBlock(match, content) {
                           var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                           var args = [];

                           if (b.parser) {
                              if (b.parser === 'inherit') {
                                 args = [_this.__parse(content, options, operations)];
                              } else {
                                 args = [b.parser(content)];
                              }
                           }

                           var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("block", args, {
                              name: b.name,
                              match: options.getMatchedString(match, operations),
                              content: options.getMatchedString(content, operations)
                           });
                           operations.set(name, sn);
                           end = false;
                           return name;
                        };

                        for (var i = 0; i < blocks.values.length; i++) {
                           b = blocks.values[i];
                           end = false;

                           while (!end) {
                              end = true;
                              str = str.replace(b.regex, repBlock);
                           }
                        }

                        return str;
                     }
                  }, {
                     key: "__parseOperators",
                     value: function __parseOperators(str, options, operations) {
                        var _this2 = this;

                        /// RegExp: (arg)(suffix)(op)(prefix)(arg)
                        /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))
                        //#region separators
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                           for (var _iterator = options.separators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var s = _step.value;

                              if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(str, s.id)) {
                                 var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                 var args = [];
                                 var strs = str.split(s);
                                 var _iteratorNormalCompletion2 = true;
                                 var _didIteratorError2 = false;
                                 var _iteratorError2 = undefined;

                                 try {
                                    for (var _iterator2 = strs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                       var str_ = _step2.value;
                                       args.push(this.__parse(str_, options, operations));
                                    }
                                 } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                 } finally {
                                    try {
                                       if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                          _iterator2["return"]();
                                       }
                                    } finally {
                                       if (_didIteratorError2) {
                                          throw _iteratorError2;
                                       }
                                    }
                                 }

                                 operations.set(name, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("separator", args, {
                                    name: s.name,
                                    length: args.length,
                                    match: options.getMatchedString(str, operations)
                                 }));
                                 return name;
                              }
                           } //#endregion
                           //#region preparing for parsing process

                        } catch (err) {
                           _didIteratorError = true;
                           _iteratorError = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                 _iterator["return"]();
                              }
                           } finally {
                              if (_didIteratorError) {
                                 throw _iteratorError;
                              }
                           }
                        }

                        var _str = "",
                           prevArg = null; //#endregion
                        //#region searching for operators and parsing suffix and prefix
                        /// intial replacement

                        str = str.replace(options.opIntialTestReg, function (match, prefix, arg) {
                           if (prefix) {
                              var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                              var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("prefixOperator", _this2.__parseArg(arg, options, operations), {
                                 name: prefix,
                                 match: options.getMatchedString(match, operations)
                              });
                              operations.set(name, sn);
                              prevArg = name;
                           } else {
                              prevArg = arg;
                           }

                           return "";
                        });
                        var end = false; // inner search for operators

                        while (!end) {
                           end = true; /// if replacement is not implemented, str will sstill the same and while loop will close

                           str = str.replace(options.opTestReg, function (match, suffix, op, prefix, arg) {
                              if (!op) {
                                 Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])("operators", "invalid operators", str, null);
                              }

                              if (suffix) {
                                 /// creating an operations with type of suffix operator,,, its arg is the prev arg
                                 var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                 var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("suffixOperator", _this2.__parseArg(prevArg, options, operations), {
                                    name: suffix,
                                    match: options.getMatchedString(prevArg + suffix, operations)
                                 });
                                 operations.set(name, sn);
                                 prevArg = name;
                              }

                              _str += "".concat(prevArg, " ").concat(op, " ");

                              if (prefix) {
                                 /// creating an operations with type of prefix operator,,, its arg is the prev arg
                                 var _name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                                 var _sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("prefixOperator", _this2.__parseArg(arg, options, operations), {
                                    name: prefix,
                                    match: options.getMatchedString(prefix + arg, operations)
                                 });

                                 operations.set(_name, _sn);
                                 prevArg = _name;
                              } else {
                                 prevArg = arg;
                              }

                              end = false;
                              return "";
                           });
                        } // final search


                        if (str !== "") {
                           str = str.replace(options.opFinalTestReg, function (match, suffix) {
                              var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                              var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("suffixOperator", _this2.__parseArg(prevArg, options, operations), {
                                 name: suffix,
                                 match: options.getMatchedString(prevArg + match, operations)
                              });
                              operations.set(name, sn);
                              _str += name;
                              return "";
                           });
                           if (str !== "") Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])("operators", "invalid suffix operator at the end", "", null);
                        } else {
                           _str += prevArg;
                        } //#endregion


                        end = options.argTestReg.test(_str); //#region parsing operators

                        if (!end) {
                           for (var i = 0; i < options.operators.length; i++) {
                              end = false;

                              while (!end) {
                                 end = true;

                                 if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(_str, options.operators[i].id)) {
                                    _str = _str.replace(new RegExp("(".concat(options.argTest, ")\\s*(").concat(options.operators[i].regexStr, ")\\s*(").concat(options.argTest, ")")), function (match, g1, op, g2) {
                                       var arg1 = _this2.__parseArg(g1, options, operations),
                                          arg2 = _this2.__parseArg(g2, options, operations);

                                       var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                       operations.set(name, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("operator", [arg1, arg2], {
                                          name: op,
                                          match: options.getMatchedString(match, operations)
                                       }));
                                       end = false;
                                       return name;
                                    });
                                 } /// if the operator is not found,,, end the while loop.

                              }
                           }
                        } //#endregion


                        return _str;
                     }
                  }, {
                     key: "__parseArg",
                     value: function __parseArg(str, options, operations) {
                        //#region the last thing in str,,, number or name or operationName
                        var snode; // if name of operation

                        str = str.replace(/^\s*(.*)\s*$/, "$1"); /// if number

                        if (!isNaN(str)) {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("number", [], {
                              value: parseFloat(str),
                              match: str
                           });
                        }

                        if (snode) return snode; // if operation name

                        str = str.replace(options.operationTestGroupedReg, function (match, funcName, opName) {
                           snode = operations.get(opName);

                           if (funcName && snode.type === 'block' && snode.name === '()') {
                              snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("functionCalling", snode.args, {
                                 name: funcName,
                                 match: options.getMatchedString(match, operations)
                              });
                           } else if (funcName) {
                              throw new Error('you have inputted a name (identifier) then an invalid block after it.');
                           }
                        });
                        if (snode) return snode; // if literal (variable) or bool {true or false}, ...

                        str = str.replace(options.nameTestReg, function (name) {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]("variable", [], {
                              name: name,
                              match: str
                           });
                        });
                        if (snode) return snode; //#endregion
                        // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements

                        throw new Error("invalid script.\n" + str);
                     }
                  }, {
                     key: "options",
                     get: function get() {
                        return this._options;
                     },
                     set: function set(options) {
                        this._options = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["prepareOptions"])(options);
                     }
                  }]);

                  return CustomMathParser;
               }();



            /***/
}),

/***/ "./src/customParsers/ProgMath.js":
/*!***************************************!*\
  !*** ./src/customParsers/ProgMath.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return ProgMathParser; });
/* harmony import */ var _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tokens/Operators.js */ "./src/tokens/Operators.js");
/* harmony import */ var _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tokens/Block.js */ "./src/tokens/Block.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global.js */ "./src/global.js");
            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






            var ProgMathParser =
               /*#__PURE__*/
               function () {
                  function ProgMathParser(options) {
                     _classCallCheck(this, ProgMathParser);

                     this._options = {
                        autoMultSign: true,
                        vars: [],
                        /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
                        nameTest: '[a-zA-Z_]+\\d*',
                        numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',
                        prefixOperators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["PrefixOperator"]({
                           id: '+'
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["PrefixOperator"]({
                           id: '-'
                        })],
                        suffixOperators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["SuffixOperator"]({
                           id: '!'
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["SuffixOperator"]({
                           id: 'deg'
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["SuffixOperator"]({
                           id: 'rad'
                        })],
                        operators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '^',
                           zIndex: 10
                        }), // the first operator to process
                        new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '*',
                           zIndex: 9
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '/',
                           zIndex: 9
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'mod',
                           zIndex: 9
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '+',
                           zIndex: 7
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '-',
                           zIndex: 7
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '>>',
                           zIndex: 6
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '<<',
                           zIndex: 6
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '>=',
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '<=',
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '!=',
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '<',
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '>',
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '==',
                           zIndex: 5
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '&',
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'band',
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '|',
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'bor',
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'bxor',
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'constrain',
                           zIndex: 4
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'in',
                           zIndex: 3
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'out',
                           zIndex: 3
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'xnor',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'xor',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'nand',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'nor',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'or',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: 'and',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '||',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '&&',
                           zIndex: 1
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Operator"]({
                           id: '=',
                           zIndex: 0
                        }) // the last operator to be applied
                        ],
                        separators: [new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Separator"]({
                           id: ';'
                        }), new _tokens_Operators_js__WEBPACK_IMPORTED_MODULE_0__["Separator"]({
                           id: ','
                        })],
                        blocks: [new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: {
                              opening: '{',
                              closing: '}'
                           }
                        }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
                        new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: {
                              opening: '[',
                              closing: ']'
                           }
                        }), new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: {
                              opening: '(',
                              closing: ')'
                           }
                        }), new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: {
                              opening: '"',
                              closing: '"'
                           }
                        }), new _tokens_Block_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                           id: {
                              opening: "'",
                              closing: "'"
                           }
                        })],
                        forbiddenChars: []
                     };
                     this.options = options;
                  }

                  _createClass(ProgMathParser, [{
                     key: "parse",
                     value: function parse(str) {
                        var operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                        var options = this.options;
                        operations = operations instanceof Map ? operations : new Map(); //#region pre codes

                        for (var i = 0; i < options.forbiddenChars.length; i++) {
                           if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(str, options.forbiddenChars[i])) Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])('forbiddenSymbol', 'forbidden symbol.');
                        } // if empty


                        str = str.replace(/\s+/g, function () {
                           return ' ';
                        }); //#endregion

                        return this.__parse(str, options, operations);
                     }
                  }, {
                     key: "__parse",
                     value: function __parse(str, options, operations) {
                        var subOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
                        var snode;
                        subOptions = _objectSpread({
                           parseBlocks: true,
                           parseOperators: true
                        }, subOptions); /// or use Object.assign
                        //#region parsing
                        // if empty of characters

                        str = str.replace(/^\s*$/, function () {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('');
                        });
                        if (snode) return snode;

                        if (subOptions.parseBlocks) {
                           str = this.__parseBlocks(str, options, operations);
                        }

                        if (subOptions.parseOperators) {
                           str = this.__parseOperators(str, options, operations);
                        } //#endregion
                        //#region the last thing in str,,, number or name or operationName 
                        // if name of operation


                        str = str.replace(/^\s*(.*)\s*$/, '$1'); /// if number

                        if (!isNaN(str)) {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                              value: parseFloat(str)
                           });
                        } // if operation name


                        str = str.replace(options.operationTestReg, function (opName) {
                           snode = operations.get(opName);
                        });
                        if (snode) return snode; // if literal (variable) or bool {true or false}, ...

                        str = str.replace(options.nameTestReg, function (name) {
                           snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                              name: name
                           });
                        });
                        if (snode) return snode; //#endregion
                        // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements

                        throw new Error('invalid script.\n' + str);
                     }
                     /**
                      * this modified version of __parseBlocks is much better and faster,,, we have gotten rid of if statements and varaible and alot of code that are redundant
                      */

                  }, {
                     key: "__parseBlocks",
                     value: function __parseBlocks(str, options, operations) {
                        var _this = this;

                        //#region brackets
                        var blocks = options.blocks;
                        var b;

                        var repBlock = function repBlock(match, content) {
                           var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                           var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('block', [_this.__parse(content, options, operations)], {
                              id: b.id
                           });
                           operations.set(name, sn);
                           return name;
                        };

                        for (var i = 0; i < blocks.values.length; i++) {
                           b = blocks.values[i];
                           str = str.replace(b.regex, repBlock);
                        } //#endregion


                        return str;
                     }
                  }, {
                     key: "__parseOperators",
                     value: function __parseOperators(str, options, operations) {
                        /// RegExp: (var or num or block)(suffix)(op)(prefix)(var or num or block)
                        /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))
                        //#region separators
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                           for (var _iterator = options.separators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var s = _step.value;

                              if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(str, s.id)) {
                                 var name = this.__get;
                                 var args = [];
                                 var strs = str.split(s);
                                 var _iteratorNormalCompletion2 = true;
                                 var _didIteratorError2 = false;
                                 var _iteratorError2 = undefined;

                                 try {
                                    for (var _iterator2 = strs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                       var str_ = _step2.value;
                                       args.push(this.__parse(str_, options, operations));
                                    }
                                 } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                 } finally {
                                    try {
                                       if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                          _iterator2["return"]();
                                       }
                                    } finally {
                                       if (_didIteratorError2) {
                                          throw _iteratorError2;
                                       }
                                    }
                                 }

                                 operations.set(name, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('separator', args, {
                                    name: s.id,
                                    length: args.length
                                 }));
                              }
                           } //#endregion
                           //#region preparing for parsing process

                        } catch (err) {
                           _didIteratorError = true;
                           _iteratorError = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                 _iterator["return"]();
                              }
                           } finally {
                              if (_didIteratorError) {
                                 throw _iteratorError;
                              }
                           }
                        }

                        var _str = '',
                           prevArg = {
                              name: null,
                              sn: null
                           }; //#endregion
                        //#region searching for operators and parsing suffix and prefix
                        /// intial replacement

                        str = str.replace(options.opIntialTestReg, function (match, prefix, arg) {
                           if (prefix) {
                              var a = arg,
                                 b = 'prefixOperator',
                                 c = prefix;

                              if (!isNaN(a)) {
                                 /// number
                                 var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                 var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                                    value: parseInt(a)
                                 }), {
                                    name: c
                                 });
                                 operations.set(name, sn);
                                 prevArg = {
                                    name: name,
                                    sn: sn
                                 };
                              } else {
                                 var found = false;
                                 a.replace(options.operationTestReg, function () {
                                    found = true;
                                 });

                                 if (found) {
                                    /// operations
                                    var _sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, operations.get(a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                       {
                                          name: c
                                       });

                                    operations.set(a, _sn);
                                    prevArg.sn = {
                                       name: a,
                                       sn: _sn
                                    };
                                 } else {
                                    /// varName
                                    var _name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                                    var _sn2 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                                       name: a
                                    }), {
                                       name: c
                                    });

                                    operations.set(_name, _sn2);
                                    prevArg = {
                                       name: _name,
                                       sn: _sn2
                                    };
                                 }
                              }
                           } else {
                              var _found = false;
                              arg.replace(options.operationTestReg, function () {
                                 _found = true;
                              });

                              if (_found) {
                                 prevArg = {
                                    name: arg,
                                    sn: operations.get(arg)
                                 };
                              } else {
                                 prevArg = {
                                    name: arg
                                 };
                              }
                           }

                           return '';
                        });
                        var end = false; // inner search for operators

                        while (!end) {
                           end = true; /// if replacement is not implemented, str will sstill the same and while loop will close

                           str = str.replace(options.opTestReg, function (match, suffix, op, prefix, arg) {
                              if (!op) {
                                 Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])('operators', 'invalid operators', str, null);
                              }

                              if (suffix) {
                                 /// creating an operations with type of  prefix operator,,, its arg is the prev arg
                                 var a = prevArg,
                                    b = 'suffixOperator',
                                    c = suffix;

                                 if (!isNaN(a)) {
                                    /// number
                                    var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                    var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                                       value: parseInt(a)
                                    }), {
                                       name: c
                                    });
                                    operations.set(name, sn);
                                    prevArg = {
                                       name: name,
                                       sn: sn
                                    };
                                 } else {
                                    var found = false;
                                    a.replace(options.operationTestReg, function () {
                                       found = true;
                                    });

                                    if (found) {
                                       /// operations
                                       var _sn3 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                          {
                                             name: c
                                          });

                                       operations.set(a, _sn3);
                                       prevArg.sn = _sn3;
                                    } else {
                                       /// varName
                                       var _name2 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                                       var _sn4 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                                          name: a
                                       }), {
                                          name: c
                                       });

                                       operations.set(_name2, _sn4);
                                       prevArg = {
                                          name: _name2,
                                          sn: _sn4
                                       };
                                    }
                                 }
                              }

                              _str += "".concat(prevArg.name, " ").concat(op, " ");

                              if (prefix) {
                                 var _a = arg,
                                    _b = 'prefixOperator',
                                    _c = prefix;

                                 if (!isNaN(_a)) {
                                    /// number
                                    var _name3 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                                    var _sn5 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                                       value: parseInt(_a)
                                    }), {
                                       name: _c
                                    });

                                    operations.set(_name3, _sn5);
                                    prevArg = {
                                       name: _name3,
                                       sn: _sn5
                                    };
                                 } else {
                                    var _found2 = false;

                                    _a.replace(options.operationTestReg, function () {
                                       _found2 = true;
                                    });

                                    if (_found2) {
                                       /// operations
                                       var _sn6 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](_b, operations.get(_a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                          {
                                             name: _c
                                          });

                                       operations.set(_a, _sn6);
                                       prevArg.sn = {
                                          name: _a,
                                          sn: _sn6
                                       };
                                    } else {
                                       /// varName
                                       var _name4 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                                       var _sn7 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                                          name: _a
                                       }), {
                                          name: _c
                                       });

                                       operations.set(_name4, _sn7);
                                       prevArg = {
                                          name: _name4,
                                          sn: _sn7
                                       };
                                    }
                                 }
                              } else {
                                 var _found3 = false;
                                 arg.replace(options.operationTestReg, function () {
                                    _found3 = true;
                                 });

                                 if (_found3) {
                                    prevArg = {
                                       name: arg,
                                       sn: operations.get(arg)
                                    };
                                 } else {
                                    prevArg = {
                                       name: arg
                                    };
                                 }
                              }

                              end = false;
                              return '';
                           });
                        } // final search


                        if (str !== '') {
                           str = str.replace(options.opFinalTestReg, function (match, suffix) {
                              var a = prevArg.name,
                                 b = 'suffixOperator',
                                 c = suffix;

                              if (!isNaN(a)) {
                                 /// number
                                 var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                 var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                                    value: parseInt(a)
                                 }), {
                                    name: c
                                 });
                                 operations.set(name, sn);
                                 prevArg = {
                                    name: name,
                                    sn: sn
                                 };
                              } else {
                                 var found = false;
                                 a.replace(options.operationTestReg, function () {
                                    found = true;
                                 });

                                 if (found) {
                                    /// operations
                                    var _sn8 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                                       {
                                          name: c
                                       });

                                    operations.set(a, _sn8);
                                    prevArg.sn = {
                                       name: a,
                                       sn: _sn8
                                    };
                                 } else {
                                    /// varName
                                    var _name5 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                                    var _sn9 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                                       name: a
                                    }), {
                                       name: c
                                    });

                                    operations.set(_name5, _sn9);
                                    prevArg = {
                                       name: _name5,
                                       sn: _sn9
                                    };
                                 }
                              }

                              _str += prevArg.name;
                              return '';
                           });
                           if (str !== '') Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])('operators', 'invalid suffix operator at the end', '', null);
                        } else {
                           _str += prevArg.name;
                        } //#endregion
                        //#region parsing operators


                        for (var i = 0; i < options.operators.length; i++) {
                           end = false;

                           while (!end) {
                              end = true;

                              if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(_str, options.operators[i].id)) {
                                 _str = _str.replace(new RegExp("(".concat(options.argTest, ")\\s*(").concat(options.operators[i].regexStr, ")\\s*(").concat(options.argTest, ")")), function (match, g1, op, g2) {
                                    //#region argument for the operator
                                    var arg1, arg2;

                                    if (!isNaN(g1)) {
                                       /// number
                                       arg1 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                                          value: parseInt(g1)
                                       });
                                    } else {
                                       var found = false;
                                       g1.replace(options.operationTestReg, function () {
                                          // operation
                                          arg1 = operations.get(g1);
                                          found = true;
                                       });

                                       if (!found) {
                                          /// varName
                                          arg1 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                                             name: g1
                                          });
                                       }
                                    }

                                    if (!isNaN(g2)) {
                                       /// number
                                       arg2 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                                          value: parseInt(g2)
                                       });
                                    } else {
                                       var _found4 = false;
                                       g2.replace(options.operationTestReg, function () {
                                          // operation
                                          arg2 = operations.get(g2);
                                          _found4 = true;
                                       });

                                       if (!_found4) {
                                          /// varName
                                          arg2 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                                             name: g2
                                          });
                                       }
                                    } //#endregion


                                    var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
                                    operations.set(name, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('operator', [arg1, arg2], {
                                       name: op
                                    }));
                                    end = false;
                                    return name;
                                 });
                              } /// if the operator is not found,,, end the while loop.

                           }
                        } //#endregion


                        return _str;
                     }
                  }, {
                     key: "options",
                     get: function get() {
                        return this._options;
                     },
                     set: function set(options) {
                        options = Object.assign(this._options, options);
                        Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["prepareOptions"])(options);
                     }
                  }]);

                  return ProgMathParser;
               }();



            /***/
}),

/***/ "./src/customParsers/index.js":
/*!************************************!*\
  !*** ./src/customParsers/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math.js */ "./src/customParsers/Math.js");
/* harmony import */ var _ProgMath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProgMath.js */ "./src/customParsers/ProgMath.js");


/* harmony default export */ __webpack_exports__["default"] = ({
               Math: _Math_js__WEBPACK_IMPORTED_MODULE_0__["default"],
               ProgMath: _ProgMath_js__WEBPACK_IMPORTED_MODULE_1__["default"]
            });

            /***/
}),

/***/ "./src/errors.js":
/*!***********************!*\
  !*** ./src/errors.js ***!
  \***********************/
/*! exports provided: forbiddenSymbolsError, operatorsError, blocksError */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forbiddenSymbolsError", function () { return forbiddenSymbolsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorsError", function () { return operatorsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blocksError", function () { return blocksError; });
            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

            function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

            function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

            function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            var forbiddenSymbolsError =
               /*#__PURE__*/
               function (_Error) {
                  _inherits(forbiddenSymbolsError, _Error);

                  function forbiddenSymbolsError(msg, pos) {
                     var _this;

                     _classCallCheck(this, forbiddenSymbolsError);

                     _this = _possibleConstructorReturn(this, _getPrototypeOf(forbiddenSymbolsError).call(this, msg));
                     _this.position = pos;
                     _this.messsege = msg;
                     return _this;
                  }

                  return forbiddenSymbolsError;
               }(_wrapNativeSuper(Error));
            var operatorsError =
               /*#__PURE__*/
               function (_Error2) {
                  _inherits(operatorsError, _Error2);

                  function operatorsError(msg, pos) {
                     var _this2;

                     _classCallCheck(this, operatorsError);

                     _this2 = _possibleConstructorReturn(this, _getPrototypeOf(operatorsError).call(this, msg));
                     _this2.position = pos;
                     _this2.messsege = msg;
                     return _this2;
                  }

                  return operatorsError;
               }(_wrapNativeSuper(Error));
            var blocksError =
               /*#__PURE__*/
               function (_Error3) {
                  _inherits(blocksError, _Error3);

                  function blocksError(msg, pos) {
                     var _this3;

                     _classCallCheck(this, blocksError);

                     _this3 = _possibleConstructorReturn(this, _getPrototypeOf(blocksError).call(this, msg));
                     _this3.position = pos;
                     _this3.messsege = msg;
                     return _this3;
                  }

                  return blocksError;
               }(_wrapNativeSuper(Error));

            /***/
}),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! exports provided: regSpecialChars, strTOreg, getGroupsNumInReg, specialRegex, checker, sendError, prepareOptions, contains, getRandomName, operationBlockChar, specialChars */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regSpecialChars", function () { return regSpecialChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strTOreg", function () { return strTOreg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroupsNumInReg", function () { return getGroupsNumInReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialRegex", function () { return specialRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checker", function () { return checker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendError", function () { return sendError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prepareOptions", function () { return prepareOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function () { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomName", function () { return getRandomName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operationBlockChar", function () { return operationBlockChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialChars", function () { return specialChars; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./src/errors.js");
            function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

            function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

            function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

            function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


            function regSpecialChars(str) {
               return str.replace(/[+*/.$^(){|}[\]]/g, function (match) {
                  return "\\" + match;
               });
            }
            function strTOreg(str) {
               return new RegExp(regSpecialChars(str));
            }
            function getGroupsNumInReg(reg) {
               var groupsNum = 0; /// reg .source == reg.toString().slice(1, ((reg) => { let num = reg.length - 1; while (reg[num] !== '/') num--; return num; })(reg.toString()))

               var regStr = reg instanceof RegExp ? reg.source : reg;
               if (regStr == "") return 0;
               regStr = regStr.replace(/\\./g, "") // .replace(/\\\(|\\\)/, '')
                  .replace(/^([^(])+/, "");
               if (regStr == "") return 0; /// regStr[0] === '(' should be (
               //#region get content of the group
               //#endregion

               if (regStr.indexOf("(") > -1) {
                  var num = 1;

                  for (var i = 1; i < regStr.length; i++) {
                     if (regStr[i] == ")") {
                        num--;
                     } else if (regStr[i] == "(") {
                        num++;
                     }

                     if (num == 0) {
                        // the group is closed
                        var content = regStr.slice(1, i);
                        if (regStr.slice(1, 3) !== "?:") groupsNum++;
                        groupsNum += getGroupsNumInReg(content);
                        regStr = regStr.slice(i + 1);
                        groupsNum += getGroupsNumInReg(regStr);
                        break;
                     }
                  }
               }

               return groupsNum || 0;
            }
            var specialRegex = {
               regSpecialChars: /[+*/.$^(){}[\]]/,
               num: /(-?\d+\.?\d*)|(-?\d*\.?\d+)/,
               id: /[a-zA-Z_]+\d*/ // var: // var is removed as you should care about other letters in other langs that I don't know how to check for using regex

            };
            var checker = {
               symbols: '!"\'#$%&()*+,-./:;<=>?@[\\]^_`{|}~€‚„…†‡ˆ‰‹‘’“”•–—˜™›¡¢£¤¥¦§¨©«¬®¯°±²³´¶·¸¹º»¼½¾¿×÷',
               isSymbol: function isSymbol(c) {
                  return /(?:[$+<->^`|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BFF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD6C\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED5\uDEE0-\uDEEC\uDEF0-\uDEFA\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD00-\uDD0B\uDD0D-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])/.test(c);
               },
               isEmoji: function isEmoji(c) {
                  return /(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])/.test(c);
               },
               isWhiteSpace: function isWhiteSpace(c) {
                  return /[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/.test(c);
               },
               isNum: function isNum(c) {
                  return !isNaN(c);
               },
               isAlpha: function isAlpha(c) {
                  return !isNaN(c) && !checker.isSymbol(c);
               },
               spaced: function spaced(c) {
                  return !checker.isSymbol(c);
               },
               isVarName: function isVarName(str) {
                  var _this = this;

                  var isvarname = true;
                  str.replace(/^\s*(.*)\d*\s*$/, function (Math, g1) {
                     var _iteratorNormalCompletion = true;
                     var _didIteratorError = false;
                     var _iteratorError = undefined;

                     try {
                        for (var _iterator = g1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                           var c = _step.value;
                           isvarname = _this.isAlpha(c) || c === "_";
                           if (!isvarname) continue;
                        }
                     } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                     } finally {
                        try {
                           if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                              _iterator["return"]();
                           }
                        } finally {
                           if (_didIteratorError) {
                              throw _iteratorError;
                           }
                        }
                     }
                  });
               },
               check: function check(str, test) {
                  switch (test) {
                     case "name":
                        return this.isVarName(str);

                     case "num":
                        return !isNaN(str);

                     case "all":
                        return true;

                     default:
                        if (test instanceof RegExp) {
                           return test.test(str);
                        } else {
                           console.log("checking test \"".concat(test, "\" is not supported."));
                           return true;
                        }

                  }
               }
            };
            function sendError(type, msg) {
               var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
               var pos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
               // (new Array(pos)).fill('_')     is the same as     '_'.repeat(pos)
               str = str || "";
               str = str === "" ? "" : "\n" + str + "\n";

               if (!isNaN(pos)) {
                  pos = new Array(pos).fill("_").join("") + "^";
               } else if (pos) {
                  // here the text in parsing process is multi line.
                  pos = "position: ".concat(pos);
               } else {
                  // pos is a falsy value
                  pos = "";
               }

               msg = msg + str + pos;

               switch (type) {
                  case "forbiddenChars":
                     throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["forbiddenSymbolsError"](msg);

                  case "operators":
                     throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["operatorsError"](msg);

                  case "blocks":
                     throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["blocksError"](msg);

                  default:
                     throw new Error(msg);
               }
            }
            function prepareOptions(options) {
               var defaultOptions = {
                  nameTest: '[_a-zA-Z]+\\d*',
                  numTest: '\\d*\\.?\\d+|\\d+\\.?\\d*',
                  rules: [],
                  operators: [],
                  suffixOperators: [],
                  prefixOperators: [],
                  separators: [],
                  forbiddenChars: []
               };
               options = _objectSpread({}, defaultOptions, {}, options);
               options.forbiddenChars = [].concat(_toConsumableArray(options.forbiddenChars), specialChars); //#region all
               //#region string

               var all = {
                  operators: "",
                  prefixOperators: "",
                  suffixOperators: ""
               };

               var processArr = function processArr(arr) {
                  if (arr && arr.length > 0) {
                     var _all = " ";

                     var _loop = function _loop(i) {
                        var op = arr[i];
                        var repeated = false;

                        _all.replace(new RegExp("\\(@(".concat(op.regexStr, ")#(\\d*)\\)")), function (match, opName, opIndex) {
                           Object.assign(arr[i], arr[parseInt(opIndex)]); // merging the repeated operators

                           arr.splice(parseInt(opIndex), 1); // removing the previous operator wiht the same name

                           repeated = true;
                           return " (@".concat(op.toString(), ",#").concat(i, ") ");
                        });

                        if (!repeated) _all += "(@".concat(op.regexStr, "#").concat(i, ")");
                     };

                     for (var i = 0; i < arr.length; i++) {
                        _loop(i);
                     }

                     return _all;
                  }
               };

               all.operators = processArr(options.operators);
               all.prefixOperators = processArr(options.prefixOperators);
               all.suffixOperators = processArr(options.suffixOperators);
               options.all = all; //#endregion
               //#region regex

               all = {
                  operators: "",
                  prefixOperators: "",
                  suffixOperators: ""
               };

               processArr = function processArr(arr) {
                  if (arr.length == 0) return "";

                  if (arr && arr.length > 0) {
                     var _all = "";

                     for (var i = 0; i < arr.length; i++) {
                        var op = arr[i]; // let repeated = false; /// it is done in string

                        _all += "".concat(op.regexStr, "|");
                     }

                     return _all.slice(0, -1);
                  }
               };

               all.operators = processArr(options.operators);
               all.prefixOperators = processArr(options.prefixOperators);
               all.suffixOperators = processArr(options.suffixOperators);
               options.allRegex = all; //#endregion
               //#endregion
               //#region final steps
               // sort the array to be inversely according to zIndex property.

               if (options.operators) options.operators = options.operators.sort(function (a, b) {
                  return -(a.zIndex - b.zIndex); // the negative sign is for reverse the array;
               });
               options.blocks = {
                  values: options.blocks,
                  openedBlock: null
               }; //#endregion
               //#region regex for search

               options.rulesRegex = [];
               options.rules.forEach(function (rule) {
                  options.rulesRegex.push(new RegExp(rule.getRegex()));
               });
               options.nameTestReg = new RegExp(options.nameTest);
               options.numTestReg = new RegExp(options.numTest);
               options.operationTestGrouped = "(?:(".concat(options.nameTest, ")\\s*)?(") + operationBlockChar + options.nameTest + operationBlockChar + ')';
               options.operationTestGroupedReg = new RegExp("^\\s*".concat(options.operationTestGrouped, "\\s*$"));
               options.operationTest = "(?:".concat(options.nameTest, "\\s*)?") + operationBlockChar + options.nameTest + operationBlockChar;
               options.operationTestReg = new RegExp("^\\s*".concat(options.operationTest, "\\s*$"));
               options.matchedTest = operationBlockChar + options.nameTest + operationBlockChar;
               options.matchedTestReg = new RegExp(options.matchedTest, 'g');
               options.argTest = "".concat(options.nameTest, "(?:\\s*").concat(operationBlockChar + options.nameTest + operationBlockChar, ")?|").concat(options.numTest, "|").concat(options.operationTest);
               options.argTestReg = new RegExp("^\\s*(".concat(options.argTest, ")\\s*$"));
               options.opTestReg = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")?\\s*(").concat(options.allRegex.operators, ")\\s*(").concat(options.allRegex.prefixOperators, ")?\\s*(").concat(options.argTest, ")\\s*"));
               options.opIntialTestReg = new RegExp("^\\s*(".concat(options.allRegex.prefixOperators, ")?\\s*(").concat(options.argTest, ")"));
               options.opFinalTestReg = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")\\s*$"));

               options.getMatchedString = function (str, operations) {
                  return str.replace(options.matchedTestReg, function (name) {
                     return operations.get(name).match;
                  });
               }; //#endregion


               return options;
            }
            function contains(str, containedStr) {
               return str.indexOf(containedStr) > -1;
            }
            function getRandomName() {
               var num = 0; /// randomNameNum is here to avoid getting the same random name if the code is implemented so fast

               return getRandomName.operationBlockChar + (Date.now() + getRandomName.randomNameNum++).toString(36).replace(new RegExp(num++, "g"), "a") /// I am using Regex for global replacement.
                  .replace(new RegExp(num++, "g"), "b").replace(new RegExp(num++, "g"), "c").replace(new RegExp(num++, "g"), "d").replace(new RegExp(num++, "g"), "e").replace(new RegExp(num++, "g"), "f").replace(new RegExp(num++, "g"), "g").replace(new RegExp(num++, "g"), "h").replace(new RegExp(num++, "g"), "i").replace(new RegExp(num++, "g"), "j") + getRandomName.operationBlockChar;
            }
            getRandomName.randomNameNum = 0;
            getRandomName.operationBlockChar = "¶";
            var operationBlockChar = "¶";
            var specialChars = [operationBlockChar];

            /***/
}),

/***/ "./src/rules/AnyOf.js":
/*!****************************!*\
  !*** ./src/rules/AnyOf.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return AnyOf; });
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rule.js */ "./src/rules/Rule.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




            var AnyOf =
               /*#__PURE__*/
               function (_Rule) {
                  _inherits(AnyOf, _Rule);

                  function AnyOf(childrenRules, properties) {
                     _classCallCheck(this, AnyOf);

                     if (childrenRules.length == 0) throw new Error('Sequence musn\t be void.');
                     return _possibleConstructorReturn(this, _getPrototypeOf(AnyOf).call(this, 'AnyOf', -1, childrenRules, properties));
                  }

                  _createClass(AnyOf, [{
                     key: "getRegex",
                     value: function getRegex(groubIndex) {
                        groubIndex = groubIndex || {
                           num: 0,
                           increase: function increase() {
                              var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                              this.num += step;
                              return this;
                           }
                        };
                        this.index = groubIndex.num; //#region getting regex

                        var regex = '';
                        this.childrenRules.forEach(function (child) {
                           regex += child.getRegex(groubIndex.increase()) + '|';
                        }); //#endregion

                        return "(".concat(regex, ")");
                     }
                  }, {
                     key: "parse",
                     value: function parse(groups, useValue) {
                        var _this = this;

                        var value = useValue || groups[this.index + 1];
                        var args = [];

                        if (this.blockState) {
                           value = value.replace(this.rootParser.matchesTest, function (match, id, index) {
                              return _this.rootParser.matches[id][index].str;
                           });
                        } //#region getting args


                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                           for (var _iterator = this.childrenRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var child = _step.value;

                              if (groups.values[child.index]) {
                                 // this is the child being found
                                 args.push(child.parse(groups));
                                 break;
                              }
                           } //#endregion

                        } catch (err) {
                           _didIteratorError = true;
                           _iteratorError = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                 _iterator["return"]();
                              }
                           } finally {
                              if (_didIteratorError) {
                                 throw _iteratorError;
                              }
                           }
                        }

                        return new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.name, args, {
                           match: value
                        });
                     }
                  }]);

                  return AnyOf;
               }(_Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



            /***/
}),

/***/ "./src/rules/AnyThing.js":
/*!*******************************!*\
  !*** ./src/rules/AnyThing.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return AnyThing; });
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rule.js */ "./src/rules/Rule.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




            var AnyThing =
               /*#__PURE__*/
               function (_Rule) {
                  _inherits(AnyThing, _Rule);

                  function AnyThing(properties) {
                     _classCallCheck(this, AnyThing);

                     return _possibleConstructorReturn(this, _getPrototypeOf(AnyThing).call(this, 'Anything', 0, [], properties));
                  }

                  _createClass(AnyThing, [{
                     key: "getRegex",
                     value: function getRegex() {
                        var groubIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                        groubIndex = groubIndex || {
                           num: 0,
                           increase: function increase() {
                              var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                              this.num += step;
                              return this;
                           }
                        };
                        this.index = groubIndex.num;
                        return "(.*?)";
                     }
                  }, {
                     key: "parse",
                     value: function parse(groups, useValue) {
                        var _this = this;

                        var value = useValue || groups[this.index + 1];
                        var args = [];

                        if (this.blockState) {
                           value = value.replace(this.rootParser.matchesTest, function (match, id, index) {
                              return _this.rootParser.matches[id][index].str;
                           });
                        } //#region getting args


                        if (this.parser) {
                           args.push(this.parser.parse(value));
                        } //#endregion


                        return new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.name, args, {
                           match: value
                        });
                     }
                  }]);

                  return AnyThing;
               }(_Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



            /***/
}),

/***/ "./src/rules/Block.js":
/*!****************************!*\
  !*** ./src/rules/Block.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Block; });
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rule.js */ "./src/rules/Rule.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.js */ "./src/global.js");
/* harmony import */ var _Parser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Parser.js */ "./src/Parser.js");
            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






            var Block =
               /*#__PURE__*/
               function (_Rule) {
                  _inherits(Block, _Rule);

                  /**
                   * 
                   * @param {Object} properties 
                   * you should set 
                   * opening as regex or string, closing as RegExp or string,
                   * [optional] content: Rule or regex or string,
                   * [optional] parser: to be used for parsing the content
                   */
                  function Block(properties) {
                     var _this;

                     _classCallCheck(this, Block);

                     properties.opening = properties.opening instanceof RegExp ? properties.opening.source : Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["regSpecialChars"])(properties.opening);
                     properties.closing = properties.closing instanceof RegExp ? properties.closing.source : Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["regSpecialChars"])(properties.closing);

                     if (properties.opening && properties.closing) {
                        if (properties.opening !== properties.closing) {
                           /** this Block can't be represented by regex */
                           properties.blockState = true;
                        }

                        properties.content = properties.content || 'all';
                        properties.groupsNumInside = 0; /// if the content is regex, we should take care of the groups inside

                        if (!(properties.content instanceof _Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
                           if (properties.content instanceof RegExp) {
                              // converting regex into string
                              properties.content = properties.content.source;
                           } else {
                              /// evaluating special values such as "all".
                              properties.content = properties.content === 'all' ? '(?:.*?|\\s)*?' : Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["regSpecialChars"])(properties.content);
                           }

                           properties.groupsNumInside += Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getGroupsNumInReg"])(properties.content);
                        } // properties.test = `${properties.opening}${properties.content}${properties.closing}`;

                     } else {
                        throw new Error('Error on defining your block, you should define the opening and closing properties as the regex or the text');
                     }

                     _this = _possibleConstructorReturn(this, _getPrototypeOf(Block).call(this, 'Block', 0, [], properties));
                     _this.openingReg = new RegExp(_this.opening);
                     _this.closingReg = new RegExp(_this.closing);
                     return _this;
                  }

                  _createClass(Block, [{
                     key: "getRegex",
                     value: function getRegex(groubIndex, ignoreBlockState) {
                        if (this.blockState && !ignoreBlockState) {
                           this._blockStateToParents();

                           this.id = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();
                           groubIndex = groubIndex || {
                              num: 0,
                              increase: function increase() {
                                 var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                                 this.num += step;
                                 return this;
                              }
                           };
                           this.realRegex = new RegExp(this.getRegex(null, true));
                           this.index = groubIndex.num;

                           if (this.content instanceof _Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                              this.parser = new _Parser_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.childrenRules[0]);
                           } // rootParser is an instance of "Parser" class, it is defined in the constructor of "Parser" class


                           this.rootParser.blocksRules.push(this);
                           this.rootParser.blockState = true;
                           this.matchIdRegex = new RegExp("".concat(this.id).concat(_global_js__WEBPACK_IMPORTED_MODULE_2__["operationBlockChar"], "\\d+").concat(_global_js__WEBPACK_IMPORTED_MODULE_2__["operationBlockChar"])); // the represetig string in the total string

                           return "(".concat(this.matchIdRegex.source, ")");
                        } else {
                           groubIndex = groubIndex || {
                              num: 0,
                              increase: function increase() {
                                 var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                                 this.num += step;
                                 return this;
                              }
                           };
                           this.index = groubIndex.num;
                           var content;

                           if (this.content instanceof _Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                              content = this.content.getRegex(groubIndex.increase());
                           } else {
                              groubIndex.increase(this.groupsNumInside + 1);
                              content = '(' + this.content + ')';
                           }

                           var regex = "".concat(this.opening).concat(content).concat(this.closing);
                           this.regex = regex;
                           return "(".concat(regex, ")");
                        }
                     }
                  }, {
                     key: "_blockStateToParents",
                     value: function _blockStateToParents() {
                        var parent = this.parentRule;

                        while (parent) {
                           parent.blockState = true;
                           parent = parent.parentRule;
                        }
                     }
                  }, {
                     key: "getMatchId",
                     value: function getMatchId(index) {
                        return this.id + _global_js__WEBPACK_IMPORTED_MODULE_2__["operationBlockChar"] + index + _global_js__WEBPACK_IMPORTED_MODULE_2__["operationBlockChar"];
                     }
                  }, {
                     key: "parse",
                     value: function parse(groups, useValue) {
                        if (this.blockState) {
                           var value = useValue || groups[this.index + 1];
                           var args = [];
                           var index = value.split(_global_js__WEBPACK_IMPORTED_MODULE_2__["operationBlockChar"])[3];
                           value = this.rootParser.matches[this.id][index]; // is defined at the rootParser in the paring process
                           //#region getting args

                           if (this.parser) {
                              args = this.parser.parse(value.content);
                           } //#endregion


                           return new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.name, args, {
                              match: value.str,
                              content: value.content /// the current group in the array is in the index : this.index + 1

                           });
                        } else {
                           var _value = useValue || groups[this.index + 1];

                           var _args = []; //#region getting args

                           if (this.content instanceof _Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                              _args = this.content.parse(groups);
                           } else if (this.parser) {
                              _args = this.parser.parse(_value);
                           } //#endregion


                           return new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.name, _args, {
                              match: _value,
                              content: groups[this.index + 2] /// the current group in the array is in the index : this.index + 1

                           });
                        }
                     }
                  }]);

                  return Block;
               }(_Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



            /***/
}),

/***/ "./src/rules/Repeat.js":
/*!*****************************!*\
  !*** ./src/rules/Repeat.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Repeat; });
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rule.js */ "./src/rules/Rule.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




            var Repeat =
               /*#__PURE__*/
               function (_Rule) {
                  _inherits(Repeat, _Rule);

                  function Repeat(childRule, properties) {
                     _classCallCheck(this, Repeat);

                     properties = _objectSpread({
                        spaced: true
                     }, properties);
                     return _possibleConstructorReturn(this, _getPrototypeOf(Repeat).call(this, 'Repeat', 1, [childRule], properties));
                  }

                  _createClass(Repeat, [{
                     key: "getRegex",
                     value: function getRegex(groubIndex) {
                        groubIndex = groubIndex || {
                           num: 0,
                           increase: function increase() {
                              var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                              this.num += step;
                              return this;
                           }
                        };
                        this.index = groubIndex.num;
                        var timesTOrepeat = !isNaN(this.length) ? "{".concat(this.length, "}") : "+";
                        var content = this.childrenRules[0].getRegex(groubIndex.increase());
                        this.repeatedRegex = new RegExp(content, 'g');
                        var regex;

                        if (this.spaced) {
                           regex = "(?:".concat(content, "\\s*)").concat(timesTOrepeat);
                        } else {
                           regex = "".concat(content).concat(timesTOrepeat);
                        }

                        this.regex = regex;
                        return "(".concat(regex, ")");
                     }
                  }, {
                     key: "parse",
                     value: function parse(groups, useValue) {
                        var _this = this;

                        var value = useValue || groups[this.index + 1];
                        var args = []; //#region getting args

                        value.replace(this.repeatedRegex, function (match) {
                           args.push(_this.childrenRules[0].parse(groups, match));
                           return '';
                        }); //#endregion

                        if (this.blockState) {
                           value = value.replace(this.rootParser.matchesTest, function (match, id, index) {
                              return _this.rootParser.matches[id][index].str;
                           });
                        }

                        return new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.name, args, {
                           match: value
                        });
                     }
                  }]);

                  return Repeat;
               }(_Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



            /***/
}),

/***/ "./src/rules/Rule.js":
/*!***************************!*\
  !*** ./src/rules/Rule.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Rule; });
/* harmony import */ var _Block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block.js */ "./src/rules/Block.js");
            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



            var Rule =
               /*#__PURE__*/
               function () {
                  function Rule(ruleDefualtName, childrenNum, childrenRules) {
                     var properties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                     _classCallCheck(this, Rule);

                     properties.name = properties.name || ruleDefualtName; // if (!properties.parser) throw new Error('Magical Parser Rule "' + properties.name + '" Must Contian Parser');

                     Object.assign(this, Object.assign(properties, this)); /// setting properities with no ovrriding

                     this.childrenNum = childrenNum;
                     if (childrenRules.length !== childrenNum && childrenNum > -1) throw Error('rules num in ' + (this.name + ' ' || false) + 'must be ' + this.rulesNum);
                     var _iteratorNormalCompletion = true;
                     var _didIteratorError = false;
                     var _iteratorError = undefined;

                     try {
                        for (var _iterator = childrenRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                           var _rule = _step.value;
                           _rule.parentRule = this;
                        }
                     } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                     } finally {
                        try {
                           if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                              _iterator["return"]();
                           }
                        } finally {
                           if (_didIteratorError) {
                              throw _iteratorError;
                           }
                        }
                     }

                     this.childrenRules = childrenRules;
                     /**
                      * 
                      * there is something called rootPaser, this value wil be set inside the constructor of Parser class.
                      * 
                      * 
                      * 
                      */
                  }

                  _createClass(Rule, [{
                     key: "getRegex",
                     value: function getRegex(groubIndex) {
                        return '';
                     }
                  }, {
                     key: "parse",
                     value: function parse(groups, useValue) {
                        /**
                        * "useValue" is here to be used in the Repeat rule while parsing
                        */
                        throw new Error("You mustn't call this function directly from the abstract class Rule.");
                     }
                  }, {
                     key: "getBlocksInside",
                     value: function getBlocksInside() {
                        if (this instanceof _Block_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                           return [rule];
                        }

                        var blocks = [];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                           for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                              var child = _step2.value;
                              blocks.concat(child.getBlocksInside());
                           }
                        } catch (err) {
                           _didIteratorError2 = true;
                           _iteratorError2 = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                 _iterator2["return"]();
                              }
                           } finally {
                              if (_didIteratorError2) {
                                 throw _iteratorError2;
                              }
                           }
                        }

                        return blocks;
                     }
                  }]);

                  return Rule;
               }();



            /***/
}),

/***/ "./src/rules/Sequence.js":
/*!*******************************!*\
  !*** ./src/rules/Sequence.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Sequence; });
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rule.js */ "./src/rules/Rule.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




            var Sequence =
               /*#__PURE__*/
               function (_Rule) {
                  _inherits(Sequence, _Rule);

                  function Sequence(childrenRules, properties) {
                     _classCallCheck(this, Sequence);

                     properties = _objectSpread({
                        spaced: true
                     }, properties);
                     if (childrenRules.length == 0) throw new Error('Sequence musn\t be void.');
                     return _possibleConstructorReturn(this, _getPrototypeOf(Sequence).call(this, 'Sequence', -1, childrenRules, properties));
                  }

                  _createClass(Sequence, [{
                     key: "getRegex",
                     value: function getRegex(groubIndex) {
                        var _this = this;

                        groubIndex = groubIndex || {
                           num: 0,
                           increase: function increase() {
                              var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                              this.num += step;
                              return this;
                           }
                        };
                        this.index = groubIndex.num; //#region getting regex

                        var regex = '';
                        this.childrenRules.forEach(function (child) {
                           regex += child.getRegex(groubIndex.increase());

                           if (_this.spaced) {
                              regex += "\\s*";
                           }
                        });

                        if (this.spaced) {
                           regex = regex.slice(0, -'\\s*'.length); /// remove the last \s* in the string
                        } //#endregion


                        this.regex = regex;
                        return "(".concat(regex, ")");
                     }
                  }, {
                     key: "parse",
                     value: function parse(groups, useValue) {
                        var _this2 = this;

                        var value = useValue || groups[this.index + 1];
                        var args = []; //#region getting args

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                           for (var _iterator = this.childrenRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var child = _step.value;
                              args.push(child.parse(groups));
                           } //#endregion

                        } catch (err) {
                           _didIteratorError = true;
                           _iteratorError = err;
                        } finally {
                           try {
                              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                 _iterator["return"]();
                              }
                           } finally {
                              if (_didIteratorError) {
                                 throw _iteratorError;
                              }
                           }
                        }

                        if (this.blockState) {
                           value = value.replace(this.rootParser.matchesTest, function (match, id, index) {
                              return _this2.rootParser.matches[id][index].str;
                           });
                        }

                        return new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.name, args, {
                           match: value
                        });
                     }
                  }]);

                  return Sequence;
               }(_Rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



            /***/
}),

/***/ "./src/rules/index.js":
/*!****************************!*\
  !*** ./src/rules/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnyOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnyOf.js */ "./src/rules/AnyOf.js");
/* harmony import */ var _AnyThing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnyThing.js */ "./src/rules/AnyThing.js");
/* harmony import */ var _Block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Block.js */ "./src/rules/Block.js");
/* harmony import */ var _Repeat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Repeat.js */ "./src/rules/Repeat.js");
/* harmony import */ var _Sequence_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sequence.js */ "./src/rules/Sequence.js");
/* harmony import */ var _Rule_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Rule.js */ "./src/rules/Rule.js");






/* harmony default export */ __webpack_exports__["default"] = ({
               AnyOf: _AnyOf_js__WEBPACK_IMPORTED_MODULE_0__["default"],
               AnyThing: _AnyThing_js__WEBPACK_IMPORTED_MODULE_1__["default"],
               Block: _Block_js__WEBPACK_IMPORTED_MODULE_2__["default"],
               Repeat: _Repeat_js__WEBPACK_IMPORTED_MODULE_3__["default"],
               Sequence: _Sequence_js__WEBPACK_IMPORTED_MODULE_4__["default"],
               Rule: _Rule_js__WEBPACK_IMPORTED_MODULE_5__["default"]
            });

            /***/
}),

/***/ "./src/tokens/Block.js":
/*!*****************************!*\
  !*** ./src/tokens/Block.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return Block; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global.js */ "./src/global.js");
            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            // for exmaple brackets and quotations
            //{ opening: '{', closing: '}', num: 0, opened: false }


            var Block =
               /*#__PURE__*/
               function () {
                  function Block() {
                     var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                     _classCallCheck(this, Block);

                     options = _objectSpread({
                        parser: 'inherit'
                     }, options);
                     Object.assign(this, options);
                     if (!this.opening || !this.closing) throw new Error('you must set the opening and the closing of the block'); // these properties are deprecated and algorithms was enhanced :._.:

                     this.opened = false;
                     this.num = 0;
                  }

                  _createClass(Block, [{
                     key: "id",
                     get: function get() {
                        return this._id;
                     },
                     set: function set(val) {
                        if (val instanceof RegExp) {
                           this._id = val;
                           this.regex = val;
                           this.regexStr = val.source;
                        } else if (val instanceof Object) {
                           this._id = val;
                           this.opening = this.id.opening;
                           this.closing = this.id.closing;

                           if (val.opening && val.closing) {
                              val.content = val.content || 'all';

                              if (val.content instanceof RegExp) {
                                 val.content = val.content.source;
                              } else if (val.content === 'all') {
                                 val.content = '(?:.*?|\\s*)*?';
                              } else {
                                 val.content = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.content);
                              }

                              this.regexStr = "".concat(Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.opening), "(").concat(val.content, ")").concat(Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.closing));
                              this.regex = new RegExp(this.regexStr);
                           }
                        } else {
                           this._id = val;
                           this.regex = new RegExp(Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val));
                           this.regexStr = this.regex.source;
                        } // settingthe regex to be global


                        if (!this.regex.global) this.regex = new RegExp(this.regex.source, this.regex.flags + 'g');
                     }
                  }, {
                     key: "name",
                     get: function get() {
                        if (!this._name) return this.opening + this.closing; else return this._name;
                     },
                     set: function set(name) {
                        this._name = name;
                     }
                  }, {
                     key: "content",
                     get: function get() {
                        return this._contentTest || 'all';
                     },
                     set: function set(val) {
                        this._contentTest = val;
                     }
                  }]);

                  return Block;
               }();



            /***/
}),

/***/ "./src/tokens/Operators.js":
/*!*********************************!*\
  !*** ./src/tokens/Operators.js ***!
  \*********************************/
/*! exports provided: commonOperator, Operator, SuffixOperator, PrefixOperator, Separator */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonOperator", function () { return commonOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Operator", function () { return Operator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuffixOperator", function () { return SuffixOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrefixOperator", function () { return PrefixOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Separator", function () { return Separator; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global.js */ "./src/global.js");
            function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

            function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

            function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

            function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

            function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


            var commonOperator =
               /*#__PURE__*/
               function () {
                  /**
                   * 
                   * @param {Object} options id as regex or string, zIndex for priority 
                   */
                  function commonOperator(options) {
                     _classCallCheck(this, commonOperator);

                     options = options || {};
                     options = _objectSpread({
                        zIndex: 0
                     }, options); // overriding default options by the passed options (options argument)

                     Object.assign(this, options);
                  }

                  _createClass(commonOperator, [{
                     key: "toString",
                     value: function toString() {
                        return this.regexStr;
                     }
                  }, {
                     key: "name",
                     get: function get() {
                        return this._name || this._id;
                     },
                     set: function set(name) {
                        this._name = name;
                     }
                  }, {
                     key: "id",
                     get: function get() {
                        return this._id;
                     },
                     set: function set(val) {
                        if (!val || val === '') throw new Error('operator id can not be void or empty');
                        this._id = val; // preparing regex for parsing process

                        if (val instanceof RegExp) {
                           this.regexStr = val.toString().slice(1, -1); // replacing special chars         
                        } else {
                           this.regexStr = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.toString()); // replacing special chars         
                        }

                        this.regex = new RegExp(this.regexStr); // spaced property

                        this.spaced = {
                           right: _global_js__WEBPACK_IMPORTED_MODULE_0__["checker"].spaced(val[val.toString().length - 1]),
                           left: _global_js__WEBPACK_IMPORTED_MODULE_0__["checker"].spaced(val[0])
                        };
                     }
                  }, {
                     key: "spaced",
                     get: function get() {
                        return this._spaced;
                     },
                     set: function set(val) {
                        this._spaced = _typeof(val) === 'object' ? Object.assign({}, val) : {
                           right: val,
                           left: val
                        };
                     }
                  }]);

                  return commonOperator;
               }();
            var Operator =
               /*#__PURE__*/
               function (_commonOperator) {
                  _inherits(Operator, _commonOperator);

                  function Operator(options) {
                     _classCallCheck(this, Operator);

                     return _possibleConstructorReturn(this, _getPrototypeOf(Operator).call(this, options));
                  }

                  return Operator;
               }(commonOperator);
            var SuffixOperator =
               /*#__PURE__*/
               function (_commonOperator2) {
                  _inherits(SuffixOperator, _commonOperator2);

                  function SuffixOperator(options) {
                     _classCallCheck(this, SuffixOperator);

                     return _possibleConstructorReturn(this, _getPrototypeOf(SuffixOperator).call(this, options));
                  }

                  return SuffixOperator;
               }(commonOperator);
            var PrefixOperator =
               /*#__PURE__*/
               function (_commonOperator3) {
                  _inherits(PrefixOperator, _commonOperator3);

                  function PrefixOperator(options) {
                     _classCallCheck(this, PrefixOperator);

                     return _possibleConstructorReturn(this, _getPrototypeOf(PrefixOperator).call(this, options));
                  }

                  return PrefixOperator;
               }(commonOperator);
            var Separator =
               /*#__PURE__*/
               function (_commonOperator4) {
                  _inherits(Separator, _commonOperator4);

                  function Separator(options) {
                     _classCallCheck(this, Separator);

                     return _possibleConstructorReturn(this, _getPrototypeOf(Separator).call(this, options));
                  }

                  return Separator;
               }(commonOperator);

            /***/
}),

/***/ "./src/tokens/TOKENS.js":
/*!******************************!*\
  !*** ./src/tokens/TOKENS.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/***
 * Ready To Use Regex For Rules
 */
/* harmony default export */ __webpack_exports__["default"] = ({
               STRING: "\"(?:[^\"]|\\\")*\"",
               NUMBER: "\\d+.\\d*|\\d*.\\d+",
               BRACKETS: "\\{.*?\\}",
               ROUND_BRACKETS: "\\(.*?\\)",
               CURLEY_BRACKETS: "\\{.*?\\}",
               SQUARE_BRACKETS: "\\[.*?\\]"
            });

            /***/
}),

/***/ "./src/tokens/index.js":
/*!*****************************!*\
  !*** ./src/tokens/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block.js */ "./src/tokens/Block.js");
/* harmony import */ var _Operators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Operators.js */ "./src/tokens/Operators.js");


/* harmony default export */ __webpack_exports__["default"] = ({
               Operator: _Operators_js__WEBPACK_IMPORTED_MODULE_1__["Operator"],
               SuffixOperator: _Operators_js__WEBPACK_IMPORTED_MODULE_1__["SuffixOperator"],
               PrefixOperator: _Operators_js__WEBPACK_IMPORTED_MODULE_1__["PrefixOperator"],
               Separator: _Operators_js__WEBPACK_IMPORTED_MODULE_1__["Separator"],
               Block: _Block_js__WEBPACK_IMPORTED_MODULE_0__["default"]
            });

            /***/
})

      /******/
});
});