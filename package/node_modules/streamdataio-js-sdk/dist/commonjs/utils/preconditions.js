"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
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
//# sourceMappingURL=preconditions.js.map