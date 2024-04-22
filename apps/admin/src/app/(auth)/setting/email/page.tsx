'use client';
import { SiteEmail } from '@funblog/types';
import { getSiteEmail, updateSiteEmail } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';

function SettingEmail() {
  return (
    <>
      <PanelSetting
        request={async () => {
          return ((await getSiteEmail()) || {}) as SiteEmail;
        }}
        onSubmit={async (value) => {
          await updateSiteEmail(value);
          message.info('更新成功');
        }}
        steps={[
          {
            title: 'Email 通知',
            list: [
              {
                type: 'text',
                label: '管理员邮箱',
                tooltip: '此邮箱用于接收管理通知，配置好发送服务即可正常使用',
                name: 'email',
              },
            ],
          },
          {
            title: 'Email 发送服务',
            list: [
              { type: 'text', label: 'SMTP 主机', tooltip: '请从邮件服务商处获取', name: 'smtpHost' },
              {
                type: 'digit',
                label: 'SMTP 端口',
                tooltip: '请从邮件服务商处获取：通常不加密的端口是25，SSL加密端口是465',
                name: 'smtpPort',
              },
              {
                type: 'text',
                label: '发件箱账号',
                name: 'senderEmail',
              },
              {
                type: 'password',
                label: '发件箱密码',
                name: 'senderPassword',
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default SettingEmail;
