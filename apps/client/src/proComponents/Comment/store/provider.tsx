import { useEffect, useState } from 'react';
import { getCommentPage } from '@/api/comment';
import { usePageStore } from '@/context';
import { CommentContext, CommentContextProps } from './context';

export const CommentProvider = ({
  children,
  ...props
}: { children: React.ReactNode } & Partial<CommentContextProps>) => {
  const { pagination } = usePageStore();
  const [value, setValue] = useState('');
  const [commentData, setCommentData] = useState(props.commentData);
  const updateCommentData = (data: CommentContextProps['commentData']) => {
    setCommentData(data);
  };
  const onAddText = (val: string) => {
    setValue((prev) => prev + val);
  };
  const onChange = (val: string) => {
    setValue(val);
  };
  useEffect(() => {
    if (props.path && pagination?.pageSize && pagination?.page) {
      getCommentPage({
        pageSize: pagination?.pageSize,
        page: pagination?.page,
        path: props.path,
      }).then((data) => {
        setCommentData(data);
      });
    }
  }, [pagination, props.path]);
  return (
    <CommentContext.Provider
      value={{
        ...(props as CommentContextProps),
        commentData,
        updateCommentData,
        value,
        onChange,
        onAddText,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
