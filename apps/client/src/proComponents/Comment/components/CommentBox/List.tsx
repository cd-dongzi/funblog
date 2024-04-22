'use client';
import { Icon } from '@funblog/components';
import { Comment } from '@funblog/types';
import { filterXSS, formatDate } from '@funblog/utils';
import cls from 'classnames';
import { useRef } from 'react';
import Loading from '@/components/Loading';
import { useStore } from '@/context';
import { getResourceUrl } from '@/utils';
import { useCommentStore } from '../../store';

interface ItemProps {
  item: Comment;
  onReply: (dom: HTMLDivElement, item: Comment) => void;
  parentUserId?: number;
}

const Name = ({ url, children }: { url?: string; children: React.ReactNode }) => {
  const classNames = 'font-bold	text-sm transition-all-3';
  if (url) {
    return (
      <a target="_blank" className={cls('transition-all-3 hover:text-primary', classNames)} href={url}>
        {children}
      </a>
    );
  }
  return <span className={classNames}>{children}</span>;
};
const MessageItem = ({ item, onReply }: ItemProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { siteBlogger, siteComment } = useStore();
  const handleReply = () => {
    if (!editorRef.current) return;
    onReply(editorRef.current, item);
  };
  return (
    <>
      <div className="group/item flex">
        <div className="transition-all-3 h-10 w-10 rounded-md border border-solid border-gray8 group-hover/item:border-primary">
          <div
            className="bg-image h-full w-full rounded-md border-2 border-solid border-gray8"
            style={{
              backgroundImage: `url(${getResourceUrl(item.user.avatar)})`,
            }}
          />
        </div>
        <div className="flex-1">
          <div className="transition-all-3 relative flex items-center justify-between border-b border-solid border-gray8 px-1.5 group-hover/item:border-primary">
            <div className="inline-middle">
              <Name url={item.user.url}>
                {item.user.username}
                {siteBlogger?.adminUsers?.some((v) => v === item.user.id) ? '（管理员）' : ''}
              </Name>
              {item.replierUser && (
                <>
                  <span className="mx-1.5 text-xs text-gray4">回复</span>
                  <Name url={item.replierUser.url}>
                    {item.replierUser.username}
                    {siteBlogger?.adminUsers?.some((v) => v === item.replierUser?.id) ? '（管理员）' : ''}
                  </Name>
                </>
              )}
            </div>
            <time
              className={cls('transition-all-3 text-xs', {
                'group-hover/item:-translate-x-[38px]': !siteComment?.viewOnly,
              })}
            >
              {formatDate(item.createdAt, 'M月D日 · YYYY年')}
            </time>
            {!siteComment?.viewOnly && (
              <div
                className={cls(
                  'transition-all-3 absolute bottom-0 right-0 flex items-center justify-center [transform:translate(38px,50%)]',
                  'pointer-events-none cursor-pointer rounded-[10px] border border-solid border-gray8 bg-white px-2.5 leading-[20px] text-gray4 opacity-0',
                  'shadow-[0_3px_5px_theme(colors.primary/0.1)]',
                  'group-hover/item:color-primary group-hover/item:pointer-events-auto group-hover/item:border-primary group-hover/item:opacity-100 group-hover/item:shadow-[0_5px_8px_theme(colors.primary/0.3)] group-hover/item:[transform:translate(0,50%)]',
                )}
                onClick={handleReply}
              >
                <Icon name="reply" className="text-md" />
              </div>
            )}
          </div>
          <div className="mb-2.5 mt-1 px-1.5 pt-1" dangerouslySetInnerHTML={{ __html: filterXSS(item.content) }}></div>
        </div>
      </div>
      <div className="ml-12" ref={editorRef}></div>
    </>
  );
};

function Item({ item, onReply }: ItemProps) {
  return (
    <>
      <MessageItem item={item} onReply={onReply} />
      <div className="ml-12">
        <ul>
          {item.children?.map((v, i) => (
            <li key={`${v.user.id}-${i}`}>
              <MessageItem item={v as Comment} onReply={onReply} parentUserId={item.user.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
function List({
  loading,
  onReply,
}: Pick<ItemProps, 'onReply'> & {
  loading: boolean;
}) {
  const { commentData } = useCommentStore();
  return (
    <div className="relative mt-4">
      {commentData?.list.map((item) => {
        return <Item key={item.id} item={item} onReply={onReply} />;
      })}
      <div
        className={cls(
          'transition-all-3 pointer-events-none absolute left-0 top-0 h-full w-full bg-white/50 opacity-0',
          {
            'pointer-events-auto opacity-100': loading,
          },
        )}
      >
        <div className="flex h-full max-h-[400px] w-full items-center justify-center">
          <Loading />
        </div>
      </div>
    </div>
  );
}

export default List;
