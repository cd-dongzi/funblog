'use client';
import { Icon } from '@funblog/components';
import BadgeRibbon from '@/components/BadgeRibbon';
import { useCommentStore } from '../../store';

function CommentMeta() {
  const { commentData } = useCommentStore();
  return (
    <div className="-ml-[calc(var(--p)+10px)] mb-[--p]">
      <BadgeRibbon>
        <div className="flex items-center px-8">
          <Icon name="message" />
          <span className="ml-2.5">{commentData?.total || 0}条留言</span>
        </div>
      </BadgeRibbon>
    </div>
  );
}

export default CommentMeta;
