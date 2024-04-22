import { fromBuffer } from 'file-type';

const imageExtensions = new Set([
  'jpg',
  'png',
  'gif',
  'webp',
  'flif',
  'cr2',
  'tif',
  'bmp',
  'jxr',
  'psd',
  'ico',
  'bpg',
  'jp2',
  'jpm',
  'jpx',
  'heic',
  'cur',
  'dcm',
  'avif',
]);

export default async function imageType(input) {
  const result = await fromBuffer(input);
  if (!result?.ext) return false;
  return imageExtensions.has(result?.ext) && result;
}

export const minimumBytes = 4100;
