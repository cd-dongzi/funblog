import { Comment, PageQuery, PageRes } from '@funblog/types';
import { request } from './fetch';

export function getCommentPage(params: PageQuery<Partial<Omit<Comment, 'page'>>>) {
  return request.get<PageRes<Comment>>('/api/comment/page', {
    params,
  });
}

export function deleteComment(id: number) {
  return request.delete(`/api/comment/${id}`);
}

export function updateComment(id: number, body: Partial<Comment>) {
  return request.patch(`/api/comment/${id}`, {
    body,
  });
}

export function getCommentCount() {
  return request.get<number>('/api/comment/count');
}
