import { CommentType } from '@funblog/types';
import { parseMarkdown } from '@funblog/utils';
import type { Metadata } from 'next';
import { getPageInfo, getPageList, getSiteComment } from '@/api';
import { getCommentCountByPath } from '@/api/comment';
import NotFound from '@/components/NotFound';
import { Banner } from '@/proComponents/Banner';
import Comment from '@/proComponents/Comment';
import PageContainer from '@/proComponents/PageContainer';
import { getResourceUrl } from '@/utils';

export async function generateStaticParams() {
  const data = await getPageList();
  return (data || []).map((item) => ({
    page: item.alias,
  }));
}

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const data = await getPageInfo(params.page);
  if (data) {
    return {
      title: data.title,
    };
  }
  return {
    title: 'Not Found - 404',
  };
}

async function Page({ params }: { params: { page: string } }) {
  const page = params.page;
  const path = `/${page}`;
  const [data, siteComment] = await Promise.all([getPageInfo(page), getSiteComment()]);

  let total = 0;
  const enableComment = data?.enableComment && siteComment?.enableComment;
  if (enableComment) {
    total = await getCommentCountByPath(path);
  }

  if (data) {
    return (
      <PageContainer
        pagination={{
          total,
          pageSize: siteComment?.pageSize,
        }}
      >
        <div>
          <Banner image={getResourceUrl(data.cover)} title={data.title} desc={data.summary}></Banner>
          <div className="page-main px-8 pc:mb-5 mobile:mb-2">
            <div className="page-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(data.content) }}></div>
          </div>
          {enableComment && (
            <Comment
              className="pc:shadow-card"
              type={CommentType.PAGE}
              path={path}
              commentParams={{
                pageId: data.id,
              }}
            />
          )}
        </div>
      </PageContainer>
    );
  }
  return <NotFound />;
}

export const revalidate = 0;
export default Page;
