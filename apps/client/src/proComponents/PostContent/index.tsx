import { Post } from '@funblog/types';
import LayoutContainer from '@/components/LayoutContainer';
import { ColCard } from '@/proComponents/PostCard';

async function PostContent({ className, postList }: { className?: string; postList: Post[] }) {
  return (
    <LayoutContainer className={className}>
      {postList.map((post) => (
        <ColCard key={post.id} post={post} />
      ))}
    </LayoutContainer>
  );
}

export default PostContent;
