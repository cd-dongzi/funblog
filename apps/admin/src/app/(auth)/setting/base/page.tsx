'use client';
import { SiteMeta, SitePagination } from '@funblog/types';
import { getSiteMeta, getSitePagination, updateSiteMeta, updateSitePagination } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';

function SettingBase() {
  return (
    <>
      <PanelSetting<SiteMeta>
        title="站点信息"
        request={async () => {
          const data = await getSiteMeta();
          return (data || {}) as SiteMeta;
        }}
        onSubmit={async (value) => {
          await updateSiteMeta(value);
          message.info('更新成功');
        }}
        list={[
          { type: 'text', label: '站点名称', name: 'title' },
          { type: 'text', label: 'keywords', name: 'keywords' },
          { type: 'text', label: 'description', name: 'description' },
          {
            type: 'imageList',
            label: 'favicon',
            name: 'favicon',
            fieldProps: {
              triggerType: 'card',
            },
          },
          {
            type: 'imageList',
            label: 'logo',
            name: 'logo',
            fieldProps: {
              triggerType: 'card',
            },
          },
          {
            type: 'formList',
            label: '页脚文本',
            name: 'footerLinks',
            listItems: [
              { type: 'text', label: '文本', name: 'text' },
              { type: 'text', label: '链接', name: 'url', required: false },
            ],
          },
          {
            type: 'text',
            label: '资源url',
            name: 'resourceUrl',
            tooltip: '此地址用于图片等资源, 结尾不要带/，例如：https://www.example.com',
          },
          {
            type: 'text',
            label: '服务端url',
            name: 'serverUrl',
            tooltip: '此地址是服务端地址, 结尾不要带/，例如：https://www.example.com',
          },
          {
            type: 'text',
            label: '管理端url',
            name: 'adminUrl',
            tooltip: '此地址是管理后台地址, 结尾不要带/，例如：https://www.example.com',
          },
          {
            type: 'text',
            label: '站点url',
            name: 'url',
            tooltip: '此地址是客户端地址, 结尾不要带/，例如：https://www.example.com',
          },
        ]}
      />
      <PanelSetting<SitePagination>
        title="分页条数"
        request={async () => {
          const data = await getSitePagination();
          return (data || {}) as SitePagination;
        }}
        onSubmit={async (value) => {
          await updateSitePagination(value);
        }}
        list={[
          { type: 'digit', label: '文章每页条数', name: 'postPageSize', width: 100 },
          // { type: 'digit', label: '评论每页条数', name: 'commentPageSize', width: 100 },
        ]}
      />
    </>
  );
}

export default SettingBase;
