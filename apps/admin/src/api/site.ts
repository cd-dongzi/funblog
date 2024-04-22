import {
  SiteImage,
  SiteMeta,
  SiteBlogger,
  SitePagination,
  SiteUser,
  SiteSocialAccount,
  SiteComment,
  SiteCommentReview,
  SiteEmail,
  SiteAdvance,
  SiteLink,
  SiteLayout,
} from '@funblog/types';
import { request } from './fetch';

// 元数据
export function getSiteMeta() {
  return request.get<SiteMeta | null>('/api/site/meta');
}
export function getPublicSiteMeta() {
  return request.get<SiteMeta>('/api/p/site/meta');
}

export function updateSiteMeta(data: Partial<SiteMeta>) {
  return request.post('/api/site/meta', {
    body: data,
  });
}

// 博主信息
export function getSiteBlogger() {
  return request.get<SiteBlogger | null>('/api/site/blogger');
}
export function updateSiteBlogger(data: Partial<SiteBlogger>) {
  return request.post('/api/site/blogger', {
    body: data,
  });
}

// 媒体信息
export function getSiteImage() {
  return request.get<SiteImage | null>('/api/site/image');
}

export function updateSiteImage(data: Partial<SiteImage>) {
  return request.post('/api/site/image', {
    body: data,
  });
}

// 高级设置
export function getSiteAdvance() {
  return request.get<SiteAdvance | null>('/api/site/advance');
}
export function updateSiteAdvance(data: Partial<SiteAdvance>) {
  return request.post('/api/site/advance', {
    body: data,
  });
}

// 分页信息
export function getSitePagination() {
  return request.get<SitePagination | null>('/api/site/pagination');
}
export function updateSitePagination(data: Partial<SitePagination>) {
  return request.post('/api/site/pagination', {
    body: data,
  });
}

// 用户信息
export function getSiteUser() {
  return request.get<SiteUser | null>('/api/site/user');
}
export function updateSiteUser(data: Partial<SiteUser>) {
  return request.post('/api/site/user', {
    body: data,
  });
}

// 社交账号
export function getSiteSocialAccount() {
  return request.get<SiteSocialAccount | null>('/api/site/social_account');
}
export function updateSiteSocialAccount(data: Partial<SiteSocialAccount>) {
  return request.post('/api/site/social_account', {
    body: data,
  });
}

// 评论
export function getSiteComment() {
  return request.get<SiteComment | null>('/api/site/comment');
}
export function updateSiteComment(data: Partial<SiteComment>) {
  return request.post('/api/site/comment', {
    body: data,
  });
}
// 评论审核词
export function getSiteCommentReview() {
  return request.get<SiteCommentReview | null>('/api/site/comment_review');
}
export function updateSiteCommentReview(data: Partial<SiteCommentReview>) {
  return request.post('/api/site/comment_review', {
    body: data,
  });
}

// 邮件
export function getSiteEmail() {
  return request.get<SiteEmail | null>('/api/site/email');
}
export function updateSiteEmail(data: Partial<SiteEmail>) {
  return request.post('/api/site/email', {
    body: data,
  });
}

// 友链
export function getSiteLink() {
  return request.get<SiteLink | null>('/api/site/link');
}
export function updateSiteLink(data: Partial<SiteLink>) {
  return request.post('/api/site/link', {
    body: data,
  });
}

// 布局
export function getSiteLayout() {
  return request.get<SiteLayout | null>('/api/site/layout');
}
export function updateSiteLayout(data: Partial<SiteLayout>) {
  return request.post('/api/site/layout', {
    body: data,
  });
}
