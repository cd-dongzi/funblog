import { Post, PostQuery, PostRelation, PageQuery, PageRes } from '@funblog/types';
import { request } from './fetch';

export function getPostPage(params: PageQuery<PostQuery>) {
  return request.get<PageRes<Post>>('/api/p/post/page', {
    params,
  });
}
export function getPostSearchPage(params: PageQuery<{ keyword: string }>) {
  return request.get<PageRes<Post>>('/api/p/post/search/page', {
    params,
  });
}

export function getLatestPostList() {
  return request.get<Post[]>('/api/p/post/latest/list');
}

export function getPopularPostList() {
  return request.get<Post[]>('/api/p/post/popular/list');
}

export function getPostInfo(id: number) {
  return request.get<Post>(`/api/p/post/${id}`, {
    cache: 'no-store',
  });
}

// 获取文章关联信息
export function getPostRelationInfo(id: number) {
  return request.get<PostRelation>(`/api/p/post/${id}/relation`);
}

export function updatePostReadNum(id: number) {
  return request.patch<number>(`/api/p/post/${id}/read`);
}

export function updatePostLikeNum(id: number) {
  return request.patch<number>(`/api/p/post/${id}/like`);
}

export function checkPostLikeStatus(id: number) {
  return request.post<boolean>(`/api/p/post/${id}/like/status`, {
    cache: 'no-store',
  });
}
