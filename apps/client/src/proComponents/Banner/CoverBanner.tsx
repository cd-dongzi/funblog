'use client';
import { Icon } from '@funblog/components';
import { Post } from '@funblog/types';
import { formatDate } from '@funblog/utils';
import cls from 'classnames';
import { Image } from '@/components/Image';
import { getResourceUrl } from '@/utils';
import * as styles from './classNames';
import Bubble from './components/Bubble';
import Card from './components/Card';
import Cover from './components/Cover';
import Size from './components/Size';

function MetaItem({ icon, text, children }: { icon: string; text?: string | number; children?: React.ReactNode }) {
  return (
    <div className="mr-2 inline-block align-middle">
      <div className="flex items-center">
        <Icon name={icon} className="mr-1" />
        {text ? <span>{text}</span> : children}
      </div>
    </div>
  );
}

function CoverBanner({ post, className }: { post: Post; className?: string }) {
  return (
    <Card className={cls(className, 'mobile:pt-[theme(spacing.headerH)]')}>
      <Cover image={getResourceUrl(post.cover)} />
      <Bubble className={styles.bubble} />
      <div className={cls(styles.content, 'pc:[--sw:370px]')}>
        <div className={styles.info}>
          <div className={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={tag.name}>
                {tag.name}
                {index < post.tags.length - 1 && <i className={styles.i}>·</i>}
              </span>
            ))}
          </div>
          <div className={cls(styles.title, 'pc:!mb-4')}>{post.title}</div>
          <div className="text-xs opacity-75">
            <MetaItem icon="read" text={post.readCount || 0} />
            <MetaItem icon="time" text={formatDate(post.updateAt)} />
          </div>
        </div>
        <div className="flex w-[--sw] justify-center">
          <Size className="relative h-[--h] w-[--w] overflow-hidden rounded-lg">
            <Image fill src={getResourceUrl(post.cover)} />
          </Size>
        </div>
      </div>
    </Card>
  );
}

export default CoverBanner;
