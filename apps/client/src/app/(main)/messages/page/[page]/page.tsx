import { CommentType } from '@funblog/types';
import Comment from '@/proComponents/Comment';
import UpdatePagination from './UpdatePagination';

async function Messages({ params }: { params: { page: string } }) {
  return (
    <>
      <UpdatePagination page={+params.page} />
      <Comment path={'/messages'} type={CommentType.MESSAGE_BOARD} page={+params.page} />
    </>
  );
}

export default Messages;
