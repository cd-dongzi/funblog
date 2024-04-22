export default function delay(time: number) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });
}
