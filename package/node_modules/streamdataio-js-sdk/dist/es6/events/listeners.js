import { Preconditions } from '../utils/preconditions';
import { Logger } from '../utils/logger';
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
                    Logger.error('Unable to forward event: {0}', error);
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
        Preconditions.checkNotNull(listener, 'listener cannot be null');
        Preconditions.checkExpression(this._listeners.indexOf(listener) === -1, 'listener already exists');
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
        Preconditions.checkNotNull(listener, 'listener cannot be null');
        var indexOf = this._listeners.indexOf(listener);
        Preconditions.checkExpression(indexOf >= 0, 'listener not exists');
        this._listeners.splice(indexOf, 1);
    };
    return Listeners;
}());
export { Listeners };
//# sourceMappingURL=listeners.js.map