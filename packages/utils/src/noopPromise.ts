export default function noopPromiseArray<T = any>() {
  return new Promise<T[]>((resolve) => {
    // 这里什么都不做，直接返回一个已完成的空 Promise
    resolve([]);
  });
}
