import { LinkType } from '@funblog/types';

export const LINK_LIST = [
  { value: LinkType.PERSONAL_BLOG, label: '个人博客', alias: '小伙伴们', showClient: true },
  { value: LinkType.WEBSITE_COMMUNITY, label: '网站社区', showClient: true },
  { value: LinkType.PERSONAL_ONLINE, label: '个人在线' },
  { value: LinkType.PERSONAL_RECOMMENDATION, label: '个人引荐' },
  { value: LinkType.RESOURCE_MATERIALS, label: '资源素材' },
];

export const CACHE_CLIENT_TAGS = {
  getSiteMeta: 'getSiteMeta',
  getSiteBlogger: 'getSiteBlogger',
  getSitePagination: 'getSitePagination',
  getSiteComment: 'getSiteComment',
  getSocialAccount: 'getSocialAccount',
  getSiteUsr: 'getSiteUsr',
  getSiteLink: 'getSiteLink',
  getSiteLayout: 'getSiteLayout',
} as const;

export const TOKEN_KEY = 'fun_sid';

export const PAGESIZE = 10;
