import { Category } from './category';
import { Tag } from './tag';
import { User } from './userRole';

export interface PostRelation {
  likeCount: number;
  commentCount: number;
  readCount: number;
}
export interface Post extends PostRelation {
  id: number;
  title: string;
  alias: string;
  content: string;
  summary: string;
  github: string;
  cover: string;
  priority: number;
  enableComment: boolean;
  visible: boolean;
  encrypted: boolean;
  password: string;
  tags: Tag[];
  categories: Category[];
  userId: number;
  user: User;
  createAt: string;
  updateAt: string;
}

export type PostQuery = Partial<Omit<Post, 'categories' | 'tags'>> & {
  categories?: string[];
  tags?: string[];
};
