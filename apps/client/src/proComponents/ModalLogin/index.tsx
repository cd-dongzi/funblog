'use client';
// import { User } from '@funblog/types';
import React, { useState } from 'react';
import { loginUser } from '@/api';
import Notification from '@/components/Notification';
import { useStore } from '@/context';
import ModalForm from '@/proComponents/ModalForm';
import ModalForgetPassword from './ModalForgetPassword';
import ModalRegister from './ModalRegister';
// import ThirdParty from './ThirdParty';

type Props = {
  isOpen: boolean;
  disabled?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};

const ModalLogin = ({ isOpen, onClose, onOpen }: Props) => {
  const { updateUserInfo } = useStore();
  const [showRegister, setShowRegister] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  // 第三方本地授权
  // const onThirdPartySubmit = (info: Partial<User>) => {
  //   console.log('third party submit', info);
  // };

  return (
    <>
      <ModalForm
        isOpen={isOpen}
        title="LOGIN"
        confirmText="登录"
        onClose={onClose}
        fields={[
          {
            type: 'input',
            name: 'username',
            label: '邮箱/用户名',
            icon: 'user',
            required: true,
          },
          { type: 'password', name: 'password', label: '密码', icon: 'password', required: true },
        ]}
        onConfirm={async (form) => {
          try {
            const { data } = await loginUser(form);
            updateUserInfo(data);
            location.reload();
          } catch (e: any) {
            Notification.error(e?.message || '登录失败');
          }
        }}
        renderFooter={({ dom }) => {
          return (
            <>
              <div className="flex w-full justify-between px-2">
                <button
                  className="btn-clear text-xs hover:underline"
                  onClick={() => {
                    onClose?.();
                    setShowRegister(true);
                  }}
                >
                  注册账号
                </button>
                <button
                  className="btn-clear text-xs hover:underline"
                  onClick={() => {
                    onClose?.();
                    setShowForgetPassword(true);
                  }}
                >
                  忘记密码
                </button>
              </div>
              <div className="mt-4 flex items-center">{dom}</div>
              {/* <ThirdParty onSubmit={onThirdPartySubmit} /> */}
            </>
          );
        }}
      />
      <ModalRegister
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={() => {
          onOpen?.();
        }}
      />
      <ModalForgetPassword
        isOpen={showForgetPassword}
        onConfirm={() => {
          Notification.error('此功能暂未开放');
        }}
        onClose={() => setShowForgetPassword(false)}
      />
    </>
  );
};

export default ModalLogin;
