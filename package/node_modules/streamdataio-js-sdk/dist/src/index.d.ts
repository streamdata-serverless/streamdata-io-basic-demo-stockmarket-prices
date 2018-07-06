import { StreamData } from './streamData';
import { StreamDataAuthStrategy } from './auth/streamDataAuthStrategy';
/**
 * Streamdata.io JavaScript SDK
 */
export declare class StreamDataIo {
    /**
     * <p>Create a new instance of the <code>StreamDataEventSource</code> prototype.</p>
     *
     * <p>The <code>StreamDataEventSource</code> is the main entry point for establishing Server Sent Event connection to a targeted JSON REST service URL.</p>
     *
     * @param {String} url Mandatory. The targeted REST URL is formatted as follow:
     * <pre><code>protocol://url(:port)(/localpath(?queryparameters))</code></pre>
     *
     * @param {String} token Mandatory. The application token to authentify the request
     *
     * @param {Array} headers Optional. Any specific headers that have to be added to the request. It must be an array with the following structure:<code>['Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==']</code>
     *
     * @param {Object} authStrategy Optional. An object which will enable HMAC signature of the request. You can create this object as follow:
     * <pre><code>
     * // setup headers
     * var headers = [];
     * // setup signatureStrategy
     * var signatureStrategy = AuthStrategy.newSignatureStrategy('NmEtYTljN2UtYmM1MGZlMGRiNGFQzYS00MGRkLTkNTZlMDY1','NTEtMTQxNiWIzMDEC00OWNlLThmNGYtY2ExMDJxO00NzNhLTgtZWY0MjOTc2YmUxODFiZDU1NmU0ZDAtYWU5NjYxMGYzNDdi');
     * // instantiate an eventSource
     * var eventSource = streamdataio.createEventSource('http://myRestservice.com/stocks','NmEtYTljN2UtYmM1MGZlMGRiNGFQzYS00MGRkLTkNTZlMDY1',headers,signatureStrategy);
     *
     * </code></pre>
     * @returns {StreamDataEventSource}
     */
    static createEventSource(url: string, appToken: string, headers?: string[], authStragety?: StreamDataAuthStrategy): StreamData;
}
export declare const createEventSource: typeof StreamDataIo.createEventSource;
