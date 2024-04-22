import { Post } from '@funblog/types';
import { formatDate } from '@funblog/utils';
import { Image } from '@/components/Image';
import Link from '@/components/Link';
import { getResourceUrl } from '@/utils';

function RowCard({ post, onClick }: { post: Post; onClick?: () => void }) {
  return (
    <div className="group/card mb-6 mt-4 flex cursor-pointer items-center" onClick={onClick}>
      <Link
        href={`/post/${post.id}`}
        className="transition-all-3 group-hover/card:shadow-gray-shallow relative block h-[70px] w-[70px] overflow-hidden rounded-lg shadow-gray hover:translate-y-1.5"
      >
        <Image fill src={getResourceUrl(post.cover)} />
      </Link>
      <div className="ml-4 flex-1">
        <Link href={`/post/${post.id}`} className="wes-2 transition-color-3 mb-1 group-hover/card:text-title">
          <h2>{post.title}</h2>
        </Link>
        <time className="text-xs">{formatDate(post.updateAt)}</time>
      </div>
    </div>
  );
}

export default RowCard;
