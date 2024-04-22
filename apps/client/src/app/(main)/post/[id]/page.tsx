import { CommentType } from '@funblog/types';
import { parseMarkdown } from '@funblog/utils';
import cls from 'classnames';
import { checkPostLikeStatus, getPostInfo, getSiteComment, updatePostReadNum } from '@/api';
import { getCommentCountByPath } from '@/api/comment';
import { CoverBanner } from '@/proComponents/Banner';
import Comment from '@/proComponents/Comment';
import PageContainer from '@/proComponents/PageContainer';
import { COMMENT_CLASS_NAME, MARKDOWN_CONTENT_ID } from './constants';
import Content from './Content';
import Meta from './Meta';
import Shortcut from './Shortcut';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getPostInfo(+params.id);
  if (data) {
    return {
      title: data.title,
    };
  }
}

async function PostPage({ params }: { params: { id: string } }) {
  const id = +params.id;
  const path = `/post/${id}`;
  const [post, alreadyLiked, siteComment] = await Promise.all([
    getPostInfo(id),
    checkPostLikeStatus(id),
    getSiteComment(),
  ]);
  updatePostReadNum(id);
  const enableComment = post?.enableComment && siteComment?.enableComment;
  let total = 0;
  if (enableComment) {
    total = await getCommentCountByPath(path);
  }
  return (
    <PageContainer
      scroll
      pagination={{
        total,
        pageSize: siteComment?.pageSize,
      }}
    >
      <CoverBanner post={post} />
      <Content>
        <div className="shadow-card relative mb-5 overflow-hidden bg-white px-4 py-2 md:rounded-xl md:p-4 xl:px-8 pc:overflow-visible">
          <Meta post={post} />
          <Shortcut post={post} alreadyLiked={alreadyLiked} commentCount={total} />
          <div
            id={MARKDOWN_CONTENT_ID}
            className="md-container"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          ></div>
        </div>
        {enableComment && (
          <Comment
            className={cls(COMMENT_CLASS_NAME, 'pc:shadow-card')}
            path={path}
            type={CommentType.POST}
            commentParams={{
              postId: post.id,
            }}
          />
        )}
      </Content>
    </PageContainer>
  );
}

export default PostPage;
