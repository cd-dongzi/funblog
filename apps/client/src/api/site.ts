import { CACHE_CLIENT_TAGS } from '@funblog/constants';
import {
  SiteBlogger,
  SiteComment,
  SiteLayout,
  SiteLink,
  SiteMeta,
  SitePagination,
  SiteSocialAccount,
  SiteUser,
} from '@funblog/types';
import { request } from './fetch';

export function getSiteMeta() {
  return request.get<SiteMeta | undefined>('/api/p/site/meta', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSiteMeta],
    },
  });
}

export function getSiteBlogger() {
  return request.get<SiteBlogger | undefined>('/api/p/site/blogger', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSiteBlogger],
    },
  });
}

export function getSitePagination() {
  return request.get<SitePagination | undefined>('/api/p/site/pagination', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSitePagination],
    },
  });
}

export function getSiteComment() {
  return request.get<SiteComment | undefined>('/api/p/site/comment', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSiteComment],
    },
  });
}

export function getSocialAccount() {
  return request.get<SiteSocialAccount | undefined>('/api/p/site/social_account', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSocialAccount],
    },
  });
}

export function getSiteUsr() {
  return request.get<SiteUser | undefined>('/api/p/site/user', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSiteUsr],
    },
  });
}

export function getSiteLink() {
  return request.get<SiteLink | undefined>('/api/p/site/link', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSiteLink],
    },
  });
}

export function getSiteLayout() {
  return request.get<SiteLayout | undefined>('/api/p/site/layout', {
    next: {
      tags: [CACHE_CLIENT_TAGS.getSiteLayout],
    },
  });
}
