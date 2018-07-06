import { StreamDataError } from './errors/streamDataError';
import { StreamDataServer } from './sse/streamDataServer';
import { StreamDataAuthStrategy } from './auth/streamDataAuthStrategy';
export declare class StreamData {
    private _url;
    private _token;
    private _headers;
    private _authStrategy;
    private _openListeners;
    private _dataListeners;
    private _patchListeners;
    private _errorListeners;
    private _monitorListeners;
    private _sse;
    server: StreamDataServer;
    constructor(url: string, appToken: string, headers?: string[], authStragety?: StreamDataAuthStrategy);
    open(): StreamData;
    close(): StreamData;
    onOpen(callback: (data: any) => void, context?: any): this;
    onError(callback: (data: StreamDataError) => void, context?: any): this;
    onData(callback: (data: any) => void, context?: any): this;
    onPatch(callback: (data: any) => void, context?: any): this;
    onMonitor(callback: (data: any) => void, context?: any): this;
    isConnected(): boolean;
    private _decorate(url, headers);
    private static _buildErrorMessage(error);
}
