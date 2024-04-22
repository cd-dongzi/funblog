import { Tag } from '@funblog/types';
import { request } from './fetch';

export function createTag(data: Partial<Tag>) {
  return request.post('/api/tag', {
    body: data,
  });
}

export function getTagList(params?: { keyword?: string }) {
  return request.get<Tag[]>('/api/tag/list', {
    params,
  });
}

export function getTag(id: number) {
  return request.get<Tag>(`/api/tag/${id}`);
}

export function updateTag(id: number, data: Partial<Tag>) {
  return request.patch(`/api/tag/${id}`, {
    body: data,
  });
}

export function deleteTag(id: number) {
  return request.delete(`/api/tag/${id}`);
}

export function deleteMoreTag(ids: number[]) {
  return request.delete('/api/tag/remove', {
    body: {
      ids,
    },
  });
}
