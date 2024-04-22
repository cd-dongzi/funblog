declare const cacheCookie: {
    get(key: string): string;
    set(key: string, value: any, options?: {
        day?: number | undefined;
        isSetTopDomain?: boolean | undefined;
    }): void;
    remove(key: string, options?: {
        isSetTopDomain?: boolean | undefined;
    }): void;
};
export default cacheCookie;
