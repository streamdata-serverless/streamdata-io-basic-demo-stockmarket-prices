"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preconditions_1 = require("../utils/preconditions");
var logger_1 = require("../utils/logger");
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
//# sourceMappingURL=listeners.js.map