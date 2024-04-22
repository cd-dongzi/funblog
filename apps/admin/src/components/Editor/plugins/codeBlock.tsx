import type { BytemdPlugin } from 'bytemd';
import copy from 'copy-to-clipboard';
import { visit } from 'unist-util-visit';
import { message } from '@/lib/EscapeAntd';
// FIXME: Addd Types
const codeBlockPlugin = () => (tree: any) => {
  visit(tree, (node) => {
    if (node.type === 'element' && node.tagName === 'pre') {
      const oldChildren = JSON.parse(JSON.stringify(node.children));
      const codeProperties = oldChildren.find((child: any) => child.tagName === 'code').properties;
      let language = '';
      if (codeProperties.className) {
        for (const each of codeProperties.className) {
          if (each.startsWith('language-')) {
            language = each.replace('language-', '');
            break;
          }
        }
      }
      if (language === 'mermaid') return;
      // 复制按钮
      const codeCopyBtn = {
        type: 'element',
        tagName: 'div',
        properties: {
          class: 'code-copy-btn',
        },
        children: [],
      };
      const languageTag = {
        type: 'element',
        tagName: 'span',
        properties: {
          class: 'language-tag mr-1',
          style: 'line-height: 21px',
        },
        children: [
          {
            type: 'text',
            value: language,
          },
        ],
      };
      // 上方右侧 header
      const headerRight = {
        type: 'element',
        tagName: 'div',
        properties: {
          class: 'header-right flex',
          style: 'color: #6f7177',
        },
        children: [languageTag, codeCopyBtn],
      };
      // 包裹的 div
      const wrapperDiv = {
        type: 'element',
        tagName: 'div',
        properties: {
          class: 'code-block-wrapper relative',
        },
        children: [headerRight, ...oldChildren],
      };
      node.children = [wrapperDiv];
    }
  });
};

const onClickCopyCode = (e: Event) => {
  const copyBtn = e.target as HTMLElement;
  const code = copyBtn.parentElement?.parentElement?.querySelector('code')?.innerText;
  if (code) {
    copy(code);
    message.success('复制成功');
  }
};

export function customCodeBlock(): BytemdPlugin {
  return {
    rehype: (processor) => processor.use(codeBlockPlugin),
    viewerEffect: ({ markdownBody }) => {
      markdownBody.querySelectorAll('.code-block-wrapper').forEach((codeBlock) => {
        const copyBtn = codeBlock.querySelector('.code-copy-btn');
        copyBtn?.removeEventListener('click', onClickCopyCode);
        copyBtn?.addEventListener('click', onClickCopyCode);
      });
    },
  };
}
