import { Post, PageQuery, PageRes } from '@funblog/types';
import { request } from './fetch';

export function createPost(data: Partial<Post>) {
  return request.post<Post>('/api/post', {
    body: data,
  });
}

export function getPostPage(params: PageQuery) {
  return request.get<PageRes<Post>>('/api/post/page', {
    params,
  });
}

export function getPost(id: number) {
  return request.get<Post>(`/api/post/${id}`);
}

export function updatePost(id: number, data: Partial<Post>) {
  return request.patch(`/api/post/${id}`, {
    body: data,
  });
}

export function deletePost(id: number) {
  return request.delete(`/api/post/${id}`);
}

export function deleteMorePost(ids: number[]) {
  return request.delete('/api/post/remove', {
    body: {
      ids,
    },
  });
}

export function getPostCount() {
  return request.get<number>('/api/post/count');
}
