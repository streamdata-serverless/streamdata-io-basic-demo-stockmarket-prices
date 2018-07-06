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
export { UrlHelper };
//# sourceMappingURL=urlHelper.js.map