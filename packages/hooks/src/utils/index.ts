export const debounceFn = (func: (...args: any[]) => void, delay = 300) => {
  let timer: number;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
