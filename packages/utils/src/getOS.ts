// 获取浏览器类型
export default function getOS(ua: string) {
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isFireFox = /(?:Firefox)/.test(ua);
  const isChrome = /(?:Chrome|CriOS)/.test(ua);
  const isAndroid = /(?:Android)/.test(ua);
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isChrome,
    isFireFox,
    isTablet,
    isPhone,
    isAndroid,
    isPc,
  };
}
