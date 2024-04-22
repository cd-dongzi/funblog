export default function getOffsetLeft(node: HTMLElement | null, container?: HTMLElement | null) {
  if (!node) return 0;
  let t = node.offsetLeft;
  while (node.offsetParent && node.offsetParent !== container) {
    node = node.offsetParent as HTMLElement;
    t += node.offsetLeft;
  }
  return t;
}
