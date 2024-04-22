import { Link } from '@funblog/types';
import { request } from './fetch';

export function createLink(data: Partial<Link>) {
  return request.post('/api/link', {
    body: data,
  });
}

export function getLinkList(params?: { keyword?: string }) {
  return request.get<Link[]>('/api/link/list', {
    params,
  });
}

export function getLink(id: number) {
  return request.get<Link>(`/api/link/${id}`);
}

export function updateLink(id: number, data: Partial<Link>) {
  return request.patch(`/api/link/${id}`, {
    body: data,
  });
}

export function deleteLink(id: number) {
  return request.delete(`/api/link/${id}`);
}
