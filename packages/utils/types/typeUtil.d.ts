declare class typeUtil {
    static isString(o: any): boolean;
    static isBoolean(o: any): boolean;
    static isUndefined(o: any): boolean;
    static isNull(o: any): boolean;
    static isNumber(o: any): o is number;
    static isNum(o: any): boolean;
    static isFunction(o: any): boolean;
    static isArray(o: any): o is any[];
    static isObject<T = Record<string, any>>(o: any): o is T;
    static isDate(o: any): boolean;
    static isRegExp(o: any): boolean;
    static isPromise(o: any): boolean;
    static isFile(o: any): boolean;
    static isError(o: any): boolean;
    static isEmpty(o: any): boolean;
    static isEmptyObject(o: any): boolean;
}
export default typeUtil;
