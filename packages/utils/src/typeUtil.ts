class typeUtil {
  static isString(o: any) {
    return Object.prototype.toString.call(o) === '[object String]';
  }

  static isBoolean(o: any) {
    return Object.prototype.toString.call(o) === '[object Boolean]';
  }

  static isUndefined(o: any) {
    return Object.prototype.toString.call(o) === '[object Undefined]';
  }

  static isNull(o: any) {
    return Object.prototype.toString.call(o) === '[object Null]';
  }

  static isNumber(o: any): o is number {
    return Object.prototype.toString.call(o) === '[object Number]';
  }

  static isNum(o: any) {
    return /^\d+$/.test(o);
  }

  static isFunction(o: any) {
    return Object.prototype.toString.call(o) === '[object Function]';
  }

  static isArray(o: any): o is any[] {
    return Object.prototype.toString.call(o) === '[object Array]';
  }

  static isObject<T = Record<string, any>>(o: any): o is T {
    return Object.prototype.toString.call(o) === '[object Object]';
  }

  static isDate(o: any) {
    return Object.prototype.toString.call(o) === '[object Date]';
  }

  static isRegExp(o: any) {
    return Object.prototype.toString.call(o) === '[object RegExp]';
  }

  static isPromise(o: any) {
    return Object.prototype.toString.call(o) === '[object Promise]';
  }

  static isFile(o: any) {
    return Object.prototype.toString.call(o) === '[object File]';
  }

  static isError(o: any) {
    return Object.prototype.toString.call(o) === '[object Error]';
  }

  static isEmpty(o: any) {
    return o === undefined || o === null;
  }

  static isEmptyObject(o: any) {
    if (typeUtil.isObject(o)) {
      if (Object.keys(o).length === 0) {
        return true;
      }
      return false;
    }
    return false;
  }
}

export default typeUtil;
