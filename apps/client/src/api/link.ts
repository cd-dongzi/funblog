import { Link, LinkType } from '@funblog/types';
import { request } from './fetch';

export function createLink(body: Partial<Link>) {
  return request.post<Link>('/api/p/link', {
    body,
  });
}
export function getListList() {
  return request.get<{ type: LinkType; list: Link[] }[]>('/api/p/link/list');
}
