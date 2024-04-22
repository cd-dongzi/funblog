import MarkdownIt from 'markdown-it';
import highlightJs from './highlight';

const md = new MarkdownIt({
  breaks: true,
  linkify: true, // Auto convert URL-like text to links
  // Enable some language-neutral replacement + quotes beautification
  typographer: true,
  // should always enable html option due to parsed emoji
  html: true,
});

function getHeadingId(rootArr: any[]) {
  return (level: number) => {
    const append = (level: number, arr: any[], root = [] as any[]): any => {
      const last = arr[arr.length - 1];
      if (!last) {
        arr.push([level]);
        return;
      }
      const first = arr[0];
      if (!Array.isArray(first)) {
        if (level <= first) {
          root.push([level]);
          return;
        }
      }
      if (!Array.isArray(last)) {
        if (level > last) {
          arr.push([level]);
          return;
        } else {
          root.push([level]);
          return;
        }
      }
      append(level, last, arr);
      return arr;
    };
    append(level, rootArr, rootArr);
    const format = (arr: any[], next?: boolean): number[] => {
      if (!arr || !arr.length) return [];
      if (next && arr.length === 1) return [];
      let index: number;
      if (!next) {
        index = arr.length;
      } else {
        index = arr.length - 1;
      }
      return [index, ...format(arr[arr.length - 1], true)];
    };
    return format(rootArr).join('.');
  };
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']);
  } else {
    const attrs = tokens[idx].attrs;
    if (attrs) {
      attrs[aIndex][1] = '_blank';
    }
  }
  return self.renderToken(tokens, idx, options);
};
md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const classNames = token.attrs?.find((attr) => attr[0] === 'class');
  const _className = 'preview-image';
  if (!classNames) {
    token.attrPush(['class', _className]);
  } else {
    const existingClass = classNames[1];
    token.attrSet('class', `${existingClass} ${_className}`);
  }
  token.attrSet('alt', token.content);
  return self.renderToken(tokens, idx, options);
};
md.renderer.rules.fence = function (tokens, idx) {
  const token = tokens[idx];
  const lang = token.info.trim();
  let content = token.content.trim();
  if (lang && highlightJs.getLanguage(lang)) {
    content = highlightJs.highlight(content, { language: lang }).value;
  } else {
    content = highlightJs.highlightAuto(content).value;
  }
  return `<pre><code class="language-${lang}">${content}<span class="copy-code-btn">${
    lang ? `${lang} ` : ''
  }复制代码</span></code></pre>`;
};
md.renderer.rules.code_inline = function (tokens, idx) {
  const token = tokens[idx];
  let content = token.content.trim();
  content = highlightJs.highlightAuto(content).value;
  return `<code class="code-span">${content}</code>`;
};

function parseMarkdown(text: string) {
  const append = getHeadingId([]);
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const level = Number(token.tag.slice(1));
    tokens[idx].attrSet('id', append(level));
    return self.renderToken(tokens, idx, options);
  };
  return md.render(text);
}

export default parseMarkdown;
