import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';

export async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        if (type.includes('image')) {
          const blob = await clipboardItem.getType(type);
          return new File([blob], `clipboard-${dayjs().format('YYYY-MM-DD')}.${type.replace('image/', '')}`);
        }
      }
    }
  } catch (err: any) {
    console.error(err.name, err.message);
    return null;
  }
}
export async function writeClipBoardText(str: string) {
  try {
    copy(str);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}
