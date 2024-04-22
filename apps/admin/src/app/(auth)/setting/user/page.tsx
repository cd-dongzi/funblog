'use client';
import { SiteUser } from '@funblog/types';
import { getSiteUser, updateSiteUser } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';
import styles from './style.module.css';

function SettingUser() {
  return (
    <>
      <PanelSetting<SiteUser>
        request={async () => {
          const data = await getSiteUser();
          return (data || {}) as SiteUser;
        }}
        onSubmit={async (value) => {
          await updateSiteUser(value);
          message.info('更新成功');
        }}
        className={styles.wrapper}
        steps={[
          {
            title: '用户管理',
            list: [
              {
                type: 'switch',
                label: '用户注册',
                tooltip: '若关闭，仅拥有邀请码才能注册为本站用户',
                name: 'allowRegister',
              },
              {
                type: 'switch',
                label: '允许普通用户上传头像',
                tooltip: '若关闭，仅管理员、编辑、贡献者可上传',
                name: 'allowUploadAvatar',
              },
              {
                type: 'imageList',
                label: '头像列表',
                tooltip: '头像列表，前端用户可选择的头像',
                name: 'avatarList',
                fieldProps: {
                  multiple: true,
                  cardContainerClassName: '[grid-template-columns:repeat(auto-fill,minmax(80px,1fr))]',
                  cardClassName: '!w-[80px] !h-[80px]',
                  triggerClassName: '!w-[80px] !h-[80px]',
                  triggerType: 'card',
                },
              },
            ],
          },
          {
            title: 'Email 通知',
            list: [
              {
                type: 'switch',
                label: '新用户注册时通知',
                tooltip: '新用户注册时通知管理员',
                name: 'notifyOnUserRegister',
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default SettingUser;
