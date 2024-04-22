import { Comment, PageRes } from '@funblog/types';
import { createContext } from 'react';
import { CommentProps } from '../types';

export type CommentContextProps = Omit<CommentProps, 'className'> & {
  commentData?: PageRes<Comment>;
  value: string;
  onChange: (value: string) => void;
  onAddText: (value: string) => void;
  updateCommentData: (data: PageRes<Comment>) => void;
};
export const CommentContext = createContext({} as CommentContextProps);
