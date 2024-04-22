export default function isPc(ua: string) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return false;
  } else {
    return true;
  }
}
