export declare type StreamDataSource = 'server' | 'client';
export declare class StreamDataError {
    static readonly DEFAULT_TYPE: string;
    static readonly DEFAULT_MESSAGE: string;
    static readonly DEFAULT_STATUS: number;
    static readonly DEFAULT_SOURCE: StreamDataSource;
    static createDefault(original: any): StreamDataError;
    type: string;
    message: string;
    status: number | string;
    source: string;
    original: any;
    constructor(type: string, message: string, status: number | string, source?: StreamDataSource, original?: any);
    /**
     * @memberOf StreamdataError#
     * @return {boolean} true if error is from server side.
     */
    readonly isServer: boolean;
    /**
     * @memberOf StreamdataError#
     * @return {boolean} true if error is from client side.
     */
    readonly isClient: boolean;
}
