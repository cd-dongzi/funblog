import { SiteComment, SiteImage, SiteCommentReview, SiteEmail, SiteMeta, SiteUser } from '@funblog/types';

export interface MetaDataConfig {
  meta: Partial<SiteMeta>;
  image: Partial<SiteImage>;
  comment: Partial<SiteComment>;
  commentReview: Partial<SiteCommentReview>;
  email: Partial<SiteEmail>;
  user: Partial<SiteUser>;
}
export const metaData = {
  config: {} as Partial<MetaDataConfig>,
};

export const updateMetaDataConfig = (data: Partial<MetaDataConfig>) => {
  metaData.config = {
    ...metaData.config,
    ...data,
  };
};
