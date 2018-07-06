export declare class Preconditions {
    /**
     * @memberOf Preconditions#
     * check if the value is not null
     * @param {*} value
     * @param {string} message
     */
    static checkNotNull(value: any, message: string): any;
    /**
     * @memberOf Preconditions#
     * log deprecated warning
     * @param {string} functionName
     * @param {string} message
     */
    static deprecated(functionName: string, message: string): void;
    /**
     * @memberOf Preconditions#
     * check is the provided expression is true
     * @param {*} expression
     * @param {string} message
     */
    static checkExpression(expression: boolean, message: string): void;
}
