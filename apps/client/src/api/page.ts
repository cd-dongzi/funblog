import { Page, PageMenuButton } from '@funblog/types';
import { request } from './fetch';

export function getPageInfo(alias: string) {
  return request.get<Page>(`/api/p/page/${alias}`);
}

export function getPageList() {
  return request.get<Page[]>('/api/p/page/list');
}

export function getPageMenuNavigationList() {
  return request.get<PageMenuButton[]>('/api/p/page/menu/navigation/list');
}

export function getPageMenuSubList() {
  return request.get<PageMenuButton[]>('/api/p/page/menu/sub/list');
}
