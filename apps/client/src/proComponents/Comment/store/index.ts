import { useContext } from 'react';

import { CommentContext, CommentContextProps } from './context';
import { CommentProvider } from './provider';

export const useCommentStore = () => useContext(CommentContext);
export { CommentContext, CommentProvider };
export type { CommentContextProps };
