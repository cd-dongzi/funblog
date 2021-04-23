class Type {
  static isString(o: any) {
    return Object.prototype.toString.call(o) === '[object String]'
  }
  static isBoolean(o: any) {
    return Object.prototype.toString.call(o) === '[object Boolean]'
  }
  static isUndefined(o: any) {
    return Object.prototype.toString.call(o) === '[object Undefined]'
  }
  static isNull(o: any) {
    return Object.prototype.toString.call(o) === '[object Null]'
  }
  static isNumber(o: any) {
    return Object.prototype.toString.call(o) === '[object Number]'
  }
  static isNum(o: any) {
    return /^\d+$/.test(o)
  }
  static isFunction(o: any) {
    return Object.prototype.toString.call(o) === '[object Function]'
  }
  static isArray(o: any) {
    return Object.prototype.toString.call(o) === '[object Array]'
  }
  static isObject(o: any) {
    return Object.prototype.toString.call(o) === '[object Object]'
  }
  static isDate(o: any) {
    return Object.prototype.toString.call(o) === '[object Date]'
  }
  static isRegExp(o: any) {
    return Object.prototype.toString.call(o) === '[object RegExp]'
  }
  static isPromise(o: any) {
    return Object.prototype.toString.call(o) === '[object Promise]'
  }
  static isFile(o: any) {
    return Object.prototype.toString.call(o) === '[object File]'
  }
  static isError(o: any) {
    return Object.prototype.toString.call(o) === '[object Error]'
  }
  static isEmpty(o: any) {
    return o === undefined || o === null
  }
  static isEmptyObject(o: any) {
    if (Type.isObject(o)) {
      if (Object.keys(o).length === 0) {
        return true
      }
      return false
    }
    return false
  }
}

export default Type
