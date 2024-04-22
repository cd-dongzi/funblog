import { User } from '@funblog/types';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { metaData } from 'src/config/metaData';
import { Main, Strong, Header, Remind, Section, Ul, Li, LookBtn, ComeBack } from './components';

// 友链模板
export const createLinkMailTemplate = (options: {
  title: string;
  url: string;
  desc: string;
  type: string;
  logo: string;
}) => {
  return renderToString(
    <Main>
      <Header title="友链申请" />
      <Section>
        <Ul>
          <Li label="网站名称：" value={options.title} />
          <Li label="网站地址：" href={options.url} />
          <Li label="网站描述：" value={options.desc} />
          <Li label="网站分类：" value={options.type} />
          <Li label="网站LOGO：" href={options.url} last />
        </Ul>
      </Section>
    </Main>,
  );
};
// 友链审核结果模板
export const createLinkResultMailTemplate = ({
  refuseReason,
  user,
  blog,
}: {
  refuseReason: string;
  user: {
    name: string;
  };
  blog: {
    title: string;
    url: string;
    desc: string;
    type: string;
    logo: string;
  };
}) => {
  return renderToString(
    <Main>
      <Header title={`${user.name},`}>
        {refuseReason ? (
          <Remind>
            您在 <Strong>{metaData.config.meta?.title}</Strong> 上的友链未通过!
          </Remind>
        ) : (
          <Remind>
            恭喜您在 <Strong>{metaData.config.meta?.title}</Strong> 上的友链申请审核成功啦!
          </Remind>
        )}
      </Header>
      {refuseReason && <Section title="审核未通过原因：">{refuseReason}</Section>}
      <Section title="您的信息：">
        <Ul>
          <Li label="网站名称：" value={blog.title} />
          <Li label="网站地址：" href={blog.url} />
          <Li label="网站描述：" value={blog.desc} />
          <Li label="网站分类：" value={blog.type} />
          <Li label="网站LOGO：" href={blog.url} last />
        </Ul>
      </Section>
      <LookBtn href={`${metaData.config.meta?.url}/links`}>点击查看</LookBtn>
      <ComeBack href={metaData.config.meta?.url} title={metaData.config.meta?.title} />
    </Main>,
  );
};

// 留言板模板
export const createCommentMailTemplate = (options: {
  username: string;
  content: string;
  title?: string;
  url?: string;
}) => {
  return renderToString(
    <Main>
      <Header title={options.title || '新的留言'} />
      <Section title={`${options.username}：`} html={options.content} />
      <LookBtn href={options.url}>点击查看</LookBtn>
    </Main>,
  );
};

// 留言板回复模板
export const createReplyCommentMailTemplate = (options: {
  username: string;
  replyUsername: string;
  content: string;
  replyContent: string;
  title?: string;
  url?: string;
}) => {
  return renderToString(
    <Main>
      <Header title={`${options.username}，`}>
        有人回复了您在 <Strong>{options.title || metaData.config.meta?.title}</Strong> 上的留言
      </Header>
      <Section html={options.content} />
      <Section
        title={
          <div>
            被 <Strong>{options.replyUsername}</Strong> 回复：
          </div>
        }
        html={options.replyContent}
      />
      <LookBtn href={options.url}>点击查看</LookBtn>
      <ComeBack href={metaData.config.meta?.url} title={metaData.config.meta?.title} />
    </Main>,
  );
};

// 博客留言模板
export const createBlogCommentMailTemplate = (options: {
  _id: string;
  commentId: string;
  name: string;
  content: string;
  title: string;
  floor: number;
}) => {
  return renderToString(
    <Main>
      <Header title={`文章标题：${options.title}`} />
      <Section title={`${options.name}${options.floor ? `（${options.floor}楼）` : ''}：`} html={options.content} />
      <LookBtn href={`${metaData.config.meta?.url}/article/${options._id}#comment-${options.commentId}`}>
        点击查看
      </LookBtn>
    </Main>,
  );
};

// 博客留言回复模板
export const createReplyBlogCommentMailTemplate = (options: {
  data: {
    name: string;
    content: string;
  };
  replyData: {
    name: string;
    content: string;
  };
  _id: string;
  commentId: string;
  floor: number;
  title: string;
}) => {
  return renderToString(
    <Main>
      <Header title={`${options.data.name}，`}>
        有人回复了您在 <Strong>《{options.title}》</Strong> 文章内的留言
      </Header>
      <Section title={`您的留言（${options.floor}楼）：`} html={options.data.content} />
      <Section
        title={
          <div>
            被 <Strong>{options.replyData.name}</Strong> 回复：
          </div>
        }
        html={options.replyData.content}
      />
      <LookBtn href={`${metaData.config.meta?.url}/article/${options._id}#comment-${options.commentId}`}>
        点击查看
      </LookBtn>
      <ComeBack href={metaData.config.meta?.url} title={metaData.config.meta?.title} />
    </Main>,
  );
};

export const createUserRegisterMailTemplate = ({ user, title }: { title: string; user: Partial<User> }) => {
  return renderToString(
    <Main>
      <Header title={title} />
      <Section title="用户信息：">
        <Ul>
          <Li label="用户名：" value={user.username} />
          <Li label="用户邮箱：" value={user.email} />
          {!!user.url && <Li label="网站地址：" href={user.url} />}
          {!!user.invitationCodeId && <Li label="邀请码：" href={user.invitationCodeId} />}
        </Ul>
      </Section>
      <ComeBack href={metaData.config.meta?.url} title={metaData.config.meta?.title} />
    </Main>,
  );
};
