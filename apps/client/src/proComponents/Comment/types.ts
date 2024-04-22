import { CommentType } from '@funblog/types';

export interface EditorProps {
  className?: string;
  placeholder?: string;
}

export type CommentProps = EditorProps & {
  path: string;
  page?: number;
  type?: CommentType;
  commentParams?: {
    postId?: number;
    pageId?: number;
  };
};
