export interface Event {
}
export interface OpenEvent extends Event {
}
export interface DataEvent extends Event {
    readonly data: string;
}
export interface PatchEvent extends Event {
    readonly patch: any;
}
export interface MonitorEvent extends Event {
    readonly data: any;
}
export interface ErrorEvent extends Event {
    readonly error: any;
}
