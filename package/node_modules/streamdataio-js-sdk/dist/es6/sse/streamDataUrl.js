var StreamDataUrl = (function () {
    function StreamDataUrl(url, token, headers) {
        // Sanitize client url
        this.clientUrl = url;
        // Build stream data query from header
        var streamDataQuery = headers ? headers.map(function (header) {
            return StreamDataUrl.X_SD_HEADER + "=" + encodeURIComponent(header);
        }) : [];
        streamDataQuery.push(StreamDataUrl.X_SD_TOKEN + "=" + encodeURIComponent(token));
        // Add stream data query to target url
        if (streamDataQuery.length > 0) {
            this.clientUrl += (this.clientUrl.indexOf('?') === -1) ? '?' : '&';
            this.clientUrl += streamDataQuery.join('&');
        }
    }
    StreamDataUrl.prototype.toString = function () {
        return this.clientUrl;
    };
    return StreamDataUrl;
}());
export { StreamDataUrl };
StreamDataUrl.X_SD_HEADER = 'X-Sd-Header';
StreamDataUrl.X_SD_TOKEN = 'X-Sd-Token';
//# sourceMappingURL=streamDataUrl.js.map