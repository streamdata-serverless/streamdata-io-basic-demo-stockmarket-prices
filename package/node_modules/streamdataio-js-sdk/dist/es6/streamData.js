import { StreamDataEventSource } from './sse/streamDataEventSource';
import { Listeners } from './events/listeners';
import { Preconditions } from './utils/preconditions';
import { Logger } from './utils/logger';
import { DefaultStreamDataServer } from './configuration/config';
import { StreamDataError } from './errors/streamDataError';
import { StreamDataUrl } from './sse/streamDataUrl';
var StreamData = (function () {
    function StreamData(url, appToken, headers, authStragety) {
        // Build internal configuration
        Preconditions.checkNotNull(url, 'url cannot be null.');
        Preconditions.checkNotNull(appToken, 'appToken cannot be null.');
        this._url = url;
        this._token = appToken;
        this._headers = headers ? headers : [];
        this._authStrategy = authStragety;
        // Init listeners
        this._openListeners = new Listeners();
        this._dataListeners = new Listeners();
        this._patchListeners = new Listeners();
        this._errorListeners = new Listeners();
        this._monitorListeners = new Listeners();
        // SSE
        this._sse = null;
        this.server = DefaultStreamDataServer;
    }
    StreamData.prototype.open = function () {
        Preconditions.checkNotNull(this._url, 'url cannot be null');
        this._sse && this.close();
        var decoratedUrl = this._decorate(this._url, this._headers);
        if (decoratedUrl) {
            this._sse = new StreamDataEventSource(decoratedUrl);
            this._sse.addOpenListener(function (event) {
                Logger.debug('SSE Stream Opened to ' + this._url + 'event: ' + event);
                this._openListeners.fire();
            }, this);
            this._sse.addErrorListener(function (event) {
                if (event.error) {
                    this._errorListeners.fire(StreamData._buildErrorMessage(event.error));
                }
                else {
                    Logger.info('SSE server connection lost, retrying ...');
                }
            }, this);
            this._sse.addDataListener(function (event) {
                Logger.debug('Received data:' + event.data);
                this._dataListeners.fire(event.data);
            }, this);
            this._sse.addPatchListener(function (event) {
                Logger.debug('Received patch:' + event.patch);
                this._patchListeners.fire(event.patch);
            }, this);
            this._sse.addMonitorListener(function (event) {
                Logger.debug('Received monitor:' + event.data);
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
        Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._openListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onError = function (callback, context) {
        Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._errorListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onData = function (callback, context) {
        Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._dataListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onPatch = function (callback, context) {
        Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._patchListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.onMonitor = function (callback, context) {
        Preconditions.checkNotNull(callback, 'listener cannot be null');
        this._monitorListeners.add(callback, context);
        return this;
    };
    StreamData.prototype.isConnected = function () {
        return this._sse.isConnected();
    };
    StreamData.prototype._decorate = function (url, headers) {
        Preconditions.checkNotNull(url, 'url cannot be null');
        var signedUrl = this._authStrategy ? this._authStrategy.signUrl(url) : url;
        var clientUrl = new StreamDataUrl(signedUrl, this._token, headers);
        var streamdataUrl = this.server.getFullUrl(clientUrl);
        Logger.debug('converted url :' + streamdataUrl);
        return streamdataUrl;
    };
    StreamData._buildErrorMessage = function (error) {
        Logger.error(error);
        if (error['cause'] || error['message'] || error['status']) {
            return new StreamDataError(error['cause'], error['message'], error['status'], 'server', error);
        }
        else {
            return StreamDataError.createDefault(error);
        }
    };
    return StreamData;
}());
export { StreamData };
//# sourceMappingURL=streamData.js.map