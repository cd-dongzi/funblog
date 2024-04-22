import { message } from '@/lib/EscapeAntd';
import { writeClipBoardText } from '@/utils/clipboard';

export const getImgLink = (realPath: string, autoCompleteHost = true) => {
  let url = realPath;
  if (realPath.includes('http://') || realPath.includes('https://')) {
    url = realPath;
  } else {
    if (autoCompleteHost) {
      url = `${window.location.protocol}//${window.location.host}${realPath}`;
    }
  }
  url = url.replace(/\)/g, '%29');
  url = url.replace(/\(/g, '%28');
  return url;
};
export const copyImgLink = (realPath: string, isMarkdown = false, info?: string, autoCompleteHost = true) => {
  let url = getImgLink(realPath, autoCompleteHost);
  if (isMarkdown) {
    url = `![](${url})`;
  }
  writeClipBoardText(url).then((res) => {
    if (res) {
      message.success(`${info || ''}已复制${isMarkdown ? ' markdown ' : '图片'}链接到剪切板！`);
    } else {
      message.error(`${info || ''}复制链接到剪切板失败！`);
    }
  });
};
