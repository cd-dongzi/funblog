import { checkStr } from '@funblog/utils';
import { METADATA } from '@/config/metaData';
import { HEADER_ID } from '@/constants';

export function getHeaderHeight() {
  return document.getElementById(HEADER_ID)?.clientHeight || 0;
}

export function getResourceUrl(url?: string) {
  if (!url) return '';
  if (checkStr(url, 'URL')) {
    return url;
  }
  return (METADATA.siteMeta.resourceUrl || '') + url;
}

export function checkPaginationUrl(url: string) {
  return /((\/[\w-]+)*)(\/page\/\d+)$/.test(url);
}

export function getPaginationPageUrl(url: string) {
  return url.replace(/((\/[\w-]+)*)(\/page\/\d+)$/, '$1');
}
export function getPaginationUrl(url: string) {
  return url.replace(/((\/[\w-]+)*)(\/\d+)$/, '$1');
}
