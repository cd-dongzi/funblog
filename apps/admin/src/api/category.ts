import { Category } from '@funblog/types';
import { request } from './fetch';

export function createCategory(data: Partial<Category>) {
  return request.post('/api/category', {
    body: data,
  });
}

export function getCategoryList(params?: { keyword?: string }) {
  return request.get<Category[]>('/api/category/list', { params });
}

export function getCategory(id: number) {
  return request.get<Category>(`/api/category/${id}`);
}

export function updateCategory(id: number, data: Partial<Category>) {
  return request.patch(`/api/category/${id}`, {
    body: data,
  });
}

export function deleteCategory(id: number) {
  return request.delete(`/api/category/${id}`);
}

export function deleteMoreCategory(ids: number[]) {
  return request.delete('/api/category/remove', {
    body: {
      ids,
    },
  });
}
