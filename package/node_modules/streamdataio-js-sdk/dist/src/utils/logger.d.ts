export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
}
export declare class Logger {
    /**
     * @private
     * @memberOf Logger#
     */
    static _console: Console;
    /**
     * @private
     * @memberOf Logger#
     */
    private static _level;
    /**
     * @memberOf Logger#
     * @param {number} newlevel
     */
    static setLevel(newLevel: LogLevel): void;
    static debug(msg: string, ...args: any[]): void;
    static info(msg: string, ...args: any[]): void;
    static warn(msg: string, ...args: any[]): void;
    static error(msg: string, ...args: any[]): void;
    /**
     * @private
     * @memberOf Logger#
     */
    private static _formatLog(pattern, args);
}
