/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */


function __tex2max() {
    // Options
    let options = {};

    // Default TeX2Max options
    const DEFAULTS = {
        onlySingleVariables: false,
        handleEquation: false,
        addTimesSign: true,
        onlyGreekName: false,
        onlyGreekSymbol: false,
        debugging: false
    };

    /**
     * Defines rules to be enforced on the TeX2Max options.
     */
    function enforceRules() {
        checkOnlyOneTrue(['onlyGreekName', 'onlyGreekSymbol']);
    }

    /**
     * Checks if the configured TeX2Max options, matching the option names passed as param,
     * contains multiple true values. If so, throw an exception.
     * @param option
     * @throws Error
     */
    function checkOnlyOneTrue(option) {

        let numTrue = 0;
        for (let i = 0; i < option.length; i++) {
            if (DEFAULTS[option[i]] === true) numTrue++;
            if (numTrue > 1) {
                throw new Error('Only one of the options: \"' + option.join('\", \"') + '\" can be set to \"true\"');
            }
        }
    }

    /**
     * Sets the TeX2Max options. If one or more settings passed as parameter are missing,
     * defaults defined in {@link DEFAULTS} will be used
     * @param userOptions
     */
    function setOptions(userOptions) {
        options = {};
        options = Object.assign(DEFAULTS, userOptions);
        enforceRules();
    }

    /**
     * Get the TeX2Max options.
     * @returns {object} the TeX2Max options
     */
    function getOptions() {
        if (Object.keys(options).length === 0 && options.constructor === Object) {
            setOptions();
        }

        let optionsCopy = Object.assign({}, options);

        return optionsCopy;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */


    const debug = (msg) => {
        let options = getOptions();
        let debugging = options.debugging;

        if (debugging) {
            console.debug(msg);
        }
    };

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    const TOKEN_TYPES = {
        WHITESPACE: {
            name: "WHITESPACE",
            symbol: " ",
            regex: /^\s+/
        },
        BACKSLASH: {
            name: "BACKSLASH",
            symbol: "\\",
            regex: /^[\\\\]$/
        },
        AMPERSAND: {
            name: "AMPERSAND",
            symbol: "&",
            regex: /^[&]$/
        },
        OPENING_BRACE: {
            name: "OPENING_BRACE",
            symbol: "{",
            regex: /^[\{]$/
        },
        CLOSING_BRACE: {
            name: "CLOSING_BRACE",
            symbol: "}",
            regex: /^[\}]$/
        },
        OPENING_PARENTHESES: {
            name: "OPENING_PARENTHESES",
            symbol: "(",
            regex: /^[\(]$/
        },
        CLOSING_PARENTHESES: {
            name: "CLOSING_PARENTHESES",
            symbol: ")",
            regex: /^[\)]$/
        },
        OPENING_BRACKET: {
            name: "BRACKET",
            symbol: "[",
            regex: /^[\[]$/
        },
        CLOSING_BRACKET: {
            name: "BRACKET",
            symbol: "]",
            regex: /^[\]]$/
        },
        VERTICAL_BAR: {
            name: "VERTICAL_BAR",
            symbol: "|",
            regex: /^[|]$/
        },
        NUMBER_LITERAL: {
            name: "NUMBER_LITERAL",
            symbol: null,
            regex: /^[0-9]+$/i
        },
        PERIOD: {
            name: "PERIOD",
            symbol: ".",
            regex: /^[.]$/
        },
        STRING_LITERAL: {
            name: "STRING_LITERAL",
            symbol: null,
            regex: /^[a-zA-Zα-ωΑ-Ω]+$/i
        },
        OPERATOR: {
            name: 'OPERATOR',
            symbol: null,
            regex: /^[+\-*/=^_!]$/i
        },
    };

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    function scan(input) {
        let lexemeList = [];

        function addLexeme(lexeme) {
            lexemeList.push(lexeme);
        }

        debug("\n------------------ SCANNER -> -------------------");
        let position = 0;
        while (position < input.length) {
            let isSupported = false;
            for (let type in TOKEN_TYPES) {
                if (!TOKEN_TYPES.hasOwnProperty(type)) {
                    continue;
                }

                if (input[position].match(TOKEN_TYPES[type].regex)) {
                    addLexeme(input[position]);
                    isSupported = true;
                }
            }

            if (!isSupported) throw new Error('Encountered unsupported character: ' + input[position]);

            position++;
        }
        return lexemeList;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */


    /**
     * Simple token class.
     */
    class Token {
        constructor(type, value, ) {
            this.value = value;
            this.type = type;
        }
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    /**
     * Represents a lexer used for providing lexical analysis on a
     * array of strings, based on a set of tokens..
     */
    function lex(lexemes) {

        let index = 0;
        let tokenList = [];

        let addToken = (token) => tokenList.push(token);

        let getTokenList = () => tokenList;

        function consume() {
            debug("Consuming position: " + index + ", char: " + lexemes[index]);
            return lexemes[index++];
        }

        function findMatchingTokenTypeByString(lexeme) {
            let tokenType = null;

            if (lexeme === undefined) {
                return null;
            }

            for (let token in TOKEN_TYPES) {
                if (!TOKEN_TYPES.hasOwnProperty(token)) {
                    continue;
                }
                let tokenType = TOKEN_TYPES[token];
                let regex = tokenType.regex;

                if (lexeme.match(regex)) {
                    return tokenType;
                }
            }
            return tokenType;
        }


        function startLexing() {
            debug("\n------------------ LEXICAL ANALYSIS -> -------------------");

            while (index < lexemes.length) {
                let token;
                let tokenValue = "";

                let tokenType = findMatchingTokenTypeByString(lexemes[index]);
                tokenValue = consume();
                token = new Token(tokenType, tokenValue);

                if (token !== undefined) {
                    addToken(token);
                }
            }

            return getTokenList();
        }

        return startLexing();
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */


    const MACROS = new Map([
        ['begin', null],
        ['end', null],
        ['to', null],
        ['cdot', null],
        ['times', null],
        ['ast', null],
        ['div', null],
        ['mod', null],
        ['pm', null],
        ['frac', null],
        ['infty', 'inf'],
        ['operatorname', null],

        // ['mathrm', null],
    ]);


    const IGNORED_MACROS = [];


    // Override macro nodes
    const MACROS_OVERRIDE = new Map([
        ['cdot', { type: 'operator', operatorType: 'infix', value: '*' }],
        ['times', { type: 'operator', operatorType: 'infix', value: '*' }],
        ['ast', { type: 'operator', operatorType: 'infix', value: '*' }],

        ['div', { type: 'operator', operatorType: 'infix', value: '/' }],
        ['mod', { type: 'operator', operatorType: 'infix', value: '%' }],
        ['pm', { type: 'operator', operatorType: 'infix', value: '+-' }], // The sign ± dosn't work with Maxima.


    ]);

    function isMacro(macroName) {
        let isMatch = false;
        let macro = MACROS.get(macroName);
        if (macro !== undefined) {
            isMatch = true;
        }

        return isMatch;
    }

    function isIgnoredMacro(macroName) {
        let isMatch = false;

        let i = 0;
        while (!isMatch && i < IGNORED_MACROS.length) {
            if (macroName === IGNORED_MACROS[i]) {
                isMatch = true;
            }
            i++;
        }

        return isMatch;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    const FUNCTIONS = new Map([
        ['lg', null],
        ['log', null],
        ['ln', null],
        ['sqrt', null],
        ['max', null],
        ['min', null],
        ['sum', null],
        ['lim', null],
        ['int', 'integral'],
        ['binom', null],
        ['abs', null],

        ['arccos', 'acos'],
        ['arccosh', 'acosh'],
        ['arccot', 'acot'],
        ['arccoth', 'acoth'],
        ['arccsc', 'acsc'],
        ['arccsch', 'acsch'],
        ['arcsec', 'asec'],
        ['arcsech', 'asech'],
        ['arcsin', 'asin'],
        ['arcsinh', 'asinh'],
        ['arctan', 'atan'],
        ['arctanh', 'atanh']
    ]);

    const TRIGONOMETRIC_FUNCTIONS = [
        {
            name: 'cos',
            inverse: 'acos'
        },
        {
            name: 'cosh',
            inverse: 'acosh'
        },
        {
            name: 'cot',
            inverse: 'acot'
        },
        {
            name: 'coth',
            inverse: 'acoth'
        },
        {
            name: 'csc',
            inverse: 'acsc'
        },
        {
            name: 'csch',
            inverse: 'acsch'
        },
        {
            name: 'sec',
            inverse: 'asec'
        },
        {
            name: 'sech',
            inverse: 'asech'
        },
        {
            name: 'sin',
            inverse: 'asin'
        },
        {
            name: 'sinh',
            inverse: 'asinh'
        },
        {
            name: 'tan',
            inverse: 'atan'
        },
        {
            name: 'tanh',
            inverse: 'atanh'
        }
    ];

    function isFunction(functionName) {
        let isMatch = false;

        if (isTrigonometricFunction(functionName)) {
            isMatch = true;
        } else {
            let func = FUNCTIONS.get(functionName);

            if (func !== undefined) {
                isMatch = true;
            }
        }
        return isMatch;
    }

    function getFunctionName(functionName) {
        let func;

        if (isTrigonometricFunction(functionName)) {
            func = functionName;
        } else {
            func = FUNCTIONS.get(functionName);

            if (func === null) {
                func = functionName;

            } else if (func === undefined) {
                throw new Error('Not recognised function: ' + func);
            }
        }

        return func;
    }


    function isTrigonometricFunction(func) {
        let name = TRIGONOMETRIC_FUNCTIONS.find((e) => e.name === func);
        let inverse = TRIGONOMETRIC_FUNCTIONS.find((e) => e.inverse === func);

        return name !== undefined || inverse !== undefined;
    }


    function getInverseTrigonometricFunction(func) {
        debug('Getting the inverse of the function "' + func + '"');

        let inverseTrig;
        for (let key in TRIGONOMETRIC_FUNCTIONS) {

            if (TRIGONOMETRIC_FUNCTIONS[key].name === func) {
                inverseTrig = TRIGONOMETRIC_FUNCTIONS[key].inverse;

            } else if (TRIGONOMETRIC_FUNCTIONS[key].inverse === func) {
                inverseTrig = TRIGONOMETRIC_FUNCTIONS[key].name;

            }

        }

        if (inverseTrig === undefined) return null;

        debug('- Found the inverse: ' + inverseTrig);
        return inverseTrig;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    const environments = [
        'matrix', 'pmatrix', 'bmatrix', 'Bmatrix',
        'vmatrix', 'Vmatrix', 'smallmatrix'
    ];

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    const RESERVED_WORDS = {
        INTEGRATION_END: {
            name: 'INTEGRATION_END',
            symbol: null,
            regex: /(d)[A-z]/,
            type: "integral_end"
        }
    };

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    const letters = [
        {
            name: 'alpha',
            symbol: 'α'
        }, {
            name: 'beta',
            symbol: 'β'
        }, {
            name: 'gamma',
            symbol: 'γ'
        }, {
            name: 'delta',
            symbol: 'δ'
        }, {
            name: 'epsilon',
            symbol: 'ϵ'
        }, {
            name: 'zeta',
            symbol: 'ζ'
        }, {
            name: 'eta',
            symbol: 'η'
        }, {
            name: 'theta',
            symbol: 'θ'
        }, {
            name: 'iota',
            symbol: 'ι'
        }, {
            name: 'kappa',
            symbol: 'κ'
        }, {
            name: 'lambda',
            symbol: 'λ'
        }, {
            name: 'mu',
            symbol: 'μ'
        }, {
            name: 'nu',
            symbol: 'ν'
        }, {
            name: 'omicron',
            symbol: 'ο'
        }, {
            name: 'pi',
            symbol: 'π'
        }, {
            name: 'rho',
            symbol: 'ρ'
        }, {
            name: 'sigma',
            symbol: 'σ'
        }, {
            name: 'tau',
            symbol: 'τ'
        }, {
            name: 'upsilon',
            symbol: 'υ'
        }, {
            name: 'phi',
            symbol: 'ϕ'
        }, {
            name: 'chi',
            symbol: 'χ'
        }, {
            name: 'psi',
            symbol: 'ψ'
        }, {
            name: 'omega',
            symbol: 'ω'
        }
    ];

    function toUpperCase(x) {
        return x.charAt(0).toUpperCase() + x.slice(1);
    }

    function isUpperCase(x) {
        return x.charAt(0).toUpperCase() === x.charAt(0);
    }

    function getSymbol(name) {
        let symbol = letters.find((e) => e.name === name.toLowerCase());
        if (symbol === undefined) return null;
        symbol = symbol.symbol;
        if (isUpperCase(name)) symbol = toUpperCase(symbol);
        return symbol;
    }

    function getName(symbol) {
        let name = letters.find((e) => e.symbol === symbol.toLowerCase());
        if (name === undefined) return null;
        name = name.name;
        if (isUpperCase(symbol)) name = toUpperCase(name);
        return name;
    }

    function isGreekLetter(letter) {
        let symbol = letters.find((e) => e.name === letter.toLowerCase());
        let name = letters.find((e) => e.symbol === letter.toLowerCase());

        return symbol !== undefined || name !== undefined;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2019 NTNU
     */


    const DELIMITERS = new Map([
        ['left', 'right'],
        ['right', 'left'],
    ]);

    function isDelimiter(delimiterName) {
        let isMatch = false;
        let delimiter = DELIMITERS.get(delimiterName);
        if (delimiter !== undefined) {
            isMatch = true;
        }
        return isMatch;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    function parseLatex(tokens) {
        const options = getOptions();
        debug("\n------------------ PARSING -> -------------------");

        let index = 0;
        let structure = [];

        function addNode(obj) {
            if (checkArray(obj)) {
                structure.push(...obj);
            } else {
                structure.push(obj);

            }
        }

        function checkArray(value) {
            return value && typeof value === 'object' && value.constructor === Array;
        }

        function consume() {
            debug("Consuming position: " + index);
            return tokens[index++].value;
        }

        function skipToken() {
            debug("Skip token at position: " + index);
            return tokens[index++].value;
        }

        function getCurrentChar() {
            return tokens[index] ? tokens[index].value : undefined;
        }

        function getCurrentTypeSymbol() {
            return tokens[index].type.symbol;
        }

        function peekType() {
            return tokens[index + 1] ? tokens[index + 1].type.name : null;
        }

        function lookBackValue() {
            let previousToken = tokens[index - 1];
            return previousToken ? previousToken.value : null;
        }

        function lookBack(position) {
            let previousToken = structure[structure.length - position];
            return previousToken ? previousToken.type : null;
        }

        function parseDigit() {
            debug("- Single number");
            return {
                type: 'number',
                value: consume()
            };
        }

        function parseNumber() {
            debug('Parsing number: ' + tokens[index].value);

            let nextToken = peekType();
            let previousTokenValue = lookBackValue();
            let previousStructureType = lookBack(1); // Check if previously added structure is a function
            if (previousTokenValue !== '^' && previousTokenValue !== '_' && previousStructureType !== 'function') {
                if ((nextToken !== null && nextToken === TOKEN_TYPES.NUMBER_LITERAL.name)) {

                    debug("- Found another number \"" + tokens[index + 1].value + "\", continuing parsing");
                    let currentNumber = parseDigit().value + parseExpression().value;
                    return {
                        type: 'number',
                        value: currentNumber,
                    };
                } else {
                    return parseDigit();
                }
            } else {
                return parseDigit();
            }
        }

        function parseDecimalSeparator() {
            debug('Parsing decimal number: ' + getCurrentChar());
            let nextToken = peekType();
            let previousStructureType = lookBack(1);

            if (previousStructureType !== 'number') {
                // TODO review if this should be allowed ".2" instead of "0.2".
                throw new Error('Leading decimal separators are not allowed');
            }

            return {
                type: 'decimal_separator',
                value: consume(),
            };
        }

        function parseWord() {
            debug('- Found letter \"' + getCurrentChar() + '\"');

            let sequence = "";

            if (peekType() === TOKEN_TYPES.STRING_LITERAL.name) {
                debug(', Continuing parsing');
                sequence = consume() + parseWord(TOKEN_TYPES.STRING_LITERAL.name);
                debug('Current word: ' + sequence);
            } else {
                sequence = consume();
            }
            debug('Current sequence: ' + sequence);
            return sequence;
        }

        function isReservedWord(word) {
            let isReserved = false;
            debug('Checking ' + word + ' for reserved word');
            for (let key in RESERVED_WORDS) {
                if (!RESERVED_WORDS.hasOwnProperty(key)) {
                    continue;
                }
                let regex = RESERVED_WORDS[key].regex;
                if (regex.test(word)) {
                    isReserved = true;
                }
            }
            return isReserved;
        }

        function handleReservedWord(word) {
            let reservedWordType = "";
            let reservedWord = "";

            for (let key in RESERVED_WORDS) {
                if (!RESERVED_WORDS.hasOwnProperty(key)) {
                    continue;
                } else {
                    let regex = RESERVED_WORDS[key].regex;
                    if (word.match(regex) !== null) {
                        reservedWordType = RESERVED_WORDS[key].type;
                        reservedWord = regex.exec(word);
                        break;
                    }
                }
            }

            return {
                type: reservedWordType,
                value: reservedWord
            }
        }

        function parseVariable() {

            debug('Parsing variable: ' + tokens[index].value);
            let word = "";
            let backtrack = index;

            word = parseWord();

            debug('Current word: ' + word);


            // Check for reserved variable words
            if (isReservedWord(word)) {
                debug('Variable contains reserved words');

                let reservedWordLength;

                let reservedWordResult = handleReservedWord(word);
                let reservedWord = reservedWordResult.value;
                reservedWordLength = reservedWord[0].length;

                debug('reserved word: ' + reservedWord[0] + ", length: " + reservedWordLength + ", index " + reservedWord.index);

                if (reservedWord.index > 0) {
                    index = backtrack + reservedWord.index;
                    word = word.substr(0, (reservedWord.index));

                    if (options.onlySingleVariables === true && options.addTimesSign === false) {
                        // Assert only single variables if onlySingleVariables- and addTimesSign options are sat to true and false.
                        if (word.length > 1) {
                            throw new Error('The current options only allow for single variables');
                        }
                    } else if (options.onlySingleVariables) { // Only produce single-char variables
                        index = backtrack;
                        word = consume();
                    }

                } else {
                    index = backtrack + reservedWordLength;
                    word = reservedWord[0];
                }

            } else if (options.onlySingleVariables === true && options.addTimesSign === false) {
                // Assert only single variables if onlySingleVariables- and addTimesSign options are sat to true and false.
                if (word.length > 1) {
                    throw new Error('The current options only allow for single variables');
                }

            } else if (options.onlySingleVariables) { // Only produce single-char variables
                index = backtrack;
                word = consume();
            }

            return {
                type: 'variable',
                value: word
            };
        }

        function parseVerticalBar() {
            let node = null;
            let previousStructureType = lookBack(1);
            if (previousStructureType !== 'delimiter') {
                throw new Error('Pipe symbols may only be used with "left" / "right" delimiters.');
            }

            node = {
                type: 'vertical_bar',
                value: consume()
            };

            return node;
        }

        function parseDelimiter(delimiter) {
            let node = null;
            node = {
                type: 'delimiter',
                value: delimiter
            };

            return node;
        }

        function parseBracket() {
            let node = null;
            let bracketName = getBracketName(getCurrentTypeSymbol());
            let bracketType = getBracketType(getCurrentTypeSymbol());
            node = {
                type: bracketType,
                symbol: bracketName,
                value: consume()
            };

            return node;
        }

        /*function parseGroup(delimiter = null) {
            let groupName = getBracketName(getCurrentTypeSymbol());
            let length = 0;
    
            if (delimiter) {
                length = matchingGroupLength(tokens.slice(index), delimiter, groupName);
            } else {
                length = matchingBracketLength(tokens.slice(index), groupName);
            }
    
            if (length instanceof Error) return length;
    
            const newLatex = tokens.slice(index + 1, index + (length));
            logger.debug('New group created');
    
            index += length + 1;
    
            return {
                type: 'group',
                symbol: groupName,
                value: parseLatex(newLatex, options)
            };
        }*/

        function parseMacro(macroName) {
            let macro = null;
            let isMacroMatch = isMacro(macroName);
            let isGreek = isGreekLetter(macroName);

            if (isMacroMatch) {
                // Check for overrides
                macro = MACROS_OVERRIDE.get(macroName);

                if (macro === undefined) {
                    macro = {
                        type: 'token',
                        value: macroName
                    };
                }
            } else if (isGreek) {
                macro = {
                    type: 'token',
                    value: macroName
                };
            } else if (isIgnoredMacro(macroName)) {
                macro = null;
            } else {
                throw new Error('Encountered an unsupported macro: ' + macroName);
            }

            return macro;
        }

        function isEnvironment(functionalWord) {
            const isEnvironment = environments.reduce((acc, val) => {
                return acc || val === functionalWord;
            }, false);

            debug("Is acknowledged environment?: " + isEnvironment);
            return isEnvironment;
        }

        function parseEnvironment(state) {
            if (getCurrentChar() !== TOKEN_TYPES.OPENING_BRACKET.symbol) {
                throw new Error('No argument for environments are present.')
            }
            skipToken(); // Skip brace
            let environmentType = parseWord();
            skipToken(); // Skip brace

            if (isEnvironment(environmentType)) {
                if (state === 'begin' || state === 'end') {
                    return {
                        type: 'environment',
                        state: state,
                        value: environmentType
                    }

                } else {
                    throw new Error('environment state ' + state + ' is not valid')
                }

            } else {
                throw new Error('Environment type ' + environmentType + ' is not supported');
            }

        }

        function isSpecialChar(functionalWord) {
            let specials = [' ', '{', '}', '\\'];
            let isSpecialChar = false;

            specials.forEach(s => {
                if (functionalWord === s) {
                    isSpecialChar = true;
                    debug(functionalWord + ' is special char');
                }
            });

            return isSpecialChar;
        }

        function handleSpecialChar(functionalWord) {
            let result = null;
            switch (functionalWord) {
                case ' ':
                    result = null;
                    break;

                case '{':
                    result = parseBracket();
                    break;

                case '}':
                    result = parseBracket();
                    break;

                case '\\':
                    result = {
                        type: 'DOUBLE_BACKSLASH',
                        value: consume() + consume()
                    };
                    break;
                default:
                    return false;
            }

            return result;
        }

        function parseOperatorname() {
            let node = null;
            skipToken(); // Skip bracket
            let functionalWord = parseWord();
            node = parseFunction(functionalWord);
            skipToken(); // Skip bracket
            return node;
        }

        function handleBackslash() {
            debug('Found backslash');
            let node = null;

            // TODO move into handleSpecialChar
            if (peekType() === TOKEN_TYPES.BACKSLASH.name) {
                return {
                    type: 'DOUBLE_BACKSLASH',
                    value: consume() + consume()
                }
            }
            index++; // Skip backslash

            if (getCurrentChar() === undefined) return null;

            if (isSpecialChar(getCurrentChar())) {
                node = handleSpecialChar(getCurrentChar());
                return node;
            }


            let functionalWord = parseWord();

            if (functionalWord === 'begin') {
                node = parseEnvironment('begin');
            } else if (functionalWord === 'end') {
                node = parseEnvironment('end');
            } else if (functionalWord === 'operatorname') {
                node = parseOperatorname();
            } else if (isFunction(functionalWord)) {
                node = parseFunction(functionalWord);
            } else if (isDelimiter(functionalWord)) {
                node = parseDelimiter(functionalWord);
            } else {
                node = parseMacro(functionalWord);
            }

            return node;
        }


        function parseFunction(functionName) {
            let node = {};
            let func = getFunctionName(functionName);
            node = {
                type: 'function',
                value: func
            };

            return node;
        }


        function parseOperator() {
            debug("Found operator");

            const token = tokens[index];

            const infix = /^[+\-*/=^_]$/i;
            const prefix = /^[]$/i;
            const postfix = /^[!]$/i;

            if (infix.test(token.value)) { // Is infix operator

                return {
                    type: 'operator',
                    operatorType: 'infix',
                    value: consume()
                };
            } else if (prefix.test(token.value)) {
                return {
                    type: 'operator',
                    operatorType: 'prefix',
                    value: consume()
                };
            } else if (postfix.test(token.value)) {
                return {
                    type: 'operator',
                    operatorType: 'postfix',
                    value: consume()
                };
            }
        }


        function parseExpression() {

            let parsedResult = null;

            const token = tokens[index];
            switch (token.type) {

                case TOKEN_TYPES.NUMBER_LITERAL:
                    debug('Found NUMBER_LITERAL \"' + getCurrentChar() + '\"');
                    parsedResult = parseNumber();
                    break;
                case TOKEN_TYPES.PERIOD:
                    debug('Found PERIOD\"' + getCurrentChar() + '\"');
                    parsedResult = parseDecimalSeparator();
                    break;
                case TOKEN_TYPES.BACKSLASH:
                    debug('Found BACKSLASH \"' + getCurrentChar() + '\"');
                    parsedResult = handleBackslash();
                    break;
                case TOKEN_TYPES.OPERATOR:
                    debug('Found OPERATOR \"' + getCurrentChar() + '\"');
                    parsedResult = parseOperator();
                    break;
                case TOKEN_TYPES.STRING_LITERAL:
                    debug('Found STRING_LITERAL \"' + getCurrentChar() + '\"');
                    parsedResult = parseVariable();
                    break;
                case TOKEN_TYPES.OPENING_BRACE:
                case TOKEN_TYPES.CLOSING_BRACE:
                    debug('Found BRACKET \"' + getCurrentChar() + '\"');
                    parsedResult = parseBracket();
                    break;
                case TOKEN_TYPES.OPENING_PARENTHESES:
                case TOKEN_TYPES.CLOSING_PARENTHESES:
                    debug('Found BRACKET \"' + getCurrentChar() + '\"');
                    parsedResult = parseBracket();
                    break;
                case TOKEN_TYPES.OPENING_BRACKET:
                case TOKEN_TYPES.CLOSING_BRACKET:
                    debug('Found BRACKET \"' + getCurrentChar() + '\"');
                    parsedResult = parseBracket();
                    break;
                case TOKEN_TYPES.VERTICAL_BAR:
                    debug('Found VERTICAL_BAR \"' + getCurrentChar() + '\"');
                    parsedResult = parseVerticalBar();
                    break;

                default:
                    index++;
                    break;
            }

            return parsedResult;
        }


        function startParse() {

            let count = 0;
            while (index < tokens.length) {
                debug("--------- Parsing next token. While loop run: " + count + ' ---------');

                let node = parseExpression();
                if (node === null) {
                    continue;
                }

                if (node === undefined) {
                    index = tokens.length;

                    throw new Error('node is undefined');
                }

                addNode(node);
                debug('Parsed result type: ' + node.type);

                count++;

                if (count > 1000) throw new Error('Max count reached, infinite loop encountered.'); // TODO REMOVE
            }
            debug("--------- End of while loop. Tokens position: " + (index - 1) + " of " + (tokens.length - 1) + ' ---------');
            return structure;
        }

        return startParse();
    }


    function getBracketName(bracket) {
        let name = "";

        switch (bracket) {
            case TOKEN_TYPES.OPENING_BRACE.symbol:
                name = 'curly';
                break;
            case TOKEN_TYPES.CLOSING_BRACE.symbol:
                name = 'curly';
                break;
            case TOKEN_TYPES.OPENING_PARENTHESES.symbol:
                name = 'normal';
                break;
            case TOKEN_TYPES.CLOSING_PARENTHESES.symbol:
                name = 'normal';
                break;
            case TOKEN_TYPES.OPENING_BRACKET.symbol:
                name = 'square';
                break;
            case TOKEN_TYPES.CLOSING_BRACKET.symbol:
                name = 'square';
                break;
        }
        return name;
    }

    function getBracketType(bracket) {
        let type = "";

        switch (bracket) {
            case TOKEN_TYPES.OPENING_BRACE.symbol:
            case TOKEN_TYPES.OPENING_PARENTHESES.symbol:
            case TOKEN_TYPES.OPENING_BRACKET.symbol:
                type = 'opening_bracket';
                break;
            case TOKEN_TYPES.CLOSING_BRACE.symbol:
            case TOKEN_TYPES.CLOSING_PARENTHESES.symbol:
            case TOKEN_TYPES.CLOSING_BRACKET.symbol:
                type = 'closing_bracket';
                break;
        }
        return type;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    function environmentLength(parsedLatex) {
        let environmentDepth = 0;


        for (let i = 0; i < parsedLatex.length; i++) {

            if (parsedLatex[i].type === 'environment' && parsedLatex[i].state === 'begin') {
                environmentDepth++;
                debug('-- Found new \"begin\" environment, depth ' + environmentDepth);
            } else if (parsedLatex[i].type === 'environment' && parsedLatex[i].state === 'end') {
                if (environmentDepth === 1) {
                    debug('-- Found original environment end at position ' + i);
                    return i - 1;
                }

                environmentDepth--;
                debug('-- Found environment \"end\", depth ' + environmentDepth);
            }
        }
        throw new Error('Environments \"begin\" and \"end\" doesn\'t match up');
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    /**
     * Whether or not the object is an equation or an expression
     * @return {boolean} true if expression
     */
    function isEquation(parsedLatex) {
        let numEqualSigns = 0;

        parsedLatex.forEach(e => {
            if (e.type === 'operator' && e.value === '=') {
                numEqualSigns++;
            }
        });

        if (numEqualSigns === 1) {
            return true;
        } else if (numEqualSigns > 1) {
            throw new Error('Expression contains more than one equal signs');
        } else {
            return false;
        }
    }


    /**
     * Check if an mathematical expression passed as an array of tokens
     * contains any variables.
     *
     * @param {(string|Array)} parsedLatex Mathematical expression composed of an array of tokens
     * @return {boolean} Returns true if parsedLatex parameter contains any variables.
     */
    function checkForVariable(parsedLatex) {
        debug('Checking expression ' + JSON.stringify(parsedLatex) + ' for variable');
        let containsVariable = false;


        if (Array.isArray(parsedLatex)) {
            for (let i = 0; i < parsedLatex.length; i++) {
                if (parsedLatex[i].type === 'group') {
                    let containsGroupVariable = checkForVariable(parsedLatex[i].value);
                    if (containsGroupVariable) {
                        containsVariable = true;
                    }
                } else {
                    if (parsedLatex[i].type === 'variable') {
                        containsVariable = true;
                    }
                }
            }
        } else {
            if (parsedLatex.type === 'variable') {
                containsVariable = true;
            } else {
                containsVariable = false;
            }
        }
        return containsVariable;
    }


    function buildMaximaFunctionString(functionName, expression, ...arg) {

        let maximaFunctionString = "";
        maximaFunctionString += functionName + '(' + expression;
        arg.forEach(e => {
            if (e !== false && e !== null && e !== undefined) {
                maximaFunctionString += ',' + e;
            }
        });
        maximaFunctionString += ')';

        return maximaFunctionString;
    }


    /**
     * Search for an object key value's first occurrence in an array passed as parameter,
     * matching the type and string passed as parameters.
     *
     * @param {(Object|Array)} parsedLatex Mathematical expression composed of an array of tokens
     * @param {string} tokenType The type to search for. Either 'type' or 'value'
     * @param {string} query The string to search for
     * @param {boolean} deepSearch Whether or not to search in all array dimensions
     * @return {Object<string, Array<number|...Array<number>>>} Returns true if search criteria matches, false otherwise
     */
    function searchForOccurrence(parsedLatex, tokenType, query, deepSearch) {

        let isPresent = false;
        let isPresentInGroup = false;
        let position = [];

        if (Array.isArray(parsedLatex)) {

            for (let i = 0; i < parsedLatex.length; i++) {
                if (parsedLatex[i].type === 'group' && deepSearch) {
                    let group;
                    if (tokenType === 'type') {
                        group = searchForOccurrence(parsedLatex[i].type, 'type', query, true);
                        isPresentInGroup = group.isPresent;
                    } else if (tokenType === 'value') {
                        group = searchForOccurrence(parsedLatex[i].value, 'value', query, true);
                        isPresentInGroup = group.isPresent;

                    }
                    if (isPresentInGroup) {
                        position.push(group.position);
                        isPresent = true;
                    }

                } else {
                    if (tokenType === 'type') {
                        if (parsedLatex[i].type === query) {
                            isPresent = true;
                            position.push(i);
                        }
                    } else if (tokenType === 'value') {
                        if (parsedLatex[i].value === query) {
                            isPresent = true;
                            position.push(i);

                        }
                    }
                }
            }
        } else {

            if (tokenType === 'type') {
                if (parsedLatex.type === query) {
                    isPresent = true;
                    position = 0;
                }

            } else if (tokenType === 'value') {
                if (parsedLatex.value === query) {
                    isPresent = true;
                    position = null;
                }

            } else {
                isPresent = false;
            }
        }

        let isPresentObj = {
            isPresent: isPresent,
            position: position
        };
        return isPresentObj;
    }

    function wrapForTranspilation(item) {
        if (Array.isArray(item)) {
            return item;
        } else if (typeof item === "object" && typeof item !== "string") {
            return [item];
        }
    }

    function stripParenthesis(mathString) {
        let openingParenthesis = mathString.charAt(0);
        let closingParenthesis = mathString.charAt(-1);
        if (openingParenthesis.match(/[({\[]/) || closingParenthesis.match(/[)}\]]/)) {
            return mathString.substr(1, mathString.length - 2);
        } else {
            return mathString;
        }
    }

    function stripAllParenthesis(mathString) {
        return mathString.replace(/[()]/g, '');
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    function assertNotUndefined(item, message) {
        if (typeof item === 'undefined') {
            throw new Error(message);
        }
    }

    function getExpressionLength(parsedLatex, types = [], values = []) {
        // Locate the next operator + or -, function etc...

        let expressionLength = 0;
        let condition = null;
        let conditionValue = null;

        if (parsedLatex[0].type === 'group' && parsedLatex.length === 1) {
            expressionLength = 1;
        } else {
            let i = 0;
            let foundExpressionLength = false;
            while (i < parsedLatex.length && !foundExpressionLength) {

                if (types != null) {
                    types.forEach(type => {
                        if (parsedLatex[i].type === type) {
                            expressionLength = (i);
                            foundExpressionLength = true;
                            condition = 'type';
                            conditionValue = type;

                        }
                    });
                }

                if (values != null && !foundExpressionLength) {
                    values.forEach(value => {
                        if (parsedLatex[i].value === value) {
                            expressionLength = (i);
                            foundExpressionLength = true;
                            condition = 'value';
                            conditionValue = value;
                        }
                    });
                }

                i++;
            }

            if (!foundExpressionLength) {
                expressionLength = parsedLatex.length;
            }
        }

        return { expressionLength: expressionLength, condition: condition, conditionValue: conditionValue };
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */


    function handleMatrix(parsedLatex) {
        let matrixString = "";

        matrixString += 'matrix(';

        let matrixArray = [];
        let rowArray = [];

        for (let i = 0; i < parsedLatex.length; i++) {
            assertNotUndefined(parsedLatex[i], 'Missing argument in matrix');
            const type = parsedLatex[i].type;

            if (type === 'DOUBLE_BACKSLASH') { // New row
                matrixArray.push(rowArray);
                rowArray = []; // Reset array
            } else {
                rowArray.push(transpiler(wrapForTranspilation(parsedLatex[i])));
            }
        }
        matrixArray.push(rowArray); // Push last row

        let matrixRowSize = matrixArray[0].length;

        for (let row = 0; row < matrixArray.length; row++) {
            if (matrixArray[row].length !== matrixRowSize) {
                throw new Error('All rows in matrix must be the same length');
            }

            if (row !== 0) {
                matrixString += ',';
            }
            matrixString += '[' + matrixArray[row].toString() + ']';
        }
        matrixString += ')';

        return matrixString;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    /**
     * Will find the length to the end of the integral in the provided tokens array
     * @param  {string} tokens       An array of tokens, starting from where the search should begin
     * @return {Object}             The length from start of provided string,
     *                              to the location of the matching bracket
     */
    function findIntegralEnd(tokens) {

        debug('Finding end of integral');
        let integralDepth = 1;
        let integrationVariable = "";

        for (let i = 0; i < tokens.length; i++) {

            const char = tokens[i].value;
            debug('-- Char:' + char);

            if (tokens[i].type === 'function' && tokens[i].value === 'integral') {
                integralDepth++;
                debug('-- Found starting integral, depth ' + integralDepth);
            } else if (tokens[i].type === 'variable' && char[0] === "d") {


                let regex = /(d)[A-z]/g; // Match integration ends like dx and dy in dxdy
                let match = char.match(regex);

                if (match !== null && match.length >= 1) {

                    if (integralDepth === 1) {
                        integrationVariable = char.substring(1);
                        debug('-- Found end of original integral at position ' + i);
                        return {
                            length: i,
                            variable: integrationVariable
                        };
                    }

                    integralDepth--;
                    debug('-- Found integral end, depth ' + integralDepth);
                }
            }
        }

        throw new Error('No end of integral located');
    }


    function handleUpperAndLowerArgs(parsedLatex) {


        let lowerLimit, upperLimit;
        let index = 0;

        for (let j = 0; j < 2; j++) {
            if (parsedLatex[index + j].value === '_') {
                index++;

                lowerLimit = transpiler(wrapForTranspilation(parsedLatex[index + j]));

            } else if (parsedLatex[index + j].value === '^') {

                index++;

                upperLimit = transpiler(wrapForTranspilation(parsedLatex[index + j]));

            } else {
                throw new Error('Finite integral must have both upper and lower limits');
            }
        }


        return {
            lowerLimit: lowerLimit,
            upperLimit: upperLimit
        }
    }


    // Check which variable that comes after the "d" in f.eks dx. This is the variable to put as integrate arguments. Eg. integrate(2*x, x, 1,2)

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */
    function handleUpperAndLowerArgsSum(parsedLatex) {
        let lowerLimit, upperLimit;
        let index = 0;

        for (let j = 0; j < 2; j++) {
            if (parsedLatex[index + j].value === '_') {
                index++;
                lowerLimit = parsedLatex[index + j];

            } else if (parsedLatex[index + j].value === '^') {
                index++;
                upperLimit = transpiler(wrapForTranspilation(parsedLatex[index + j]));

            } else {
                throw new Error('Finite integral must have both upper and lover limits');
            }
        }

        return {
            lowerLimit: lowerLimit,
            upperLimit: upperLimit
        }
    }


    function handleLowerSumArguments(parsedLatex) {

        assertNotUndefined(parsedLatex[0], 'Missing index');
        const indexVariable = parsedLatex[0];

        assertNotUndefined(parsedLatex[1], 'Index must be assigned. Missing equal sign');
        const equalSign = parsedLatex[1].value;

        if (!checkForVariable(indexVariable)) {
            throw new Error('Index must be a variable');
        } else if (equalSign !== '=') {
            throw new Error('Index must be assigned. Missing equal sign');
        }

        let upperLim = parsedLatex.slice(2);
        let value = "";

        value += transpiler(wrapForTranspilation(upperLim));

        return {
            variable: indexVariable.value,
            value: value,
        };

    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */


    function handleLimitArguments(limitArgs) {

        if (!checkForVariable(limitArgs[0])) {// Control for several expression before 'to'
            throw new Error('Limit: "From" argument must be a symbol');
        } else if (!searchForOccurrence(limitArgs[1], 'value', 'to', false).isPresent) {
            throw new Error('Limit: no "to" token provided')
        } else if (limitArgs[2] === undefined) {
            throw new Error('Limit: "To" argument missing')
        }

        let variable = limitArgs[0].value;
        let upperLim = limitArgs.slice(2);
        let value = "";

        value += transpiler(wrapForTranspilation(upperLim));

        let direction = isOneSidedLimit(limitArgs.slice(2));

        return {
            variable: variable,
            value: value,
            direction: direction
        };
    }


    function isOneSidedLimit(expression) {
        debug('Checking if limit is one sided');

        let isOneSided = false;
        let sideSymbol = '';
        let side = '';

        for (let i = 0; i < expression.length; i++) {
            if (expression[i].type === 'group') {
                let isOneSidedGroup = isOneSidedLimit(expression[i].value);

                if (isOneSidedGroup !== false) {
                    isOneSided = true;
                    side = isOneSidedGroup;
                }
            }
            if ((expression[i].value === '+' || expression[i].value === '-') && (i + 1) >= expression.length) {
                isOneSided = true;
                sideSymbol = expression[i].value;

            }
        }

        if (isOneSided) {
            side = sideSymbol === '+' ? 'plus' : 'minus';
            debug('- Limit is one-sided from the ' + side + ' side');
        } else {
            debug('- Limit is not one-sided');
        }

        return isOneSided ? side : false;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */

    /**
     * Will transpile a mathematical expression representation, derived from LaTeX,
     * to the corresponding language form required by Maxima.
     * Eg. 2*(3*4+4**2)/(sqrt(5))-8
     *
     * @param  {object} parsedLatex An object parsed by "./parser.js"
     * @return string The string representation of a mathematical expression in Maxima format, derived from LaTeX
     */
    function transpiler(parsedLatex) {
        debug('\n------------------ TRANSPILING -> -------------------');
        const options = getOptions();

        let transpiledString = '';
        let index = 0;

        transpiledString += '(';

        for (index; index < parsedLatex.length; index++) {
            const item = parsedLatex[index];

            switch (item.type) {

                case 'operator':
                    doOperator();
                    break;
                case 'number':
                    doNumber();
                    break;
                case 'variable':
                    doVariable();
                    break;
                case 'group':
                    doGroup();
                    break;
                case 'token':
                    doToken();
                    break;
                case 'function':
                    doFunction();
                    break;
                case 'environment':
                    doEnvironment();
                    break;
            }

            function addTimesSign(index, ...obj) {
                let previousToken = parsedLatex[index - 1];
                let isPass = true;
                if (index > 0) {
                    obj.forEach(e => {
                        let allKeysMatch = true;
                        for (let key in e) {
                            if (!e.hasOwnProperty(key)) {
                                continue;
                            }
                            if ((previousToken[key] !== e[key])) {
                                allKeysMatch = false;
                            }
                        }

                        if (allKeysMatch === true) {
                            isPass = false;
                        }
                    });

                    if (options.addTimesSign && isPass) {
                        debug(
                            'Adding * before ' + item.type + ': ' + item.value + ', previous item: ' + parsedLatex[index - 1].type);
                        transpiledString += '*';
                    }
                }
            }

            // TODO possible move operator checking to post-parser, since this is a parser job.
            function doOperator() {
                const previousToken = parsedLatex[index - 1];

                if (index === 0 && (item.value === '+')) {
                    debug('Structure starts with +, ignoring');
                } else if (index === 0 && item.operatorType !== 'prefix' && item.value !== '-') {// TODO add "-" as valid prefix
                    throw new Error('Operator ' + item.value + ' is not an prefix operator');

                } else {
                    if (item.value === '+' || item.value === '-') {
                        transpiledString += item.value;

                    } else if (item.operatorType === 'postfix') {
                        if (previousToken.type !== 'operator') {
                            transpiledString += item.value;
                        } else {
                            throw new Error('Operator ' + item.value + ' has to be an postfix operator');
                        }

                    } else if (item.operatorType === 'prefix') {
                        // transpiledString += item.value;

                    } else if (item.operatorType === 'infix') {

                        if (previousToken.type !== 'operator' && previousToken.type !== 'operator') {
                            transpiledString += item.value;
                        } else {
                            throw new Error('Operator ' + item.value + ' has to be an infix operator');
                        }
                    }
                }

                if ((item.operatorType === 'infix' || item.operatorType === 'prefix') && index === (parsedLatex.length - 1)) {
                    throw new Error('Operator ' + item.value + ' is an invalid end character.');
                }
            }

            function doNumber() {
                addTimesSign(index, { type: 'number' }, { type: 'operator', operatorType: 'infix' });
                transpiledString += item.value;
            }

            function doVariable() {
                let variableString = '';
                addTimesSign(index, { type: 'operator', operatorType: 'infix' });

                if (getName(item.value) !== null) {
                    let letter = getName(item.value);
                    if (options.onlyGreekSymbol) {
                        letter = getSymbol(letter);
                    }
                    debug('greek letter ' + letter);
                    variableString += letter;
                } else {
                    variableString += item.value;
                }

                transpiledString += variableString;
            }

            function doGroup() {
                let groupString = '';

                addTimesSign(index, { type: 'function' }, { type: 'operator' });

                groupString += transpiler(item.value);

                if (item.symbol === 'vertical_bar') {
                    groupString = stripParenthesis(groupString);
                }

                transpiledString += groupString;

            }

            function doToken() {

                debug('Handling token: ' + item.value);

                let tokenString = '';
                let startIndex = index;

                if (getSymbol(item.value) !== null) {
                    // Token is greek letter name
                    let letter = item.value;
                    if (options.onlyGreekSymbol) {
                        letter = getSymbol(letter);
                    }
                    debug('greek letter ' + letter);
                    tokenString += letter;
                }

                if (getName(item.value) !== null) {
                    // Token is greek letter symbol
                    let letter = item.value;
                    if (options.onlyGreekName) {
                        letter = getName(letter);
                    }
                    debug('greek letter ' + letter);
                    tokenString += letter;
                }

                if (isMacro(item.value)) {
                    let macro = MACROS.get(item.value);
                    if (macro === null) {
                        debug('Skipping macro ' + item.value);
                    } else if (macro !== undefined) {
                        debug('Adding macro ' + macro);
                        tokenString += macro;
                    }
                }

                // Handle fraction
                if (item.value === 'frac') {
                    if (parsedLatex[index + 1].type === 'group' && parsedLatex[index + 2].type === 'group') {
                        debug('Found fraction');
                        tokenString += '(';
                        tokenString += transpiler(parsedLatex[index + 1].value) + '/' + transpiler(parsedLatex[index + 2].value);
                        tokenString += ')';
                        index += 2;
                    } else {
                        throw new Error('Fraction must have 2 following parameters');
                    }
                }

                if (startIndex > 0 && tokenString !== '' && (isMacro(item.value) || isGreekLetter(item.value))) {
                    addTimesSign(startIndex, { type: 'operator' });
                }

                transpiledString += tokenString;
            }

            function doFunction() {

                addTimesSign(index, { type: 'operator' });

                const nextItem = parsedLatex[index + 1];

                if (item.value === 'sqrt') {
                    if (parsedLatex[index + 1].type === 'group') {
                        let sqrtString = '';
                        if (parsedLatex[index + 1].symbol === 'square' && parsedLatex[index + 2].type === 'group') {
                            debug('Found function nth-square root');
                            let nthArgString = transpiler(parsedLatex[index + 1].value);

                            sqrtString += transpiler(parsedLatex[index + 2].value);
                            sqrtString += '^(1/' + nthArgString + ')';
                            index++;

                        } else {
                            transpiledString += item.value;
                            debug('Found function square root');
                            sqrtString += transpiler(parsedLatex[index + 1].value);

                        }

                        transpiledString += sqrtString;
                        index++;
                    } else {
                        throw new Error('Square root must be followed by [] or {}');
                    }
                } else if (item.value === 'lim') {
                    debug('Found function "limit"');
                    handleLimit();

                } else if (item.value === 'binom') {
                    debug('Found function "binomial"');
                    handleBinomial();

                } else if (item.value === 'sum') {
                    debug('Found function "sum"');
                    handleSum();

                } else if (item.value === 'integral') {
                    debug('Found function "integral"');
                    handleIntegral();

                } else if (item.value === 'abs') {
                    debug('Found function "abs"');
                    handleAbs();

                } else if (isTrigonometricFunction(item.value)) {
                    debug('Found trigonometric function "' + item.value + '"');
                    handleTrig();

                } else {
                    debug('Found normal "function"');
                    handleNormalFunction();

                }

                function handleNormalFunction() {
                    let expression = '';
                    let func = item.value;

                    assertNotUndefined(parsedLatex[index + 1], 'Missing argument in function: ' + func);
                    expression += func;
                    index++;

                    if (parsedLatex[index].type === 'group') {
                        expression += transpiler(parsedLatex[index].value);
                        index++;

                    } else if (parsedLatex[index].type === 'function') {
                        let { expressionLength } = getExpressionLength(parsedLatex.slice((index + 1)), ['function'], ['+', '-', '+-']);
                        expressionLength += 1;

                        expression += transpiler(wrapForTranspilation(parsedLatex.slice(index, (index + expressionLength))));
                        index += expressionLength - 1;

                    } else {
                        let latexSlice = parsedLatex.slice(index);

                        let i;
                        for (i = 0; i < latexSlice.length; i++) {
                            if (latexSlice[i].type !== 'variable' && latexSlice[i].type !== 'number') {
                                break;
                            }
                        }

                        let expressionLength = i;
                        expression += transpiler(wrapForTranspilation(parsedLatex.slice(index, (index + expressionLength))));
                        index += expressionLength - 1;
                    }

                    transpiledString += expression;
                }

                function handleTrig() {
                    let expression = '';
                    let exponentiate = false;
                    let exponent;

                    let func = item.value;

                    assertNotUndefined(parsedLatex[index + 1], 'Missing argument in function: ' + func);

                    if (parsedLatex[index + 1].value === '^') {
                        exponentiate = true;
                        assertNotUndefined(parsedLatex[index + 2], 'Missing argument in function: ' + func + '^');

                        exponent = transpiler(wrapForTranspilation(parsedLatex[index + 2]));
                        exponent = stripParenthesis(exponent);

                        if (stripAllParenthesis(exponent) === '-1') {
                            debug('Function is inverse');
                            exponentiate = false;

                            let inverseFunc = getInverseTrigonometricFunction(func);
                            if (inverseFunc !== null) {
                                func = inverseFunc;
                            } else {
                                throw new Error('No inverse trigonometric function found for ' + func);
                            }
                        }
                        index += 2;
                    }

                    expression += func;

                    if (exponentiate) {
                        assertNotUndefined(parsedLatex[index + 1],
                            'Missing argument in function: ' + func + '^' + transpiler(wrapForTranspilation(parsedLatex[index])));
                    } else {
                        assertNotUndefined(parsedLatex[index + 1], 'Missing argument in function: ' + func);
                    }

                    if (parsedLatex[index + 1].type === 'group') {
                        expression += transpiler(parsedLatex[index + 1].value);
                        index++;

                    } else if (parsedLatex[index + 1].type === 'function') {
                        let { expressionLength } = getExpressionLength(parsedLatex.slice((index + 2)), ['function'], ['+', '-', '+-']);
                        expressionLength += 1;

                        expression += transpiler(
                            wrapForTranspilation(parsedLatex.slice((index + 1), ((index + 1) + expressionLength))));
                        index += expressionLength - 1;

                    } else {
                        let { expressionLength } = getExpressionLength(parsedLatex.slice((index + 1)), ['function'], ['+', '-', '+-']);
                        expression += transpiler(
                            wrapForTranspilation(parsedLatex.slice((index + 1), ((index + 1) + expressionLength))));
                        index += expressionLength - 1;
                    }

                    if (exponentiate) {
                        expression = '(' + expression + ')' + '^' + exponent;
                    }

                    index++;

                    transpiledString += expression;
                }

                function handleAbs() {
                    let expression = '';
                    let func = item.value;
                    expression += func;
                    expression += transpiler(wrapForTranspilation(parsedLatex[index + 1]));

                    index++;

                    transpiledString += expression;

                }

                function handleBinomial() {
                    // TODO doesn't handle \binom234 as 2 and 3 needs to be parsed as single digits... this is a parser problem...
                    let binomialString = '';
                    let expression1 = '';
                    let expression2 = '';

                    let expr1 = parsedLatex[index + 1].type;
                    let expr2 = parsedLatex[index + 2].type;

                    if (expr1 === 'group' && expr2 === 'group') {
                        expression1 += transpiler(parsedLatex[index + 1].value);
                        expression2 += transpiler(parsedLatex[index + 2].value);
                    } else {
                        throw new Error('Binomial must have 2 following groups');
                    }

                    binomialString += buildMaximaFunctionString(
                        'binomial', expression1, expression2,
                    );

                    transpiledString += binomialString;
                    index += 2;
                }

                function handleLimit() {
                    // TODO: review: first arg in limit isn't recognized if it is a multi char variable and onlySingleVariables option
                    // is true

                    let limitString = '';
                    let expression = '';

                    if (parsedLatex[index + 1].value === '_' && parsedLatex[index + 2].type === 'group') {
                        let limitArgs = parsedLatex[index + 2].value;
                        limitArgs = handleLimitArguments(limitArgs);

                        if (typeof parsedLatex[index + 3] !== 'undefined') {
                            let { expressionLength: limitLength } = getExpressionLength(parsedLatex.slice((index + 3)), [],
                                ['+', '-', '+-']);

                            expression += transpiler(parsedLatex.slice((index + 3), ((index + 3) + limitLength)));
                            index += (limitLength - 1);

                        } else {
                            throw new Error('Missing argument in limit');
                        }

                        limitString = buildMaximaFunctionString(
                            'limit', expression, limitArgs.variable, limitArgs.value, limitArgs.direction,
                        );

                        index += 3;

                    } else {
                        throw new Error('Limit must have a "from" and "to" value');
                    }
                    transpiledString += limitString;
                }

                function handleSum() {
                    let sumString = '';
                    let expression = '';
                    let lowerArgAssignment, upperArg;
                    let indexVariable = '';

                    if (parsedLatex[index + 1].value !== '_' && parsedLatex[index + 1].value !== '^') {
                        throw new Error('Sum does not contain the correct number of arguments');

                    } else {
                        let integrationLimits = handleUpperAndLowerArgsSum(parsedLatex.slice((index + 1)));
                        let lowerArg = integrationLimits.lowerLimit.value;
                        upperArg = integrationLimits.upperLimit;
                        index += 4;

                        lowerArg = handleLowerSumArguments(lowerArg);
                        indexVariable = lowerArg.variable;
                        lowerArgAssignment = lowerArg.value;

                        debug('Sum: arguments are form ' + lowerArgAssignment + ' to ' + upperArg);
                    }

                    if (typeof parsedLatex[index + 1] !== 'undefined') {
                        let { expressionLength: sumLength } = getExpressionLength(parsedLatex.slice((index + 1)), [], ['+', '-', '+-']);

                        expression += transpiler(parsedLatex.slice((index + 1), ((index + 1) + sumLength)));
                        index += (sumLength);

                    } else {
                        throw new Error('Missing argument in sum');
                    }

                    sumString += buildMaximaFunctionString(
                        'sum', expression, indexVariable, lowerArgAssignment, upperArg,
                    );

                    transpiledString += sumString;
                }

                function handleIntegral() {
                    let integralString = '';
                    let expression = '';
                    let lowerLimit, upperLimit;
                    let integrationVariable = '';
                    let integralLength;
                    let isSymbolic = false;

                    assertNotUndefined(parsedLatex[index + 1], 'Missing argument in integral');

                    if (parsedLatex[index + 1].value !== '_' && parsedLatex[index + 1].value !== '^') {
                        // Symbolic integral
                        debug('Integral is symbolic');
                        isSymbolic = true;

                        index++;

                    } else {
                        // Finite integral
                        let integralArgs = parsedLatex.slice(index + 1, index + 5);
                        let integrationLimits = handleUpperAndLowerArgs(integralArgs);
                        lowerLimit = integrationLimits.lowerLimit;
                        upperLimit = integrationLimits.upperLimit;
                        debug('Integration limits are from ' + lowerLimit + ' to ' + upperLimit);

                        index += 5;
                    }

                    let integralEnd = findIntegralEnd(parsedLatex.slice(index));

                    integrationVariable += integralEnd.variable;
                    integralLength = integralEnd.length;

                    let unTranspiledIntegralLatex = parsedLatex.slice((index), ((index) + integralLength));
                    assertNotUndefined(unTranspiledIntegralLatex[unTranspiledIntegralLatex.length - 1], 'Missing argument in integral');

                    if (unTranspiledIntegralLatex[unTranspiledIntegralLatex.length - 1].value === '*') {
                        unTranspiledIntegralLatex.splice(-1, 1);
                    }

                    expression += transpiler(unTranspiledIntegralLatex);

                    index += (integralLength);

                    if (isSymbolic) {
                        integralString += buildMaximaFunctionString(
                            'integrate', expression, integrationVariable,
                        );

                    } else {
                        integralString += buildMaximaFunctionString(
                            'integrate', expression, integrationVariable, lowerLimit, upperLimit,
                        );

                    }

                    transpiledString += integralString;
                }

            }

            function doEnvironment() {
                if (item.state === 'begin') {

                    addTimesSign(index, { type: 'operator' });

                    let expression = '';
                    let envLength = environmentLength(parsedLatex.slice((index)));

                    if (item.value === 'matrix') {
                        debug('Found matrix environment');
                        expression += handleMatrix(parsedLatex.slice((index + 1), (index + 1) + envLength));
                    }

                    index += (envLength + 1);
                    transpiledString += expression;

                } else if (item.state === 'end') {
                    index++;
                }
            }
        }

        transpiledString += ')';

        if (/(\([ ]*\))/.test(transpiledString)) {
            throw new Error('Syntax error');
        }

        if (transpiledString === '') {
            throw new Error('EMPTY');
        } //TODO FIX, possibly remove

        return transpiledString;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2019 NTNU
     */

    function postParse(parsedLatex) {
        debug('\n------------------ POST PARSING -> -------------------');
        const options = getOptions();

        let index = 0;
        let structure = [];

        for (index; index < parsedLatex.length; index++) {
            const item = parsedLatex[index];

            debug('--------- Parsing next token\' ---------');

            let node = parseExpression();
            if (node === null) {
                continue;
            }

            if (node === undefined) {
                index = parsedLatex.length;

                throw new Error('node is undefined');
            }

            addNode(node);

            let types = '';
            if (checkArray(node)) {
                node.forEach(e => {
                    types += e.type + ' + ';
                });
                types = types.substr(0, types.length - 3);
            }
            else {
                types = node.type;
            }

            debug('Parsed result type(s): ' + types + '.');
        }

        function parseExpression() {
            let node = null;
            const item = getCurrentItem();
            const value = getCurrentValue();
            const type = getCurrentType();

            switch (type) {

                case 'delimiter':
                    debug('Found delimiter \"' + value + '\"');
                    node = parseDelimiter();
                    break;
                case 'opening_bracket':
                    debug('Found bracket \"' + value + '\"');
                    node = parseGroup();
                    break;
                case 'number':
                    debug('Found number  \"' + value + '\"');
                    node = parseNumber();
                    break;
                default:
                    node = item;
                    break;
            }

            return node;
        }

        function addNode(obj) {
            if (checkArray(obj)) {
                structure.push(...obj);
            }
            else {
                structure.push(obj);

            }
        }

        function checkArray(value) {
            return value && typeof value === 'object' && value.constructor ===
                Array;
        }

        function getCurrentItem() {
            return parsedLatex[index] ? parsedLatex[index] : undefined;
        }

        function getCurrentValue() {
            return parsedLatex[index] ? parsedLatex[index].value : undefined;
        }

        function getCurrentType() {
            return parsedLatex[index].type;
        }

        function peekItem(position) {
            if (typeof parsedLatex[index + position] === 'undefined') {
                return null;
            }
            return parsedLatex[index + position];
        }

        function peekType(position) {
            if (typeof parsedLatex[index + position] === 'undefined') {
                return null;
            }
            return parsedLatex[index + position].type;
        }

        function peekValue(position) {
            if (typeof parsedLatex[index + position] === 'undefined') {
                return null;
            }
            return parsedLatex[index + position].value;
        }

        function parseGroup() {
            let groupName = getCurrentItem().symbol;
            let length = matchingBracketLength(parsedLatex.slice(index), null, groupName);

            if (length instanceof Error) return length;

            const newItems = parsedLatex.slice(index + 1, index + (length));
            debug('New group created2');

            index += length;

            return {
                type: 'group',
                symbol: groupName,
                value: postParse(newItems),
            };
        }

        function parseNumber() {
            let node;

            if (peekType(1) === 'decimal_separator') {
                node = parseFloat();
            } else {
                node = getCurrentItem();
            }
            return node;
        }

        function parseFloat() {
            let node;
            let float;

            if (decimalSeparatorQuantityInNumber() > 1) {
                throw new Error('Only one decimal separator is allowed');
            }

            if (peekType(2) === 'number') {
                debug("- Found fractional part decimal part\"" + getCurrentValue() + "\", continuing parsing");
                let decimal_separator = peekValue(1);
                float = getCurrentValue() + decimal_separator + peekValue(2);

            } else {
                throw new Error('Trailing decimal separator isn\'t allowed');
            }
            index += 2;

            node = {
                type: 'number',
                value: float,
            };
            return node;
        }

        function decimalSeparatorQuantityInNumber() {
            let i = 0;
            let isNumber = true;
            let quantity = 0;
            while (isNumber) {
                if (peekType(i) === 'decimal_separator') {
                    quantity++;
                } else if (peekType(i) !== 'number') {
                    isNumber = false;
                }
                i++;
            }
            return quantity;
        }

        function parseDelimiter() {
            let nodes = null;
            let node, groupNode;

            const item = getCurrentItem();
            const value = getCurrentValue();

            const type = peekType(1);
            switch (type) {
                case 'vertical_bar':
                    debug('Found vertical_bar \"' + value + '\"');
                    node = parseVerticalBar();
                    break;
                default:
                    break;
            }

            groupNode = createGroup();

            nodes = [node, groupNode];
            nodes = nodes.filter(function (el) {
                return el != null;
            });

            return nodes;
        }

        function parseVerticalBar() {
            let node = null;
            let functionName = 'abs';
            let func = getFunctionName(functionName);

            node = {
                type: 'function',
                value: func,
            };

            return node;
        }

        function createGroup() {
            const delimiter = getCurrentValue();
            const type = peekType(1);
            const value = peekValue(1);
            let length = findGroupLength(parsedLatex.slice(index), delimiter,
                value);

            if (length instanceof Error) {
                return length;
            }

            const newItems = parsedLatex.slice(index + 2, index + (length));
            debug('New group created');

            index += length;

            return {
                type: 'group',
                symbol: type,
                value: postParse(newItems),
            };
        }

        /**
         * Will find the length to the matching delimeter and symbol in provided
         * items array
         * @param  {Object} items An array of parsed latex, starting
         *     from where the search should begin
         * @param  {string} symbol The symbol to search for.
         * @return {number} The length from start of provided items
         *     array, to the location of the matched symbol bracket
         */
        function findGroupLength(items, delimiter, symbol) {
            debug('Finding matching symbols');

            let depth = 0;
            const startDelimiter = delimiter;
            const endDelimiter = DELIMITERS.get(delimiter);
            let nextItemType = peekType(1);
            let nextItemValue = peekValue(1);
            let nextItem = peekItem(1);

            if (nextItemType === 'opening_bracket') {
                return matchingBracketLength(items,
                    delimiter, nextItem.symbol);
            }

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                nextItemType = items[i + 1] ? items[i + 1].type : '';
                nextItemValue = items[i + 1] ? items[i + 1].value : '';

                debug('-- Item:' + item.value);

                if (item.type === 'delimiter' && item.value === startDelimiter &&
                    nextItemValue === symbol) {
                    depth++;
                    debug('-- Found starting point, depth ' + depth);
                }
                else if (item.type === 'delimiter' && item.value === endDelimiter &&
                    nextItemValue === symbol) {
                    if (depth === 1) {
                        debug(
                            '-- Found end of symbol group at position ' + i);
                        return i;
                    }
                    depth--;
                    debug('-- Found closing point, depth ' + depth);
                }

            }
            throw new Error(
                '"' + delimiter + symbol + '"' + ' symbols does not match up');
        }

        /**
         * Will find the length to the matching bracket, in provided tokens array
         * @param  {Object} items       An array of tokens, starting from where
         *     the search should begin
         * @param  {string} bracketType The type of bracket to search for.
         *                                  Can be one of the following ['normal',
         *     'curly', 'square']
         * @return {number}             The length from start of provided tokens
         *     array, to the location of the matching bracket
         */
        function matchingBracketLength(items, delimiter, bracketType) {
            debug('Finding matching bracket');

            let startBracket = '';
            let endBracket = '';
            const startDelimiter = delimiter;
            const endDelimiter = DELIMITERS.get(delimiter);
            let nextItemType = peekType(1);
            let nextItemValue = peekValue(1);

            switch (bracketType) {
                case 'normal':
                    startBracket = '(';
                    endBracket = ')';
                    break;
                case 'curly':
                    startBracket = '{';
                    endBracket = '}';
                    break;
                case 'square':
                    startBracket = '[';
                    endBracket = ']';
                    break;
            }

            let bracketDepth = 0;

            if (delimiter) {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    nextItemType = items[i + 1] ? items[i + 1].type : '';
                    nextItemValue = items[i + 1] ? items[i + 1].value : '';

                    debug('-- Char:' + item.value);

                    if (item.type === 'delimiter' && item.value ===
                        startDelimiter &&
                        nextItemValue === startBracket) {
                        bracketDepth++;
                        debug(
                            '-- Found starting bracket, depth ' + bracketDepth);
                    }
                    else if (item.type === 'delimiter' && item.value ===
                        endDelimiter &&
                        nextItemValue === endBracket) {
                        if (bracketDepth === 1) {
                            debug(
                                '-- Found original closing bracket at position ' +
                                i);
                            return i;
                        }

                        bracketDepth--;
                        debug(
                            '-- Found closing bracket, depth ' + bracketDepth);
                    }
                }
            }
            else {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    debug('-- Char:' + item.value);

                    if (item.value === startBracket) {
                        bracketDepth++;
                        debug(
                            '-- Found starting bracket, depth ' + bracketDepth);
                    }
                    else if (item.value === endBracket) {
                        if (bracketDepth === 1) {
                            debug(
                                '-- Found original closing bracket at position ' +
                                i);
                            return i;
                        }

                        bracketDepth--;
                        debug(
                            '-- Found closing bracket, depth ' + bracketDepth);
                    }
                }
            }

            throw new Error('Brackets do not match up');
        }

        return structure;
    }

    /**
     * @author     André Storhaug <andr3.storhaug@gmail.com>
     * @copyright  2018 NTNU
     */


    /********************************************************
     * The publicly exposed tex2max API.
     ********************************************************/


    /**
     * Globally exported API class.
     * Represents a TeX2Max class for handling translation/transpilation of LaTeX to Maxima code.
     * @param  {Object} userOptions Optional options
     */
    class TeX2Max {

        constructor(userOptions) {
            setOptions(userOptions);
            this.options = getOptions();

            this.lastInput = "";
            this.lastResult = "";
        }

        /**
         * Gets the last latex input.
         * @returns {string}
         */
        getLastInput() {
            return this.lastInput()
        }

        /**
         * Gets the last conversion result.
         * @returns {string} the last conversion result (Maxima code)
         */
        getLastResult() {
            return this.lastResult;
        }

        /**
         * Updates the TeX2Max options. If one or more settings passed as parameter are missing,
         * defaults defined in {@link DEFAULTS} will be used
         * @param userOptions
         */
        updateOptions(userOptions) {
            setOptions(userOptions);
            this.options = getOptions();
        }

        /**
         * Converts a latex input string to Maxima code.
         * @param  {String} latex The latex to parse
         * @returns {*}
         */
        toMaxima(latex) {
            setOptions(this.options);
            let maximaExpression;

            this.lastInput = latex;

            let scannerResult = scan(latex);
            debug(scannerResult);

            let lexerResult = lex(scannerResult);
            debug(lexerResult);

            let parsedLatex = parseLatex(lexerResult);
            debug(parsedLatex);

            this.structure = postParse(parsedLatex);
            debug(this.structure);

            let transpiledExpression = transpiler(this.structure);
            maximaExpression = stripParenthesis(transpiledExpression);

            // Handle equation
            if (this.options.handleEquation && isEquation(this.structure)) {
                maximaExpression = 'solve(' + maximaExpression + ')';
            }

            this.lastResult = maximaExpression;

            return maximaExpression;
        }
    }

    return TeX2Max;

}

let tex2max = __tex2max(); 
