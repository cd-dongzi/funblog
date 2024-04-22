import { getSitePagination, getPostSearchPage } from '@/api';
import { POST_PAGESIZE } from '@/constants';
import { Banner } from '@/proComponents/Banner';
import { Direction } from '@/proComponents/Banner/components/Bubble/types';
import PageContainer from '@/proComponents/PageContainer';
import PostContent from '@/proComponents/PostContent';

async function Main({ keyword, page }: { keyword: string; page?: number }) {
  const pagination = await getSitePagination();
  const postPageSize = pagination?.postPageSize || POST_PAGESIZE;
  const _page = page || 1;
  const { list: postList, total } = await getPostSearchPage({
    page: _page,
    pageSize: postPageSize,
    keyword,
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
      <Banner image="/search.jpg" title={`搜索：${keyword}`} desc={`找到 ${total} 个结果`} direction={Direction.LEFT} />
      <PostContent className="mt-5 pc:mt-2 pc:px-0 pc:pt-5 mobile:px-2" postList={postList} />
    </PageContainer>
  );
}

export default Main;
