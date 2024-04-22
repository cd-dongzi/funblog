function get(key: string) {
  const ls = window.localStorage;
  if (key) return JSON.parse(ls.getItem(key) as string);
  return null;
}
function set(key: string, val: any) {
  const ls = window.localStorage;
  // eslint-disable-next-line prefer-rest-params
  const setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
    for (const i in setting) {
      ls.setItem(i, JSON.stringify(setting[i]));
    }
  } else {
    ls.setItem(key, JSON.stringify(val));
  }
}
function remove(key: string) {
  const ls = window.localStorage;
  ls.removeItem(key);
}
function clear() {
  const ls = window.localStorage;
  ls.clear();
}

const cacheLocal = { get, set, remove, clear };

export default cacheLocal;
