import xss, { escapeAttrValue } from 'xss';

export default function filterXSS(content: string) {
  return xss(content, {
    onTagAttr: (tag, name, value) => {
      if (name === 'style') {
        return `${name}="${escapeAttrValue(value)}"`;
      }
    },
  });
}
