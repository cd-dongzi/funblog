import { Post } from '@funblog/types';
import Github from '@/components/Github';

function Meta({ post }: { post: Post }) {
  return (
    <div className="mb-14">
      {post.github && (
        <div className="absolute left-0 top-0 scale-x-[-1] overflow-hidden md:rounded-tr-lg">
          <Github url={post.github} />
        </div>
      )}
    </div>
  );
}

export default Meta;
