'use client';
import { SiteComment, SiteCommentReview } from '@funblog/types';
import { getSiteComment, getSiteCommentReview, updateSiteComment, updateSiteCommentReview } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';

function SettingComment() {
  return (
    <>
      <PanelSetting
        request={async () => {
          return ((await getSiteComment()) || {}) as SiteComment;
        }}
        onSubmit={async (value) => {
          await updateSiteComment(value);
          message.info('更新成功');
        }}
        steps={[
          {
            title: '显示与发表',
            list: [
              {
                type: 'digit',
                label: '每页显示条数',
                name: 'pageSize',
              },
              {
                type: 'switch',
                label: '开启评论',
                name: 'enableComment',
              },
              {
                type: 'switch',
                label: '评论仅查看',
                name: 'viewOnly',
              },
            ],
          },
          {
            title: '评论显示前',
            list: [
              {
                type: 'switch',
                label: '需人工审核',
                name: 'review',
              },
              {
                type: 'switch',
                label: '已批可直通',
                name: 'approvedPass',
                tooltip: '评论者曾经有评论通过了审核时，再次评论无需审核直接通过',
              },
            ],
          },
          {
            title: 'emoji表情',
            list: [
              {
                type: 'formList',
                label: 'emoji表情',
                name: 'emojiList',
                listItems: [
                  { type: 'text', label: '类型', name: 'name' },
                  { type: 'text', label: '值', name: 'value' },
                ],
              },
            ],
          },
          {
            title: 'Email 通知',
            list: [
              {
                type: 'switch',
                label: '评论通知',
                name: 'notifyAfterComment',
              },
            ],
          },
          {
            title: 'Email 通知评论作者',
            list: [
              {
                type: 'switch',
                label: '评论批准后',
                name: 'emailAfterApproval',
              },
              {
                type: 'switch',
                label: '评论被回复',
                name: 'emailAfterReply',
              },
            ],
          },
        ]}
      />
      <PanelSetting
        title="评论过滤"
        request={async () => {
          return ((await getSiteCommentReview()) || {}) as SiteCommentReview;
        }}
        onSubmit={async (value) => {
          await updateSiteCommentReview(value);
          message.info('更新成功');
        }}
        list={[
          {
            type: 'textarea',
            label: '强制审核词',
            name: 'forceReviewKeywords',
            required: false,
            tooltip:
              '当评论者的内容、昵称、个人主页、电子邮箱、IP或UA中包含这些关键词，这条评论将被设为待审。每个词用英文逗号分开',
          },
          {
            type: 'textarea',
            label: '禁止使用词',
            name: 'forbiddenKeywords',
            required: false,
            tooltip:
              '当评论者的内容、昵称、个人主页、电子邮箱、IP或UA中包含这些关键词，这条评论将被设为垃圾评论。每个词用英文逗号分开',
          },
        ]}
      />
    </>
  );
}

export default SettingComment;
