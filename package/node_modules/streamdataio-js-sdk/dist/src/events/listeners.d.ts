export declare class Listeners<T> {
    private _listeners;
    /**
     * @memberOf Listeners#
     */
    fire(data: T): void;
    /**
     * @memberOf Listeners#
     * @param callback
     * @param context
     */
    add(callback: (data: T) => void, context?: any): void;
    /**
     * @memberOf Listeners#
     * @param callback
     * @param context
     */
    remove(callback: (data: T) => void, context?: any): void;
}
export interface Listener<T> {
    callback: (data: T) => void;
    context?: any;
}
