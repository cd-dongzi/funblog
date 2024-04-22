'use client';
import { Comment, CommentStatus } from '@funblog/types';
import { useRef, useState } from 'react';
import { createComment, getCommentPage } from '@/api/comment';
import Notification from '@/components/Notification';
import { useStore } from '@/context';
import EditorBox, { EditorRef } from './EditorBox';
import List from './List';
import { useCommentStore } from '../../store';

function CommentBox() {
  const { value, path, type, commentParams, updateCommentData } = useCommentStore();
  const { siteComment } = useStore();
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<EditorRef>(null);
  const [container, setContainer] = useState<HTMLDivElement>();
  const [parent, setParent] = useState<Comment | undefined>();
  const onFocus = () => {
    editorRef.current?.onFocus();
  };
  const onSubmit = async () => {
    if (!value.trim()) {
      return Notification.error('请输入内容');
    }
    try {
      let status: CommentStatus;
      if (parent) {
        status = await createComment({
          ...commentParams,
          parentId: parent.parentId || parent.id,
          path,
          type,
          content: value,
          replierUserId: parent.userId,
        });
      } else {
        status = await createComment({
          ...commentParams,
          type,
          path,
          content: value,
        });
      }
      if (status === CommentStatus.PENDING) {
        Notification.info('评论成功，已通知管理员审核，审核通过后将显示');
      } else if (status === CommentStatus.APPROVED) {
        Notification.info('评论成功');
      } else if (status === CommentStatus.SPAM) {
        Notification.error('评论失败，检测为垃圾评论');
      }
    } catch (e: any) {
      return Notification.error(e?.message);
    }
    editorRef.current?.onClear();
    onCancel();
    requestAnimationFrame(async () => {
      setLoading(true);
      try {
        const res = await getCommentPage({
          pageSize: siteComment?.pageSize,
          path,
        });
        updateCommentData(res);
      } finally {
        setLoading(false);
      }
    });
  };
  const onCancel = () => {
    setContainer(undefined);
    setParent(undefined);
  };
  const onReply = (dom: HTMLDivElement, item: Comment) => {
    setContainer(dom);
    setParent(item);
    requestAnimationFrame(() => {
      editorRef.current?.onFocus();
    });
  };
  return (
    <>
      {!siteComment?.viewOnly && (
        <EditorBox ref={editorRef} container={container} onFocus={onFocus} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      <List loading={loading} onReply={onReply} />
    </>
  );
}

export default CommentBox;
