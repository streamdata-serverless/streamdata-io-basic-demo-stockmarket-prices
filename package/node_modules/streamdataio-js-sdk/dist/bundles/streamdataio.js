(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("streamdataio", [], factory);
	else if(typeof exports === 'object')
		exports["streamdataio"] = factory();
	else
		root["streamdataio"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , core      = __webpack_require__(16)
  , hide      = __webpack_require__(9)
  , redefine  = __webpack_require__(20)
  , ctx       = __webpack_require__(52)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(7)
  , defined = __webpack_require__(2)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(14)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(35)('wks')
  , uid        = __webpack_require__(26)
  , Symbol     = __webpack_require__(3).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonHelper_1 = __webpack_require__(27);
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = (function () {
    function Logger() {
    }
    /**
     * @memberOf Logger#
     * @param {number} newlevel
     */
    Logger.setLevel = function (newLevel) {
        this._level = newLevel;
    };
    Logger.debug = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level >= LogLevel.DEBUG && this._console && this._console.log) {
            this._console.log(this._formatLog(msg, args));
        }
    };
    Logger.info = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level >= LogLevel.INFO && this._console && this._console.info) {
            this._console.info(this._formatLog(msg, args));
        }
    };
    Logger.warn = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level >= LogLevel.WARN && this._console && this._console.warn) {
            this._console.warn(this._formatLog(msg, args));
        }
    };
    Logger.error = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level >= LogLevel.ERROR && this._console && this._console.error) {
            this._console.error(this._formatLog(msg, args));
        }
    };
    /**
     * @private
     * @memberOf Logger#
     */
    Logger._formatLog = function (pattern, args) {
        return pattern.replace ? pattern.replace(/{(\d+)}/g, function (match, index) {
            var replaced;
            if (args[index] && typeof args[index] === 'object' && args[index] instanceof Error) {
                try {
                    replaced = args[index]['message'];
                    if (args[index]['stack']) {
                        console.error(args[index]['stack']);
                    }
                }
                catch (error) {
                    replaced = args[index];
                }
            }
            else if (args[index] && typeof args[index] === 'object') {
                try {
                    if (args[index].toString !== Object.prototype.toString) {
                        replaced = args[index].toString();
                    }
                    else {
                        replaced = jsonHelper_1.JsonHelper.stringify(args[index]);
                    }
                }
                catch (error) {
                    replaced = args[index];
                }
            }
            else if (args[index] && typeof args[index] === 'function') {
                replaced = 'function';
            }
            else if (args[index]) {
                replaced = args[index];
            }
            else {
                replaced = match;
            }
            var replacedString = '' + replaced;
            return replacedString.substring(0, Math.min(500, replacedString.length));
        }) : pattern;
    };
    return Logger;
}());
/**
 * @private
 * @memberOf Logger#
 */
Logger._console = console;
/**
 * @private
 * @memberOf Logger#
 */
Logger._level = LogLevel.INFO;
exports.Logger = Logger;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(19)
  , createDesc = __webpack_require__(32);
module.exports = __webpack_require__(11) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(9)
  , redefine = __webpack_require__(20)
  , fails    = __webpack_require__(7)
  , defined  = __webpack_require__(2)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(6);
var Preconditions = (function () {
    function Preconditions() {
    }
    /**
     * @memberOf Preconditions#
     * check if the value is not null
     * @param {*} value
     * @param {string} message
     */
    Preconditions.checkNotNull = function (value, message) {
        if (typeof value === 'undefined' || value === null) {
            if (message) {
                throw new Error(message);
            }
            else {
                throw new Error('value cannot be null');
            }
        }
        return value;
    };
    /**
     * @memberOf Preconditions#
     * log deprecated warning
     * @param {string} functionName
     * @param {string} message
     */
    Preconditions.deprecated = function (functionName, message) {
        this.checkNotNull(functionName, 'functionName cannot be null');
        this.checkNotNull(message, 'message cannot be null');
        logger_1.Logger.warn('\'{0}\' is deprecated because \'{1}\'.', functionName, message);
    };
    /**
     * @memberOf Preconditions#
     * check is the provided expression is true
     * @param {*} expression
     * @param {string} message
     */
    Preconditions.checkExpression = function (expression, message) {
        if (!expression) {
            if (message) {
                throw new Error(message);
            }
            else {
                throw new Error('expression is not valid');
            }
        }
    };
    return Preconditions;
}());
exports.Preconditions = Preconditions;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(13)
  , cof      = __webpack_require__(28)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(55)
  , toPrimitive    = __webpack_require__(67)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , hide      = __webpack_require__(9)
  , has       = __webpack_require__(8)
  , SRC       = __webpack_require__(26)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(16).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys')
  , uid    = __webpack_require__(26);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14)
  , defined   = __webpack_require__(2);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(18)
  , defined  = __webpack_require__(2);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(2)
  , fails   = __webpack_require__(7)
  , spaces  = __webpack_require__(65)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(56)
  , defined = __webpack_require__(2);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonHelper = (function () {
    function JsonHelper() {
    }
    JsonHelper.validate = function (stringObj) {
        try {
            JsonHelper.parse(stringObj);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    JsonHelper.parse = function (stringObj) {
        try {
            return JSON.parse(stringObj);
        }
        catch (err) {
            return stringObj;
        }
    };
    JsonHelper.stringify = function (obj) {
        return obj ? JSON.stringify(obj) : 'undefined';
    };
    return JsonHelper;
}());
exports.JsonHelper = JsonHelper;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13)
  , document = __webpack_require__(3).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(60)
  , descriptor     = __webpack_require__(32)
  , setToStringTag = __webpack_require__(34)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(19).f
  , has = __webpack_require__(8)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(4)
  , repeat   = __webpack_require__(37)
  , defined  = __webpack_require__(2);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(14)
  , defined   = __webpack_require__(2);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var preconditions_1 = __webpack_require__(15);
var logger_1 = __webpack_require__(6);
var streamData_1 = __webpack_require__(48);
/**
 * Streamdata.io JavaScript SDK
 */
var StreamDataIo = (function () {
    function StreamDataIo() {
    }
    /**
     * <p>Create a new instance of the <code>StreamDataEventSource</code> prototype.</p>
     *
     * <p>The <code>StreamDataEventSource</code> is the main entry point for establishing Server Sent Event connection to a targeted JSON REST service URL.</p>
     *
     * @param {String} url Mandatory. The targeted REST URL is formatted as follow:
     * <pre><code>protocol://url(:port)(/localpath(?queryparameters))</code></pre>
     *
     * @param {String} token Mandatory. The application token to authentify the request
     *
     * @param {Array} headers Optional. Any specific headers that have to be added to the request. It must be an array with the following structure:<code>['Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==']</code>
     *
     * @param {Object} authStrategy Optional. An object which will enable HMAC signature of the request. You can create this object as follow:
     * <pre><code>
     * // setup headers
     * var headers = [];
     * // setup signatureStrategy
     * var signatureStrategy = AuthStrategy.newSignatureStrategy('NmEtYTljN2UtYmM1MGZlMGRiNGFQzYS00MGRkLTkNTZlMDY1','NTEtMTQxNiWIzMDEC00OWNlLThmNGYtY2ExMDJxO00NzNhLTgtZWY0MjOTc2YmUxODFiZDU1NmU0ZDAtYWU5NjYxMGYzNDdi');
     * // instantiate an eventSource
     * var eventSource = streamdataio.createEventSource('http://myRestservice.com/stocks','NmEtYTljN2UtYmM1MGZlMGRiNGFQzYS00MGRkLTkNTZlMDY1',headers,signatureStrategy);
     *
     * </code></pre>
     * @returns {StreamDataEventSource}
     */
    StreamDataIo.createEventSource = function (url, appToken, headers, authStragety) {
        preconditions_1.Preconditions.checkNotNull(url, 'url cannot be null');
        if (!(url.lastIndexOf('http://', 0) === 0)
            && !(url.lastIndexOf('https://', 0) === 0)) {
            // if no valid protocol provided for url then add default (http://)
            url = 'http://' + url;
            logger_1.Logger.warn('url has no default protocol defined. Add http:// as a default protocol.');
        }
        return new streamData_1.StreamData(url, appToken, headers, authStragety);
    };
    return StreamDataIo;
}());
exports.StreamDataIo = StreamDataIo;
exports.createEventSource = StreamDataIo.createEventSource;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(88);
__webpack_require__(95);
__webpack_require__(86);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(84);
__webpack_require__(89);
__webpack_require__(91);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
__webpack_require__(73);
__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(80);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(85);
__webpack_require__(87);
__webpack_require__(90);
__webpack_require__(92);
__webpack_require__(93);
__webpack_require__(94);
__webpack_require__(96);
__webpack_require__(99);
__webpack_require__(98);
__webpack_require__(100);
__webpack_require__(101);
__webpack_require__(97);
__webpack_require__(68);
__webpack_require__(69);
module.exports = __webpack_require__(16).String;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/*
   * CommonJS module that exports EventSource polyfill version 0.9.7
   * This module is intended for browser side use
   * =====================================================================
   * THIS IS A POLYFILL MODULE, SO IT HAS SIDE EFFECTS
   * IT AUTOMATICALLY CHECKS IF window OBJECT DEFINES EventSource
   * AND ADD THE EXPORTED ONE IN CASE IT IS UNDEFINED
   * =====================================================================
   * Supported by sc AmvTek srl
   * :email: devel@amvtek.com
 */


var PolyfillEventSource = __webpack_require__(102).EventSource;
module.exports = PolyfillEventSource;

// Add EventSource to window if it is missing...
if (window && !window.EventSource){
    window.EventSource = PolyfillEventSource;
    // Don't break IE < 10
    if (typeof console !== "undefined" && typeof console.log !== "undefined"){
        console.log("polyfill-eventsource added missing EventSource to window");
    }
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var streamDataServer_1 = __webpack_require__(46);
exports.DefaultStreamDataServer = new streamDataServer_1.StreamDataServer('https', 'streamdata.motwin.net');


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StreamDataError = (function () {
    function StreamDataError(type, message, status, source, original) {
        this.type = type;
        this.message = message;
        this.status = status;
        this.original = original;
        this.source = source ? source : 'server';
    }
    StreamDataError.createDefault = function (original) {
        return new StreamDataError(StreamDataError.DEFAULT_TYPE, StreamDataError.DEFAULT_MESSAGE, StreamDataError.DEFAULT_STATUS, StreamDataError.DEFAULT_SOURCE, original);
    };
    Object.defineProperty(StreamDataError.prototype, "isServer", {
        /**
         * @memberOf StreamdataError#
         * @return {boolean} true if error is from server side.
         */
        get: function () {
            return this.source === 'server';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamDataError.prototype, "isClient", {
        /**
         * @memberOf StreamdataError#
         * @return {boolean} true if error is from client side.
         */
        get: function () {
            return this.source === 'client';
        },
        enumerable: true,
        configurable: true
    });
    return StreamDataError;
}());
StreamDataError.DEFAULT_TYPE = 'UnknownError';
StreamDataError.DEFAULT_MESSAGE = 'An error occured. Please check your console logs for more details.';
StreamDataError.DEFAULT_STATUS = 1000;
StreamDataError.DEFAULT_SOURCE = 'server';
exports.StreamDataError = StreamDataError;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var preconditions_1 = __webpack_require__(15);
var logger_1 = __webpack_require__(6);
var Listeners = (function () {
    function Listeners() {
        this._listeners = [];
    }
    /**
     * @memberOf Listeners#
     */
    Listeners.prototype.fire = function (data) {
        var listeners = this._listeners.slice(); // copy to prevent concurrent modifications
        listeners.forEach(function (listener) {
            var callback = listener.callback;
            var context = listener.context;
            if (callback) {
                try {
                    if (context) {
                        callback.apply(context, [data]);
                    }
                    else {
                        callback(data);
                    }
                }
                catch (error) {
                    logger_1.Logger.error('Unable to forward event: {0}', error);
                }
            }
        });
    };
    /**
     * @memberOf Listeners#
     * @param callback
     * @param context
     */
    Listeners.prototype.add = function (callback, context) {
        var listener = {
            callback: callback,
            context: context
        };
        preconditions_1.Preconditions.checkNotNull(listener, 'listener cannot be null');
        preconditions_1.Preconditions.checkExpression(this._listeners.indexOf(listener) === -1, 'listener already exists');
        this._listeners.push(listener);
    };
    /**
     * @memberOf Listeners#
     * @param callback
     * @param context
     */
    Listeners.prototype.remove = function (callback, context) {
        var listener = {
            callback: callback,
            context: context
        };
        preconditions_1.Preconditions.checkNotNull(listener, 'listener cannot be null');
        var indexOf = this._listeners.indexOf(listener);
        preconditions_1.Preconditions.checkExpression(indexOf >= 0, 'listener not exists');
        this._listeners.splice(indexOf, 1);
    };
    return Listeners;
}());
exports.Listeners = Listeners;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(6);
var jsonHelper_1 = __webpack_require__(27);
if (false) {
    var EventSource = require('eventsource');
}
else {
    var EventSource = window && window.EventSource;
}
// ************************************
var StreamDataEventSource = (function () {
    function StreamDataEventSource(url) {
        this._sse = new EventSource(url);
    }
    StreamDataEventSource.prototype.close = function () {
        if (this._sse && (this._sse.readyState === EventSource.OPEN || this._sse.readyState === EventSource.CONNECTING)) {
            logger_1.Logger.info('Closing the SSE Stream.');
            this._sse.close();
        }
    };
    StreamDataEventSource.prototype.addOpenListener = function (onOpenCallback, context) {
        this._sse.addEventListener(EventType.OPEN, function () {
            if (context) {
                onOpenCallback.apply(context, [{}]);
            }
            else {
                onOpenCallback({});
            }
        });
    };
    StreamDataEventSource.prototype.addErrorListener = function (onErrorCallback, context) {
        this._sse.addEventListener(EventType.ERROR, function (messageEvent) {
            var error = messageEvent ? jsonHelper_1.JsonHelper.parse((messageEvent.data)) : null;
            if (context) {
                onErrorCallback.apply(context, [{ error: error }]);
            }
            else {
                onErrorCallback({ error: error });
            }
        });
    };
    StreamDataEventSource.prototype.addDataListener = function (onDataCallback, context) {
        this._sse.addEventListener(EventType.DATA, function (messageEvent) {
            var data = messageEvent ? jsonHelper_1.JsonHelper.parse((messageEvent.data)) : null;
            if (context) {
                onDataCallback.apply(context, [{ data: data }]);
            }
            else {
                onDataCallback({ data: data });
            }
        });
    };
    StreamDataEventSource.prototype.addPatchListener = function (onPatchCallback, context) {
        this._sse.addEventListener(EventType.PATCH, function (messageEvent) {
            var patch = messageEvent ? jsonHelper_1.JsonHelper.parse((messageEvent.data)) : null;
            if (context) {
                onPatchCallback.apply(context, [{ patch: patch }]);
            }
            else {
                onPatchCallback({ patch: patch });
            }
        });
    };
    StreamDataEventSource.prototype.addMonitorListener = function (onMonitorCallback, context) {
        this._sse.addEventListener(EventType.MONITOR, function (messageEvent) {
            var monitor = messageEvent ? jsonHelper_1.JsonHelper.parse((messageEvent.data)) : null;
            if (context) {
                onMonitorCallback.apply(context, [{ data: monitor }]);
            }
            else {
                onMonitorCallback({ data: monitor });
            }
        });
    };
    StreamDataEventSource.prototype.isConnected = function () {
        return this._sse.readyState === EventSource.OPEN;
    };
    return StreamDataEventSource;
}());
exports.StreamDataEventSource = StreamDataEventSource;
var EventType = (function () {
    function EventType() {
    }
    return EventType;
}());
EventType.OPEN = 'open';
EventType.ERROR = 'error';
EventType.DATA = 'data';
EventType.PATCH = 'patch';
EventType.MONITOR = 'monitor';
exports.EventType = EventType;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var urlHelper_1 = __webpack_require__(49);
var StreamDataServer = (function () {
    function StreamDataServer(protocol, hostname, port) {
        this.protocol = protocol;
        this.hostname = hostname;
        this.port = port;
    }
    StreamDataServer.prototype.toString = function () {
        return urlHelper_1.UrlHelper.urlToString(this.protocol, this.hostname, this.port);
    };
    StreamDataServer.prototype.getFullUrl = function (clientUrl) {
        return this.toString() + "/" + clientUrl.toString();
    };
    return StreamDataServer;
}());
exports.StreamDataServer = StreamDataServer;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StreamDataUrl = (function () {
    function StreamDataUrl(url, token, headers) {
        // Sanitize client url
        this.clientUrl = url;
        // Build stream data query from header
        var streamDataQuery = headers ? headers.map(function (header) {
            return StreamDataUrl.X_SD_HEADER + "=" + encodeURIComponent(header);
        }) : [];
        streamDataQuery.push(StreamDataUrl.X_SD_TOKEN + "=" + encodeURIComponent(token));
        // Add stream data query to target url
        if (streamDataQuery.length > 0) {
            this.clientUrl += (this.clientUrl.indexOf('?') === -1) ? '?' : '&';
            this.clientUrl += streamDataQuery.join('&');
        }
    }
    StreamDataUrl.prototype.toString = function () {
        return this.clientUrl;
    };
    return StreamDataUrl;
}());
StreamDataUrl.X_SD_HEADER = 'X-Sd-Header';
StreamDataUrl.X_SD_TOKEN = 'X-Sd-Token';
exports.StreamDataUrl = StreamDataUrl;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var streamDataEventSource_1 = __webpack_require__(45);
var listeners_1 = __webpack_require__(44);
var preconditions_1 = __webpack_require__(15);
var logger_1 = __webpack_require__(6);
var config_1 = __webpack_require__(42);
var streamDataError_1 = __webpack_require__(43);
var streamDataUrl_1 = __webpack_require__(47);
var StreamData = (function () {
    function StreamData(url, appToken, headers, authStragety) {
        // Build internal configuration
        preconditions_1.Preconditions.checkNotNull(url, 'url cannot be null.');
        preconditions_1.Preconditions.checkNotNull(appToken, 'appToken cannot be null.');
        this._url = url;
        this._token = appToken;
        this._headers = headers ? headers : [];
        this._authStrategy = authStragety;
        // Init listeners
        this._openListeners = new listeners_1.Listeners();
        this._dataListeners = new listeners_1.Listeners();
        this._patchListeners = new listeners_1.Listeners();
        this._errorListeners = new listeners_1.Listeners();
        this._monitorListeners = new listeners_1.Listeners();
        // SSE
        this._sse = null;
        this.server = config_1.DefaultStreamDataServer;
    }
    StreamData.prototype.open = function () {
        preconditions_1.Preconditions.checkNotNull(this._url, 'url cannot be null');
        this._sse && this.close();
        var decoratedUrl = this._decorate(this._url, this._headers);
        if (decoratedUrl) {
            this._sse = new streamDataEventSource_1.StreamDataEventSource(decoratedUrl);
            this._sse.addOpenListener(function (event) {
                logger_1.Logger.debug('SSE Stream Opened to ' + this._url + 'event: ' + event);
                this._openListeners.fire();
            }, this);
            this._sse.addErrorListener(function (event) {
                if (event.error) {
                    this._errorListeners.fire(StreamData._buildErrorMessage(event.error));
                }
                else {
                    logger_1.Logger.info('SSE server connection lost, retrying ...');
                }
            }, this);
            this._sse.addDataListener(function (event) {
                logger_1.Logger.debug('Received data:' + event.data);
                this._dataListeners.fire(event.data);
            }, this);
            this._sse.addPatchListener(function (event) {
                logger_1.Logger.debug('Received patch:' + event.patch);
                this._patchListeners.fire(event.patch);
            }, this);
            this._sse.addMonitorListener(function (event) {
                logger_1.Logger.debug('Received monitor:' + event.data);
                this._monitorListeners.fire(event.data);
            }, this);
        }
        return this;
    };
    StreamData.prototype.close = function () {
        this._sse.close();
        return this;
    };
    StreamData.prototype.onOpen = function (callback, context) {
        preconditions_1.Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._openListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onError = function (callback, context) {
        preconditions_1.Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._errorListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onData = function (callback, context) {
        preconditions_1.Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._dataListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onPatch = function (callback, context) {
        preconditions_1.Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._patchListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onMonitor = function (callback, context) {
        preconditions_1.Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._monitorListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.isConnected = function () {
        return this._sse.isConnected();
    };
    StreamData.prototype._decorate = function (url, headers) {
        preconditions_1.Preconditions.checkNotNull(url, 'url cannot be null');
        var signedUrl = this._authStrategy ? this._authStrategy.signUrl(url) : url;
        var clientUrl = new streamDataUrl_1.StreamDataUrl(signedUrl, this._token, headers);
        var streamdataUrl = this.server.getFullUrl(clientUrl);
        logger_1.Logger.debug('converted url :' + streamdataUrl);
        return streamdataUrl;
    };
    StreamData._buildErrorMessage = function (error) {
        logger_1.Logger.error(error);
        if (error['cause'] || error['message'] || error['status']) {
            return new streamDataError_1.StreamDataError(error['cause'], error['message'], error['status'], 'server', error);
        }
        else {
            return streamDataError_1.StreamDataError.createDefault(error);
        }
    };
    return StreamData;
}());
exports.StreamData = StreamData;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UrlHelper = (function () {
    function UrlHelper() {
    }
    UrlHelper.urlToString = function (protocol, hostname, port) {
        var url = protocol;
        if (!protocol.endsWith('://')) {
            url += '://';
        }
        url += hostname;
        if (!this._isEmptyPort(port)) {
            url += ':';
            url += port;
        }
        return url;
    };
    UrlHelper._isEmptyPort = function (port) {
        if (this._isNumber(port)) {
            return !port || port === 0;
        }
        if (this._isString(port)) {
            return !port || 0 === port.length;
        }
        return true;
    };
    UrlHelper._isNumber = function (x) {
        return typeof x === 'number';
    };
    UrlHelper._isString = function (x) {
        return typeof x === 'string';
    };
    return UrlHelper;
}());
exports.UrlHelper = UrlHelper;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(25)
  , toLength  = __webpack_require__(4)
  , toIndex   = __webpack_require__(38);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(50);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(10);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3).document && document.documentElement;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(7)(function(){
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(59)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(20)
  , hide           = __webpack_require__(9)
  , has            = __webpack_require__(8)
  , Iterators      = __webpack_require__(58)
  , $iterCreate    = __webpack_require__(31)
  , setToStringTag = __webpack_require__(34)
  , getPrototypeOf = __webpack_require__(62)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(10)
  , dPs         = __webpack_require__(61)
  , enumBugKeys = __webpack_require__(30)
  , IE_PROTO    = __webpack_require__(21)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(54).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(19)
  , anObject = __webpack_require__(10)
  , getKeys  = __webpack_require__(64);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(8)
  , toObject    = __webpack_require__(66)
  , IE_PROTO    = __webpack_require__(21)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(8)
  , toIObject    = __webpack_require__(25)
  , arrayIndexOf = __webpack_require__(51)(false)
  , IE_PROTO     = __webpack_require__(21)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(63)
  , enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(2);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(33)(/[&<>"']/g, {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
});

$export($export.P + $export.F, 'String', {escapeHTML: function escapeHTML(){ return $re(this); }});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(33)(/&(?:amp|lt|gt|quot|apos);/g, {
  '&amp;':  '&',
  '&lt;':   '<',
  '&gt;':   '>',
  '&quot;': '"',
  '&apos;': "'"
});

$export($export.P + $export.F, 'String', {unescapeHTML:  function unescapeHTML(){ return $re(this); }});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(12)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(12)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(12)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(12)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(18)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(1)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(1)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(1)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(1)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(22)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(4)
  , context   = __webpack_require__(23)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(17)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(1)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(1)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(1)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(38)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(23)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(17)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(1)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(22)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(57)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(1)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(25)
  , toLength  = __webpack_require__(4);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(37)
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(1)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(4)
  , context     = __webpack_require__(23)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(17)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(1)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(1)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(1)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(24)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(22)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(2)
  , toLength    = __webpack_require__(4)
  , isRegExp    = __webpack_require__(18)
  , getFlags    = __webpack_require__(53)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(31)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(36);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(36);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(24)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(24)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 102 */
/***/ (function(module, exports) {

/*
   * EventSource polyfill version 0.9.7
   * Supported by sc AmvTek srl
   * :email: devel@amvtek.com
 */
;(function (global) {

    if (global.EventSource && !global._eventSourceImportPrefix){
        return;
    }

    var evsImportName = (global._eventSourceImportPrefix||'')+"EventSource";

    var EventSource = function (url, options) {

        if (!url || typeof url != 'string') {
            throw new SyntaxError('Not enough arguments');
        }

        this.url = url;
        this.setOptions(options);
        var evs = this;
        setTimeout(function(){evs.poll()}, 0);
    };

    EventSource.prototype = {

            CONNECTING: 0,

            OPEN: 1,

            CLOSED: 2,

            defaultOptions: {

            withCredentials: false,

            loggingEnabled: false,

            loggingPrefix: "eventsource",

            interval: 500, // milliseconds

            bufferSizeLimit: 1024*1024, // bytes

            silentTimeout: 300000, // milliseconds

            retryInterval : 3000,

            getArgs:{
                'evs_buffer_size_limit': 1024*1024
            },

            xhrHeaders:{
                'Accept': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'X-Requested-With': 'XMLHttpRequest'
            }
        },

        setOptions: function(options){

            var defaults = this.defaultOptions;
            var option;

            // set all default options...
            for (option in defaults){

                if ( defaults.hasOwnProperty(option) ){
                    this[option] = defaults[option];
                }
            }

            // override with what is in options
            for (option in options){

                if (option in defaults && options.hasOwnProperty(option)){
                    this[option] = options[option];
                }
            }

            // if getArgs option is enabled
            // ensure evs_buffer_size_limit corresponds to bufferSizeLimit
            if (this.getArgs && this.bufferSizeLimit) {

                this.getArgs['evs_buffer_size_limit'] = this.bufferSizeLimit;
            }

            // if console is not available, force loggingEnabled to false
            if (typeof console === "undefined" || typeof console.log === "undefined") {

                this.loggingEnabled = false;
            }
        },

        log: function(message) {

            if (this.loggingEnabled) {

                console.log("[" + this.loggingPrefix +"]:" + message)
            }
        },

        poll: function() {

            try {

                if (this.readyState == this.CLOSED) {
                    return;
                }

                this.cleanup();
                this.readyState = this.CONNECTING;
                this.cursor = 0;
                this.cache = '';
                this._xhr = new this.XHR(this);
                this.resetNoActivityTimer();
                this._bufferLimitExcceeded = false;
                this._idleTimeout = false;

            }
            catch (e) {

                // in an attempt to silence the errors
                this.log('An error occured during polling');
                this.dispatchEvent('error', { type: 'error', data: e.message ,cause:"ConnectionLost"});
            }
        },

        pollAgain: function (interval) {

            // schedule poll to be called after interval milliseconds
            var evs = this;
            evs.readyState = evs.CONNECTING;
            var cause ="ConnectionLost";
            if(evs._idleTimeout){
            	cause = "IdleTimeout";
            }else if(evs._bufferLimitExcceeded){
              cause = "BufferLimitExcceeded";
            }
            evs.dispatchEvent('error', {
                type: 'error',
                data: "Reconnecting ",
                cause: cause
            });
            this._pollTimer = setTimeout(function(){evs.poll()}, interval||0);
        },


        cleanup: function() {

            this.log('evs cleaning up')

            if (this._pollTimer){
                clearInterval(this._pollTimer);
                this._pollTimer = null;
            }

            if (this._noActivityTimer){
                clearInterval(this._noActivityTimer);
                this._noActivityTimer = null;
            }

            if (this._xhr){
                this._xhr.abort();
                this._xhr = null;
            }
        },

        resetNoActivityTimer: function(){

            if (this.silentTimeout){

                if (this._noActivityTimer){
                    clearInterval(this._noActivityTimer);
                }
                var evs = this;
                this._idleTimeout = false;
                this._noActivityTimer = setTimeout(
                        function(){
                        		if(evs._idleTimeout === false){
	                        		evs._idleTimeout = true;
		                        	evs.log('Timeout! silentTimeout:'+evs.silentTimeout);
		                        	evs.pollAgain();
                        		}
                        	},
                        this.silentTimeout
                        );
            }
        },

        close: function () {

            this.readyState = this.CLOSED;
            this.log('Closing connection. readyState: CLOSED');
            this.cleanup();
        },

        _onxhrdata: function() {

            var request = this._xhr;

            if (request.isReady() && !request.hasError() ) {
                // reset the timer, as we have activity
                this.resetNoActivityTimer();

                // move this EventSource to OPEN state...
                if (this._bufferLimitExcceeded === false && this.readyState == this.CONNECTING) {
                    this.readyState = this.OPEN;
                    this.dispatchEvent('open', { type: 'open' });
                }

                var buffer = request.getBuffer();

                if (this._bufferLimitExcceeded === false && buffer.length > this.bufferSizeLimit) {
                    this.log('buffer.length > this.bufferSizeLimit');
                    this._bufferLimitExcceeded = true;
                    this.pollAgain();
                }

                if (this.cursor == 0 && buffer.length > 0){

                    // skip byte order mark \uFEFF character if it starts the stream
                    if (buffer.substring(0,1) == '\uFEFF'){
                        this.cursor = 1;
                    }
                }

                var lastMessageIndex = this.lastMessageIndex(buffer);
                if (lastMessageIndex[0] >= this.cursor){

                    var newcursor = lastMessageIndex[1];
                    var toparse = buffer.substring(this.cursor, newcursor);
                    this.parseStream(toparse);
                    this.cursor = newcursor;
                }

                // if request is finished, reopen the connection
                if (request.isDone()) {
                    this.log('request.isDone(). reopening the connection');
                    this.pollAgain(this.interval);
                }
            }
            else if (this.readyState !== this.CLOSED) {

                this.log('this.readyState !== this.CLOSED');
                this.pollAgain(this.interval);

                //MV: Unsure why an error was previously dispatched
            }
        },

        parseStream: function(chunk) {

            // normalize line separators (\r\n,\r,\n) to \n
            // remove white spaces that may precede \n
            chunk = this.cache + this.normalizeToLF(chunk);

            var events = chunk.split('\n\n');

            var i, j, eventType, datas, line, retry;

            for (i=0; i < (events.length - 1); i++) {

                eventType = 'message';
                datas = [];
                parts = events[i].split('\n');

                for (j=0; j < parts.length; j++) {

                    line = this.trimWhiteSpace(parts[j]);

                    if (line.indexOf('event') == 0) {

                        eventType = line.replace(/event:?\s*/, '');
                    }
                    else if (line.indexOf('retry') == 0) {

                        retry = parseInt(line.replace(/retry:?\s*/, ''));
                        if(!isNaN(retry)) {
                            this.interval = retry;
                        }
                    }
                    else if (line.indexOf('data') == 0) {

                        datas.push(line.replace(/data:?\s*/, ''));
                    }
                    else if (line.indexOf('id:') == 0) {

                        this.lastEventId = line.replace(/id:?\s*/, '');
                    }
                    else if (line.indexOf('id') == 0) { // this resets the id

                        this.lastEventId = null;
                    }
                }

                if (datas.length) {
                    // dispatch a new event
                    var event = new MessageEvent(eventType, datas.join('\n'), window.location.origin, this.lastEventId);
                    this.dispatchEvent(eventType, event);
                }
            }

            this.cache = events[events.length - 1];
        },

        dispatchEvent: function (type, event) {
            var handlers = this['_' + type + 'Handlers'];

            if (handlers) {

                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].call(this, event);
                }
            }

            if (this['on' + type]) {
                this['on' + type].call(this, event);
            }

        },

        addEventListener: function (type, handler) {
            if (!this['_' + type + 'Handlers']) {
                this['_' + type + 'Handlers'] = [];
            }

            this['_' + type + 'Handlers'].push(handler);
        },

        removeEventListener: function (type, handler) {
            var handlers = this['_' + type + 'Handlers'];
            if (!handlers) {
                return;
            }
            for (var i = handlers.length - 1; i >= 0; --i) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        },

        _pollTimer: null,

        _noactivityTimer: null,

        _xhr: null,

        lastEventId: null,

        cache: '',

        cursor: 0,

        onerror: null,

        onmessage: null,

        onopen: null,

        readyState: 0,

        _idleTimeout : false,

        _bufferLimitExcceeded : false,

        // ===================================================================
        // helpers functions
        // those are attached to prototype to ease reuse and testing...

        urlWithParams: function (baseURL, params) {

            var encodedArgs = [];

            if (params){

                var key, urlarg;
                var urlize = encodeURIComponent;

                for (key in params){
                    if (params.hasOwnProperty(key)) {
                        urlarg = urlize(key)+'='+urlize(params[key]);
                        encodedArgs.push(urlarg);
                    }
                }
            }

            if (encodedArgs.length > 0){

                if (baseURL.indexOf('?') == -1)
                    return baseURL + '?' + encodedArgs.join('&');
                return baseURL + '&' + encodedArgs.join('&');
            }
            return baseURL;
        },

        lastMessageIndex: function(text) {

            var ln2 =text.lastIndexOf('\n\n');
            var lr2 = text.lastIndexOf('\r\r');
            var lrln2 = text.lastIndexOf('\r\n\r\n');

            if (lrln2 > Math.max(ln2, lr2)) {
                return [lrln2, lrln2+4];
            }
            return [Math.max(ln2, lr2), Math.max(ln2, lr2) + 2]
        },

        trimWhiteSpace: function(str) {
            // to remove whitespaces left and right of string

            var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
            return str.replace(reTrim, '');
        },

        normalizeToLF: function(str) {

            // replace \r and \r\n with \n
            return str.replace(/\r\n|\r/g, '\n');
        }

    };

    if (!isOldIE()){

        EventSource.isPolyfill = "XHR";

        // EventSource will send request using XMLHttpRequest
        EventSource.prototype.XHR = function(evs) {

            request = new XMLHttpRequest();
            this._request = request;
            evs._xhr = this;

            // set handlers
            request.onreadystatechange = function(){
                if (request.readyState > 1 && evs.readyState != evs.CLOSED) {
                    if (request.status == 200 || (request.status>=300 && request.status<400)){
                        evs._onxhrdata();
                    }
                    else {
                        if(!evs._idleTimeout && !evs._bufferLimitExcceeded)
                        {
                          evs.pollAgain(evs.retryInterval);
                        }
                    }
                }
            };

            request.onprogress = function () {
            };

            request.open('GET', evs.urlWithParams(evs.url, evs.getArgs), true);

            var headers = evs.xhrHeaders; // maybe null
            for (var header in headers) {
                if (headers.hasOwnProperty(header)){
                    request.setRequestHeader(header, headers[header]);
                }
            }
            if (evs.lastEventId) {
                request.setRequestHeader('Last-Event-Id', evs.lastEventId);
            }
			      if (evs.withCredentials){
                request.withCredentials = true;
            }
            request.send();
        };

        EventSource.prototype.XHR.prototype = {

            useXDomainRequest: false,

            _request: null,

            _failed: false, // true if we have had errors...

            isReady: function() {

                return this._request.readyState >= 2;
            },

            isDone: function() {

                return (this._request.readyState == 4);
            },

            hasError: function() {

                return (this._failed || (this._request.status >= 400));
            },

            getBuffer: function() {

                var rv = '';
                try {
                    rv = this._request.responseText || '';
                }
                catch (e){}
                return rv;
            },

            abort: function() {

                if ( this._request ) {
                    this._request.abort();
                }
            }
        };
    }
    else {

	EventSource.isPolyfill = "IE_8-9";

        // patch EventSource defaultOptions
        var defaults = EventSource.prototype.defaultOptions;
        defaults.xhrHeaders = null; // no headers will be sent
        defaults.getArgs['evs_preamble'] = 2048 + 8;

        // EventSource will send request using Internet Explorer XDomainRequest
        EventSource.prototype.XHR = function(evs) {

            request = new XDomainRequest();
            this._request = request;

            // set handlers
            request.onprogress = function(){
                request._ready = true;
                this._failed = false;
                evs._onxhrdata();
            };

            request.onload = function(){
                this._loaded = true;
                this._failed = false;
                evs._onxhrdata();
            };

            request.onerror = function(){
            	  this._failed = true;
                if(!evs._idleTimeout && !evs._bufferLimitExcceeded)
                {
                  evs.pollAgain(evs.retryInterval);
                }
            };

            request.ontimeout = function(){
                this._failed = true;
                if(!evs._idleTimeout && !evs._bufferLimitExcceeded)
                {
                  evs.pollAgain(evs.retryInterval);
                }
            };

            // XDomainRequest does not allow setting custom headers
            // If EventSource has enabled the use of GET arguments
            // we add parameters to URL so that server can adapt the stream...
            var reqGetArgs = {};
            if (evs.getArgs) {

                // copy evs.getArgs in reqGetArgs
                var defaultArgs = evs.getArgs;
                    for (var key in defaultArgs) {
                        if (defaultArgs.hasOwnProperty(key)){
                            reqGetArgs[key] = defaultArgs[key];
                        }
                    }
                if (evs.lastEventId){
                    reqGetArgs['evs_last_event_id'] = evs.lastEventId;
                }
            }
            // send the request

            request.open('GET', evs.urlWithParams(evs.url,reqGetArgs));
            request.send();
        };

        EventSource.prototype.XHR.prototype = {

            useXDomainRequest: true,

            _request: null,

            _ready: false, // true when progress events are dispatched

            _loaded: false, // true when request has been loaded

            _failed: false, // true if when request is in error

            isReady: function() {

                return this._request._ready;
            },

            isDone: function() {

                return this._request._loaded;
            },

            hasError: function() {

                return this._request._failed;
            },

            getBuffer: function() {

                var rv = '';
                try {
                    rv = this._request.responseText || '';
                }
                catch (e){}
                return rv;
            },

            abort: function() {

                if ( this._request){
                    this._request.abort();
                }
            }
        };
    }

    function MessageEvent(type, data, origin, lastEventId) {

        this.bubbles = false;
        this.cancelBubble = false;
        this.cancelable = false;
        this.data = data || null;
        this.origin = origin || '';
        this.lastEventId = lastEventId || '';
        this.type = type || 'message';
    }

    function isOldIE () {

        //return true if we are in IE8 or IE9
        return (window.XDomainRequest && (window.XMLHttpRequest && new XMLHttpRequest().responseType === undefined)) ? true : false;
    }

    global[evsImportName] = EventSource;
})(this);


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(41);
module.exports = __webpack_require__(39);


/***/ })
/******/ ]);
});
//# sourceMappingURL=streamdataio.js.map