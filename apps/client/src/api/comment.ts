import { Comment, CommentStatus, PageQuery, PageRes } from '@funblog/types';
import { request } from './fetch';

export function getCommentPage(query: PageQuery<Pick<Comment, 'path'>>) {
  return request.get<PageRes<Comment>>('/api/p/comment/page', {
    params: query,
  });
}

export function createComment(
  data: Pick<Comment, 'content' | 'path' | 'parentId' | 'replierUserId' | 'postId' | 'type'>,
) {
  return request.post<CommentStatus>('/api/comment', {
    body: data,
  });
}

export function getCommentCountByPath(path: string) {
  return request.get<number>('/api/p/comment/count', {
    params: {
      path,
    },
  });
}
