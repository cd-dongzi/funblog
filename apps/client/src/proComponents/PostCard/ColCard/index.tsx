import { Icon } from '@funblog/components';
import { Post } from '@funblog/types';
import { formatDate } from '@funblog/utils';
import cls from 'classnames';
import { Image } from '@/components/Image';
import Link from '@/components/Link';
import { getResourceUrl } from '@/utils';
import styles from './styles.module.css';

function ColCard({ post }: { post: Post }) {
  return (
    <div
      className={cls(
        'background-card shadow-card transition-all-3 flex flex-col items-center rounded-[1em] border border-solid border-white text-center',
        '[--d-color:#3e508f] [--l-color:#7c8cc6] [--s-color:rgba(62,80,143,0.5)]',
        styles.card,
      )}
    >
      <Link
        href={`/post/${post.id}`}
        className={cls(
          'relative mt-[-0.625em] block w-[calc(100%-0.75em)] pt-[calc(89.45%-0.67em)]',
          'transition-all-3 bg-cover bg-center bg-no-repeat shadow-[1px_0_theme(colors.white/0.5),-1px_0_theme(colors.white/0.5),0_1px_theme(colors.white/0.5)] [transform-style:preserve-3d]',
          styles.cover,
        )}
      >
        <span
          className={cls(
            'filter-blur-4 transform-style-[preserve-3d] transform-translateZ-[-1] transition-all-3 absolute bottom-[-3] left-2 right-2 top-3 rounded-[0.75em] bg-cover bg-center bg-no-repeat opacity-60',
            styles.coverBg,
          )}
          style={{ backgroundImage: `url(${getResourceUrl(post.cover)})` }}
        ></span>
        <Image fill className="rounded-[0.75em]" src={getResourceUrl(post.cover)} />
        <time
          className={cls(
            'transition-all-3 absolute bottom-0 left-0 flex h-10 w-full items-center justify-center rounded-b-[0.75em] bg-[theme(colors.black/0.2)] text-[theme(colors.white)] opacity-0',
            styles.date,
          )}
        >
          {formatDate(post.updateAt)}
        </time>
      </Link>
      <Link
        href={`/post/${post.id}`}
        className={cls(
          'shadow-card-text transition-all-3 mb-1 mt-4 max-w-full px-2 text-sm md:text-base',
          styles.title,
        )}
      >
        <h2 className="wes">{post.title}</h2>
      </Link>
      <div
        className={cls(
          'transition-all-3 transform-origin-left mt-1 flex items-center justify-center gap-x-5 text-sm',
          styles.meta,
        )}
      >
        <span className="flex items-center justify-center gap-x-1 text-xs text-red">
          <Icon name="like" />
          {post.likeCount}
        </span>
        <span className="flex items-center justify-center gap-x-1 text-xs text-primary">
          <Icon name="read" />
          {post.readCount}
        </span>
        <span className="flex items-center justify-center gap-x-1 text-xs text-green">
          <Icon name="message" />
          {post.commentCount}
        </span>
      </div>
      <div
        className={cls(
          'transform-origin-right scale-80 transition-all-3 invisible mt-[-0.7em] w-full overflow-auto whitespace-nowrap px-2 opacity-0',
          styles.tags,
        )}
      >
        {post.tags.map((tag) => (
          <span
            className="mr-2 rounded-full bg-[theme(colors.gray4/0.15)] px-2 py-1 text-xs text-[theme(colors.subTitle)]"
            key={tag.name}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <Link href={`/post/${post.id}`} className={cls('button-card', styles.button)}>
        阅读全文
      </Link>
    </div>
  );
}

export default ColCard;
