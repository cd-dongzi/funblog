'use client';

import { Icon } from '@funblog/components';
import { useState } from 'react';
import { NormalImage } from '@/components/Image';
import { useStore } from '@/context';
import ModalLogin from '@/proComponents/ModalLogin';
import ModalUserInfo from '@/proComponents/ModalUserInfo';
import { getResourceUrl } from '@/utils';
import styles from './style.module.css';

function LoginBtn() {
  const { userInfo, showLogin, toggleLogin } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = !!userInfo?.username;
  return (
    <>
      <div className={styles.loginBtn}>
        <div className={styles.loginBtnItem}>
          {/* {isLogin ? <Icon name="user" /> : <Icon name="me" />} */}
          {isLogin ? (
            userInfo.avatar ? (
              <NormalImage
                src={getResourceUrl(userInfo.avatar)}
                onClick={() => setIsOpen(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <Icon name="user" onClick={() => setIsOpen(true)} />
            )
          ) : (
            <Icon name="user-stroke" onClick={() => toggleLogin(true)} />
          )}
        </div>
      </div>
      {isLogin ? (
        <ModalUserInfo isOpen={isOpen} onClose={() => setIsOpen(false)} />
      ) : (
        <ModalLogin isOpen={showLogin} onClose={() => toggleLogin(false)} onOpen={() => toggleLogin(true)} />
      )}
    </>
  );
}

export default LoginBtn;
