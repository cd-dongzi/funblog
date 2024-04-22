import { Post } from '@funblog/types';
import { SwiperBanner } from '@/proComponents/Banner';

async function Carousel({ postList }: { postList: Post[] }) {
  return <SwiperBanner posts={postList} />;
}

export default Carousel;
