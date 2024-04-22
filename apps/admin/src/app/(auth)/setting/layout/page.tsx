'use client';
import { SiteLayout } from '@funblog/types';
import { getSiteLayout, updateSiteLayout } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';

function SettingAdvance() {
  return (
    <>
      <PanelSetting<SiteLayout>
        request={async () => {
          const data = await getSiteLayout();
          return (data || {}) as SiteLayout;
        }}
        onSubmit={async (value) => {
          await updateSiteLayout(value);
          message.info('更新成功');
        }}
        steps={[
          {
            title: '布局设置',
            list: [
              {
                type: 'switch',
                label: '是否显示侧边栏',
                name: 'showSidebar',
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default SettingAdvance;
