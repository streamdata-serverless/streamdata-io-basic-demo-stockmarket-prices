"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var streamDataEventSource_1 = require("./sse/streamDataEventSource");
var listeners_1 = require("./events/listeners");
var preconditions_1 = require("./utils/preconditions");
var logger_1 = require("./utils/logger");
var config_1 = require("./configuration/config");
var streamDataError_1 = require("./errors/streamDataError");
var streamDataUrl_1 = require("./sse/streamDataUrl");
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
//# sourceMappingURL=streamData.js.map