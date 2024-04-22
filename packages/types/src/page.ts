import { User } from './userRole';

export interface PageRelation {
  likeCount: number;
  commentCount: number;
  readCount: number;
}
export interface Page extends PageRelation {
  id: number;
  title: string;
  alias: string;
  content: string;
  summary: string;
  cover: string;
  enableComment: boolean;
  visible: boolean;
  encrypted: boolean;
  password: string;
  userId: number;
  user: User;
  createAt: string;
  updateAt: string;
}
export interface PageMenu {
  type: PageMenuType;
  data: PageMenuButton[];
}

export type PageMenuButton = {
  id: string;
  name: string;
  open: number;
  url?: string;
  icon?: string;
  children?: PageMenuButton[];
} & (
  | {
      buttonType: PageMenuButtonType.TAG;
      value: number;
    }
  | {
      buttonType: PageMenuButtonType.CATEGORY;
      value: number;
    }
  | {
      buttonType: PageMenuButtonType.URL;
    }
  | {
      buttonType: PageMenuButtonType.PAGE;
      value: number;
    }
  | {
      buttonType: PageMenuButtonType.ARTICLE;
      value: number;
    }
);

export enum PageMenuType {
  NAVIGATION_NAV = 'navigation-nav',
  SUB_NAV = 'sub-nav',
}
export enum PageMenuButtonType {
  URL = 'url',
  CATEGORY = 'category',
  ARTICLE = 'article',
  TAG = 'tag',
  PAGE = 'page',
}
