'use client';
import cls from 'classnames';
import { updateUserAvatar, updateUserInfo, updateUserPassword } from '@/api';
import Main from '@/components/Main';
import { useStore } from '@/context';
import { message } from '@/lib/EscapeAntd';
import FormPasswordEdit from './FormPasswordEdit';
import FormTextEdit from './FormTextEdit';
import FormUploadEdit from './FormUploadEdit';
import styles from './style.module.css';

function PersonSetting() {
  const { userInfo, reloadUserInfo } = useStore();
  const reload = async (fn: () => Promise<any>) => {
    await fn();
    await reloadUserInfo();
    message.success('修改成功');
  };
  if (!userInfo) return null;
  return (
    <Main className={cls('bg-white px-6 py-7', styles.settingProfile)}>
      <FormTextEdit
        value={userInfo?.username}
        label="用户名"
        onConfirm={async (value) => {
          await reload(() =>
            updateUserInfo(userInfo.id!, {
              username: value,
            }),
          );
        }}
      />
      <FormTextEdit
        value={userInfo?.email}
        label="邮箱"
        onConfirm={async (value) => {
          await reload(() =>
            updateUserInfo(userInfo.id!, {
              email: value,
            }),
          );
        }}
      />
      <FormUploadEdit
        label="头像"
        value={userInfo.avatar}
        onConfirm={async (url: string) => {
          await reload(() => {
            return updateUserAvatar(userInfo.id!, url);
          });
        }}
      />
      <FormPasswordEdit
        label="密码"
        onConfirm={async (value) => {
          await reload(() =>
            updateUserPassword(userInfo.id!, {
              password: value.password,
              oldPassword: value.oldPassword,
            }),
          );
        }}
      />
    </Main>
  );
}

export default PersonSetting;
