import { UrlHelper } from '../utils/urlHelper';
var StreamDataServer = (function () {
    function StreamDataServer(protocol, hostname, port) {
        this.protocol = protocol;
        this.hostname = hostname;
        this.port = port;
    }
    StreamDataServer.prototype.toString = function () {
        return UrlHelper.urlToString(this.protocol, this.hostname, this.port);
    };
    StreamDataServer.prototype.getFullUrl = function (clientUrl) {
        return this.toString() + "/" + clientUrl.toString();
    };
    return StreamDataServer;
}());
export { StreamDataServer };
//# sourceMappingURL=streamDataServer.js.map