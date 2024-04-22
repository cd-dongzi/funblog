import { CommentType } from '@funblog/types';
import Comment from '@/proComponents/Comment';

async function Messages() {
  return <Comment path={'/messages'} type={CommentType.MESSAGE_BOARD} />;
}

export default Messages;
