import { StreamDataUrl } from './streamDataUrl';
export declare class StreamDataServer {
    protocol: string;
    hostname: string;
    port: string;
    constructor(protocol: string, hostname: string, port?: string);
    toString(): string;
    getFullUrl(clientUrl: StreamDataUrl): string;
}
