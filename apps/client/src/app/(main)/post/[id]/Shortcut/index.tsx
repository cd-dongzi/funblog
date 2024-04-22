'use client';
import { Icon } from '@funblog/components';
import { Post } from '@funblog/types';
import { cacheLocal } from '@funblog/utils';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import { updatePostLikeNum } from '@/api';
import BadgeRibbon from '@/components/BadgeRibbon';
import Notification from '@/components/Notification';
import Tooltip from '@/components/Tooltip';
import { usePageStore } from '@/context';
import { COMMENT_CLASS_NAME } from '../constants';

const Container = React.forwardRef<
  HTMLDivElement,
  {
    icon: string;
    content?: number | string;
    onClick?: () => void;
    className?: string;
    active?: boolean;
  }
>(({ icon, content, onClick, className, active, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cls(
        'mx-2 flex h-full cursor-pointer items-center text-white/70 hover:text-white',
        {
          '!text-white': active,
        },
        className,
      )}
      onClick={active ? undefined : onClick}
    >
      <Icon name={icon} />
      {!!content && <span className="ml-1 text-xs">{content}</span>}
    </div>
  );
});

const HIDE_ARTICLE_SIDEBAR_KEY = 'HIDE_ARTICLE_SIDEBAR_KEY';
function Shortcut({ post, alreadyLiked, commentCount }: { post: Post; alreadyLiked: boolean; commentCount: number }) {
  const [liked, setLiked] = useState(alreadyLiked);
  const [likeCount, setLikeNum] = useState(post.likeCount);
  const { showSidebar, setShowSidebar } = usePageStore();
  useEffect(() => {
    const key = cacheLocal.get(HIDE_ARTICLE_SIDEBAR_KEY);
    setShowSidebar(key !== true);
  }, [setShowSidebar]);
  return (
    <BadgeRibbon className="!absolute -right-2.5 top-0 md:top-4" placement="right">
      <div className="flex h-full items-center">
        <Tooltip content={liked ? '已点赞' : '点赞'} className="!text-xs" appendBody>
          <Container
            icon="like"
            content={likeCount}
            active={liked}
            onClick={async () => {
              await updatePostLikeNum(post.id);
              Notification.info('点赞成功');
              setLiked(true);
              setLikeNum((prev) => prev + 1);
            }}
          />
        </Tooltip>
        <Tooltip content="留言" className="!text-xs" appendBody>
          <Container
            icon="message"
            content={commentCount}
            onClick={() => {
              document.querySelector(`.${COMMENT_CLASS_NAME}`)?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          />
        </Tooltip>
        <Tooltip content={`${showSidebar ? '隐藏' : '显示'}侧边栏`} className="!text-xs">
          <Container
            className="!hidden pc:!flex"
            icon={showSidebar ? 'expand' : 'collapse'}
            onClick={() => {
              setShowSidebar(!showSidebar);
              cacheLocal.set(HIDE_ARTICLE_SIDEBAR_KEY, showSidebar);
            }}
          />
        </Tooltip>
      </div>
    </BadgeRibbon>
  );
}

export default Shortcut;
