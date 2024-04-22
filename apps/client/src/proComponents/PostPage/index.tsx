import { PostQuery } from '@funblog/types';
import { getPageMenuSubList, getSitePagination, getPostPage } from '@/api';
import { POST_PAGESIZE } from '@/constants';
import { NavigationSidebarWithContext } from '@/proComponents/NavigationSidebar';
import PageContainer from '@/proComponents/PageContainer';
import PostContent from '@/proComponents/PostContent';
import Carousel from './Carousel';
import ScrollTags from './ScrollTags';

async function PostPage({ page, query = {} } = {} as { page?: number; query?: PostQuery }) {
  const pagination = await getSitePagination();
  const postPageSize = pagination?.postPageSize || POST_PAGESIZE;
  const subList = await getPageMenuSubList();
  const _page = page || 1;
  const { list: postList, total } = await getPostPage({
    page: _page,
    pageSize: postPageSize,
    ...query,
  });

  return (
    <PageContainer
      type="page"
      pagination={{
        total,
        page: _page,
        pageSize: postPageSize,
      }}
    >
      <Carousel postList={postList} />
      <NavigationSidebarWithContext>
        <ScrollTags list={subList} />
        <PostContent className="mt-5 pc:mt-2 pc:px-0 mobile:px-2 mobile:pb-12" postList={postList} />
      </NavigationSidebarWithContext>
    </PageContainer>
  );
}

export default PostPage;
