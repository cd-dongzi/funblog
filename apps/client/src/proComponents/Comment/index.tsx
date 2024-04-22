import { PAGESIZE } from '@funblog/constants';
import cls from 'classnames';
import { getSiteComment } from '@/api';
import { getCommentPage } from '@/api/comment';
import { COMMENT_ID } from '@/constants';
import CommentBox from './components/CommentBox';
import Meta from './components/Meta';
import CommentState from './State';
import { CommentProps } from './types';
async function Comment({ className, page = 1, ...props }: CommentProps) {
  const siteComment = await getSiteComment();
  const commentData = await getCommentPage({
    pageSize: siteComment?.pageSize || PAGESIZE,
    page,
    path: props.path,
  });
  return (
    <CommentState commentData={commentData} {...props}>
      <div id={COMMENT_ID} className={cls('bg-white p-[--p] [--p:theme(spacing.7)] pc:rounded-lg', className)}>
        <Meta />
        <CommentBox />
      </div>
    </CommentState>
  );
}

export default Comment;
