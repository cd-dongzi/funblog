export interface SiteMeta {
  title: string;
  keywords: string;
  description: string;
  favicon: string;
  logo: string;
  url: string;
  resourceUrl: string;
  serverUrl: string;
  adminUrl: string;
  footerLinks: { text: string; url?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface SiteImage {
  enableWebp: boolean;
  webpThreshold: number;
  thumbnailThreshold: number;
  enableThumbnail: boolean;
  thumbnailWidth: number;
  storageStrategy: string;
}

export interface SiteBlogger {
  avatar: string;
  username: string;
  desc: string;
  adminUsers?: number[];
}

export interface SiteAdvance {
  tokenExpiresIn: number;
}
export interface SitePagination {
  postPageSize: number;
  commentPageSize: number;
}
export interface SiteSocialAccount {
  links: { name: string; url: string }[];
}
export interface SiteUser {
  allowRegister: boolean;
  allowUploadAvatar: boolean;
  avatarList: string[];
  notifyOnUserRegister: boolean;
}

export interface SiteComment {
  pageSize: number;
  enableComment: boolean;
  viewOnly: boolean;
  review: boolean;
  approvedPass: boolean;
  notifyAfterComment: boolean;
  emailAfterApproval: boolean;
  emailAfterReply: boolean;
  emojiList: { name: string; value: string }[];
}

export interface SiteCommentReview {
  forceReviewKeywords?: string;
  forbiddenKeywords?: string;
}

export interface SiteEmail {
  email: string;
  smtpHost: string;
  smtpPort: number;
  senderEmail: string;
  senderPassword: string;
}

export interface SiteLink {
  title: string;
  desc: string;
  url: string;
  logo: string;
  type: string;
  visible: boolean;
  status: string;
  createdAt: string;
}

export interface SiteLayout {
  showSidebar: boolean;
}
