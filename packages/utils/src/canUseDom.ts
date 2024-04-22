// 是否能使用dom
const canUseDom = () => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
export default canUseDom;
