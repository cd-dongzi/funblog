function get(key: string) {
  const ss = window.sessionStorage;
  if (key) {
    const value = ss.getItem(key);
    if (value === 'undefined') {
      return value;
    }
    return JSON.parse(value as string);
  }
  return null;
}
function set(key: string, val: any) {
  const ss = window.sessionStorage;
  // eslint-disable-next-line prefer-rest-params
  const setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
    for (const i in setting) {
      ss.setItem(i, JSON.stringify(setting[i]));
    }
  } else {
    ss.setItem(key, JSON.stringify(val));
  }
}
function remove(key: string) {
  const ss = window.sessionStorage;
  ss.removeItem(key);
}
function clear() {
  const ss = window.sessionStorage;
  ss.clear();
}
const cacheSession = { get, set, remove, clear };
export default cacheSession;
