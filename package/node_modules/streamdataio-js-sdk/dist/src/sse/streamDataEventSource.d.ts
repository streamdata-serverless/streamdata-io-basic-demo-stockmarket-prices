import { DataEvent, ErrorEvent, MonitorEvent, OpenEvent, PatchEvent } from './streamDataEvents';
export declare class StreamDataEventSource {
    private _sse;
    constructor(url: string);
    close(): void;
    addOpenListener(onOpenCallback: (event: OpenEvent) => void, context?: any): void;
    addErrorListener(onErrorCallback: (event: ErrorEvent) => void, context?: any): void;
    addDataListener(onDataCallback: (event: DataEvent) => void, context?: any): void;
    addPatchListener(onPatchCallback: (event: PatchEvent) => void, context?: any): void;
    addMonitorListener(onMonitorCallback: (event: MonitorEvent) => void, context?: any): void;
    isConnected(): boolean;
}
export declare class EventType {
    static readonly OPEN: string;
    static readonly ERROR: string;
    static readonly DATA: string;
    static readonly PATCH: string;
    static readonly MONITOR: string;
}
