import {
  Post,
  Tag,
  PageMenuButton,
  SiteBlogger,
  SiteMeta,
  SitePagination,
  SiteSocialAccount,
  SiteUser,
  User,
  SiteComment,
  SiteLayout,
} from '@funblog/types';
import { createContext } from 'react';

export interface GlobalContextProps {
  userInfo?: User;
  tagList?: Tag[];
  postList?: Post[];
  latestPostList?: Post[];
  popularPostList?: Post[];
  siteMeta?: SiteMeta;
  siteBlogger?: SiteBlogger;
  sitePagination?: SitePagination;
  siteComment?: SiteComment;
  siteSocialAccount?: SiteSocialAccount;
  siteUser?: SiteUser;
  siteLayout?: SiteLayout;
  navigationList?: PageMenuButton[];
}
export interface GlobalContextData extends GlobalContextProps {
  pc: boolean;
  showMSidebar: boolean;
  toggleMSidebar: (bol: boolean) => void;
  updateUserInfo: (userInfo: Partial<User>) => void;
  clearUserInfo: () => void;
  showLogin: boolean;
  toggleLogin: (bol: boolean) => void;
}
export const GlobalContext = createContext({} as GlobalContextData);
