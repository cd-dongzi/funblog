import { Page, PageMenu } from '@funblog/types';
import { request } from './fetch';

export function createPage(data: Partial<Page>) {
  return request.post<Page>('/api/page', {
    body: data,
  });
}

export function getPageList(params?: { keyword?: string }) {
  return request.get<Page[]>('/api/page/list', { params });
}
export function getPage(id: number) {
  return request.get<Page>(`/api/page/${id}`);
}

export function updatePage(id: number, data: Partial<Page>) {
  return request.patch(`/api/page/${id}`, {
    body: data,
  });
}

export function deletePage(id: number) {
  return request.delete(`/api/page/${id}`);
}

export function savePageMenu(data: PageMenu) {
  return request.post('/api/page/menu/save', {
    body: data,
  });
}

export function getPageMenuList(params: Pick<PageMenu, 'type'>) {
  return request.get<PageMenu>('/api/page/menu/list', { params });
}
