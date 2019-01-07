/**
 * 获取随机数
 * @param {最小数} min 
 * @param {最大数} max 
 */
export const randNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}