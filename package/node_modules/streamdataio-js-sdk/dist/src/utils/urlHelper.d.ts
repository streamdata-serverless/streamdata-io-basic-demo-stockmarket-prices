export declare class UrlHelper {
    static urlToString(protocol: string, hostname: string, port?: string | number): string;
    private static _isEmptyPort(port);
    private static _isNumber(x);
    private static _isString(x);
}
