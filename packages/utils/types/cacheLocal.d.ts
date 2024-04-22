declare function get(key: string): any;
declare function set(key: string, val: any): void;
declare function remove(key: string): void;
declare function clear(): void;
declare const cacheLocal: {
    get: typeof get;
    set: typeof set;
    remove: typeof remove;
    clear: typeof clear;
};
export default cacheLocal;
