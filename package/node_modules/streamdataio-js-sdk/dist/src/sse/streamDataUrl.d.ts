export declare class StreamDataUrl {
    private static readonly X_SD_HEADER;
    private static readonly X_SD_TOKEN;
    clientUrl: string;
    constructor(url: string, token: string, headers?: string[]);
    toString(): string;
}
