export enum SiteConfigType {
  META = 'meta',
  BLOGGER = 'blogger',
  IMAGE = 'image',
  CACHE = 'cache',
  PAGINATION = 'pagination',
  SOCIAL_ACCOUNT = 'social_account',
  USER = 'user',
  COMMENT = 'comment',
  COMMENT_REVIEW = 'comment_review',
  EMAIL = 'email',
  ADVANCE = 'advance',
  LINK = 'link',
  LAYOUT = 'layout',
}

export interface SiteImageConfig {
  enableWebp: boolean;
  enableThumbnail: boolean;
  storageStrategy: string;
  thumbnailWidth?: number;
  webpThreshold?: number;
  thumbnailThreshold?: number;
}

export interface SiteCacheConfig {
  jwtSecret: string;
  jwtExpiresIn: number;
}
