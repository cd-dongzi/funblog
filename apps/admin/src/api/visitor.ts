import { Visitor, PageQuery, PageRes } from '@funblog/types';
import { request } from './fetch';

export function getVisitorPage(params: PageQuery) {
  return request.get<PageRes<Visitor>>('/api/visitor/page', {
    params,
  });
}

export function getVisitorCount() {
  return request.get<number>('/api/visitor/count');
}

export function getVisitorSystem() {
  return request.get<Record<string, any>>('/api/visitor/system');
}

export function getVisitorLocation() {
  return request.get<Record<string, any>>('/api/visitor/location');
}
