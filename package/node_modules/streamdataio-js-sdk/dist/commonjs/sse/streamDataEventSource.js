"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../utils/logger");
var jsonHelper_1 = require("../utils/jsonHelper");
if (NODE) {
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
//# sourceMappingURL=streamDataEventSource.js.map