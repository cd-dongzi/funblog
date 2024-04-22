import Parser from 'ua-parser-js';

// 解析ua数据
export const getDataByUa = (ua?: string) => {
  if (!ua) return null;
  const vm = new Parser(ua);
  return vm.getResult();
};
