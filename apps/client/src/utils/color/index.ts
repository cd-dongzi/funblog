export * from './analyze';
export * from './interpolate';

/*
 * 判断颜色属于深色还是浅色
 */
export function isColorDarkOrLight(rgbStr: string) {
  const RgbValue = rgbStr.replace('rgb(', '').replace(')', '');
  const RgbValueArry = RgbValue.split(',');
  const grayLevel = Number(RgbValueArry[0]) * 0.299 + Number(RgbValueArry[1]) * 0.587 + Number(RgbValueArry[2]) * 0.114;
  if (grayLevel >= 192) {
    // 浅色
    return 'light';
  } else {
    // 深色
    return 'dark';
  }
}

/*
  rgba => rgba
*/
export function convertToRGBA(rgb: string, alpha: number) {
  // 使用正则表达式提取RGB颜色中的红、绿、蓝通道值
  const rgbValues = rgb.match(/\d+/g);

  if (rgbValues && rgbValues.length === 3) {
    const [red, green, blue] = rgbValues;
    // 创建RGBA格式的字符串
    const rgba = `rgba(${red},${green},${blue},${alpha})`;
    return rgba;
  } else {
    // 如果提供的RGB颜色格式不正确，返回默认值或者抛出错误
    throw new Error('Invalid RGB color format');
  }
}
