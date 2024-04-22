'use client';
import { LINK_LIST } from '@funblog/constants';
import { SiteBlogger, SiteLink, SiteSocialAccount } from '@funblog/types';
import {
  getSiteBlogger,
  getSiteLink,
  getSiteSocialAccount,
  getUserList,
  updateSiteBlogger,
  updateSiteLink,
  updateSiteSocialAccount,
} from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { formRules } from '@/config/formRules';
import { message } from '@/lib/EscapeAntd';

function SettingBlogger() {
  return (
    <>
      <PanelSetting<SiteBlogger>
        title="博主信息"
        request={async () => {
          const data = await getSiteBlogger();
          return (data || {}) as SiteBlogger;
        }}
        onSubmit={async (value) => {
          await updateSiteBlogger(value);
          message.info('更新成功');
        }}
        list={[
          {
            type: 'imageList',
            label: '头像',
            name: 'avatar',
            fieldProps: {
              triggerType: 'card',
            },
          },
          {
            type: 'text',
            label: '昵称',
            name: 'username',
          },
          {
            type: 'text',
            label: '描述',
            name: 'desc',
          },
          {
            type: 'select',
            label: '博客管理员列表',
            name: 'adminUsers',
            loadOnce: true,
            fieldProps: {
              mode: 'multiple',
              showSearch: true,
              filterOption: (inputValue, item: any) => {
                if (!inputValue) return true;
                return item.label.includes(inputValue);
              },
            },
            request: async () => {
              const list = await getUserList();
              return list.map((item) => ({ label: item.username, value: item.id }));
            },
          },
        ]}
      />
      <PanelSetting<SiteSocialAccount>
        title="社交账号"
        request={async () => {
          const data = await getSiteSocialAccount();
          return (data || {}) as SiteSocialAccount;
        }}
        onSubmit={async (value) => {
          await updateSiteSocialAccount(value);
          message.info('更新成功');
        }}
        list={[
          {
            type: 'formList',
            label: '账号列表',
            name: 'links',
            listItems: [
              { type: 'text', label: '名字', name: 'name' },
              { type: 'text', label: '链接', name: 'url' },
            ],
          },
        ]}
      />
      <PanelSetting<SiteLink>
        title="友链信息"
        request={async () => {
          const data = await getSiteLink();
          return (data || {}) as SiteLink;
        }}
        onSubmit={async (value) => {
          await updateSiteLink(value);
          message.info('更新成功');
        }}
        list={[
          { type: 'text', label: '网站名称', name: 'title' },
          {
            type: 'text',
            label: '网站地址',
            name: 'url',
            rules: [formRules.url],
          },
          { type: 'text', label: '网站描述', name: 'desc' },
          { type: 'text', label: '网站LOGO', name: 'logo', rules: [formRules.url] },
          {
            type: 'select',
            label: '网站分类',
            name: 'type',
            options: LINK_LIST,
          },
        ]}
      />
    </>
  );
}

export default SettingBlogger;
