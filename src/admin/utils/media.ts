/**
 * 图片预加载
 * @param {*} arr
 */
export const imageLoad = (arr: string | string[]) => {
  const load = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      if (img.complete) {
        resolve(img)
      } else {
        img.onload = () => {
          resolve(img)
        }
        img.onerror = () => {
          reject('图片加载失败')
        }
      }
    })
  }
  return new Promise((resolve, reject) => {
    if (typeof arr === 'string') {
      load(arr).then(resolve).catch(reject)
    } else {
      const promiseAll = arr.map((src) => load(src))
      Promise.all(promiseAll).then(resolve).catch(reject)
    }
  })
}
