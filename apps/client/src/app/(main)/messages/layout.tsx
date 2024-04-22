import { ReactNode } from 'react';
import { getSiteComment } from '@/api';
import { getCommentCountByPath } from '@/api/comment';
import { Banner } from '@/proComponents/Banner';
import PageContainer from '@/proComponents/PageContainer';

export const metadata = {
  title: '留言板',
};
async function Layout({ children }: { children: ReactNode }) {
  const siteComment = await getSiteComment();
  const path = '/messages';
  let total = 0;
  const enableComment = siteComment?.enableComment;
  if (enableComment) {
    total = await getCommentCountByPath(path);
  }
  return (
    <PageContainer
      pagination={{
        total,
        pageSize: siteComment?.pageSize,
      }}
      type="message"
    >
      <Banner image="/messages.jpg" title="留言板" desc="留下你想对我说的话"></Banner>
      {enableComment && <div className="page-main !pt-4">{children}</div>}
    </PageContainer>
  );
}

export default Layout;
