import { JsonHelper } from './jsonHelper';
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
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
                        replaced = JsonHelper.stringify(args[index]);
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
export { Logger };
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
//# sourceMappingURL=logger.js.map