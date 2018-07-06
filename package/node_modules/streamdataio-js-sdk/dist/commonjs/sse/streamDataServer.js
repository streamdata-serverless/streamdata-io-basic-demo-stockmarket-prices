"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urlHelper_1 = require("../utils/urlHelper");
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
//# sourceMappingURL=streamDataServer.js.map