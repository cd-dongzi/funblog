import { Icon } from '@funblog/components';
import { useState } from 'react';
import { logout, updateUserAvatar, updateUserInfo as updateUserInfoApi } from '@/api';
import { NormalImage } from '@/components/Image';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import { useStore } from '@/context';
import ModalForm from '@/proComponents/ModalForm';
import { getResourceUrl } from '@/utils';
import ModalAccount from './ModalAccount';
import ModalAvatar from './ModalAvatar';

function ModalUserInfo({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const { userInfo, updateUserInfo, clearUserInfo } = useStore();
  const [showAvatar, setShowAvatar] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  if (!userInfo?.id) return null;
  const list = [
    { label: '用户头像', prefixIcon: '', suffixIcon: 'edit', suffixText: '更换', onClick: () => setShowAvatar(true) },
    { label: '账号资料', prefixIcon: '', suffixIcon: 'edit', suffixText: '修改', onClick: () => setShowAccount(true) },
  ];
  return (
    <>
      <ModalForm
        title={'个人信息'}
        isOpen={isOpen}
        onClose={onClose}
        renderContent={({ onClose: done }) => {
          return (
            <div className="px-5 pb-5">
              <div className="flex items-center">
                {userInfo?.avatar && (
                  <NormalImage
                    src={getResourceUrl(userInfo.avatar)}
                    className="mr-4 h-[50px] w-[50px] rounded-full object-cover"
                  />
                )}
                <h3 className="text-xl shadow-text">{userInfo?.username}</h3>
              </div>
              <div className="mt-5">
                <div>
                  <div className="shadow-text">基本信息</div>
                  <div className="mt-4 overflow-hidden rounded-md border border-solid border-gray/10 bg-white">
                    {list.map((item) => {
                      return (
                        <div
                          key={item.label}
                          className="flex h-10 justify-between px-4 [&:not(:last-child)]:[border-bottom:1px_solid_theme(colors.gray/0.1)]"
                        >
                          <div className="flex items-center">
                            {item.prefixIcon && <Icon name={item.prefixIcon} className="mr-1" />}
                            <span>{item.label}</span>
                          </div>
                          <div className="flex cursor-pointer items-center hover:!text-primary" onClick={item.onClick}>
                            <Icon name={item.suffixIcon} className="mr-1" />
                            <span>{item.suffixText}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                className="mt-5 w-full rounded-md bg-red text-center leading-10 text-white"
                onClick={() => {
                  Modal.openModal({
                    content: '确定要登出吗？',
                    onConfirm: async () => {
                      await logout();
                      clearUserInfo();
                      done();
                      onClose?.();
                      location.reload();
                      return true;
                    },
                  });
                }}
              >
                退出
              </button>
            </div>
          );
        }}
      />
      <ModalAvatar
        isOpen={showAvatar}
        onClose={() => setShowAvatar(false)}
        onSubmit={async (avatar) => {
          await updateUserAvatar(userInfo.id, avatar);
          Notification.info('头像更换成功');
          updateUserInfo({ avatar });
          setShowAvatar(false);
        }}
      />
      <ModalAccount
        isOpen={showAccount}
        onClose={() => setShowAccount(false)}
        onSubmit={async (data) => {
          await updateUserInfoApi(userInfo.id, data);
          Notification.info('信息更新成功');
          updateUserInfo(data);
          return true;
        }}
      />
    </>
  );
}

export default ModalUserInfo;
