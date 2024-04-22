'use client';
import { CommentProvider, CommentContextProps } from './store';

function CommentState({ children, ...props }: { children: React.ReactNode } & Partial<CommentContextProps>) {
  return <CommentProvider {...props}>{children}</CommentProvider>;
}

export default CommentState;
