export default function getOffsetTop(node: HTMLElement | null, container?: HTMLElement | null) {
  if (!node) return 0;
  let t = node.offsetTop;
  while (node.offsetParent && node.offsetParent !== container) {
    node = node.offsetParent as HTMLElement;
    t += node.offsetTop;
  }
  return t;
}
