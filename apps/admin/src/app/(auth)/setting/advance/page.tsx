'use client';
import { SiteAdvance } from '@funblog/types';
import { getSiteAdvance, updateSiteAdvance } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';

function SettingAdvance() {
  return (
    <>
      <PanelSetting<SiteAdvance>
        request={async () => {
          const data = await getSiteAdvance();
          return (data || {}) as SiteAdvance;
        }}
        onSubmit={async (value) => {
          await updateSiteAdvance(value);
          message.info('更新成功， token缓存时长的变更将在下次重启后生效');
        }}
        steps={[
          {
            title: 'token设置',
            list: [
              {
                type: 'digit',
                label: '缓存时长',
                name: 'tokenExpiresIn',
                tooltip: 'token缓存时长',
                fieldProps: { suffix: '天' },
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default SettingAdvance;
