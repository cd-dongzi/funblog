import { Visitor } from '@funblog/types';
import { request } from './fetch';

export function createVisitor(body: Partial<Pick<Visitor, 'userAgent'>>) {
  return request.post<Visitor>('/api/visitor', {
    body,
  });
}

export function getVisitorCount() {
  return request.get<number>('/api/p/visitor/count');
}
