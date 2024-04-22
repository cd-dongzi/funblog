import { Icon } from '@funblog/components';
import { User } from '@funblog/types';
import { getOS } from '@funblog/utils';
import cls from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Tooltip from '@/components/Tooltip';
import styles from './style.module.css';

type Props = {
  onSubmit: (user: Partial<User>) => void;
};
const _thirdPartyList = [
  { name: 'Github', icon: 'github' },
  { name: 'QQ', icon: 'qq' },
  { name: 'Google', icon: 'google' },
];
const rootConfig = {
  github: {
    username: 'cd-dongzi',
    token: '1744b9b4b8a43c0627a6d5b24b3ce67a68f7e42a',
    oauth: {
      url: 'https://github.com/login/oauth/authorize',
      redirect_uri: 'https://dzblog.cn/api/client/user/oauth/github',
      client_id: 'ca09fa9778fb0266b767',
      client_secret: '65761f5d53c7ec666bf04639d91ed313ae1015b6',
    },
  },
  google: {
    oauth: {
      redirect_uri: 'https://localhost:3000/api/client/user/oauth/google',
      client_id: '20444399740-mirseg3jk7h64d274119iok7ftajbrcv.apps.googleusercontent.com',
      client_secret: 'FgNJyamwHrTW1aRmAsg7TsD4',
    },
  },
  qq: {
    oauth: {
      url: 'https://graph.qq.com/oauth2.0/authorize',
      redirect_uri: 'https://dzblog.cn/api/client/user/oauth/qq',
      appId: '101946622',
      appKey: '831a49029b279c7884aa9df8a253980b',
    },
  },
};
const ThirdParty = ({ onSubmit }: Props) => {
  const [thirdPartyList, setThirdPartyList] = useState<{ name: string; icon: string }[]>([]);
  const [show, setShow] = useState(false);
  const onClick = async (item: { name: string; icon: string }) => {
    const newWidth = 600;
    const newHeight = 600;
    const winWidth = screen.width;
    const winHeight = screen.height;
    const left = (winWidth - newWidth) / 2;
    const top = (winHeight - newHeight) / 2;
    const windowSize = `width=${newWidth},height=${newHeight},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no`;
    if (item.name === 'Github') {
      const oauth = rootConfig.github.oauth;
      const url = `${oauth.url}?client_id=${oauth.client_id}&redirect_uri=${encodeURIComponent(oauth.redirect_uri)}`;
      window.open(url, 'GithubLogin', windowSize);
    } else if (item.name === 'QQ') {
      const oauth = rootConfig.qq.oauth;
      const url = `${oauth.url}?response_type=code&client_id=${oauth.appId}&redirect_uri=${encodeURIComponent(
        oauth.redirect_uri,
      )}&state=state`;
      window.open(url, 'TencentLogin', windowSize);
    } else if (item.name === 'Google') {
      window.gapi.load('auth2', () => {
        const authObj = window.gapi.auth2.init({
          client_id: rootConfig.google.oauth.client_id,
          scope: 'email profile openid',
          prompt: 'select_account',
        });
        authObj.signIn().then(async (user: any) => {
          const profile = user.getBasicProfile();
          onSubmit({
            email: profile.getEmail(),
            username: profile.getName(),
            avatar: profile.getImageUrl(),
          });
        });
      });
    }
  };

  useEffect(() => {
    setThirdPartyList(
      _thirdPartyList.filter((item) => {
        if (item.name === 'Google' && !getOS(navigator.userAgent).isChrome) {
          return false;
        }
        return true;
      }),
    );
  }, []);
  return (
    <div className={styles.wrapper}>
      {/* <Tooltip
        content="第三方登录不一定能获取到邮箱，如未能获取到邮箱，请尽量绑定邮箱，以便能及时接收消息"
        className={styles.tooltip}
      >
        <p
          className={cls(styles.expand, {
            [styles.hide]: show,
          })}
          onClick={() => setShow(!show)}
        >
          第三方登录
        </p>
      </Tooltip> */}
      <p
        className={cls(styles.expand, {
          [styles.hide]: show,
        })}
        onClick={() => setShow(!show)}
      >
        第三方登录
      </p>
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.list}>
            {thirdPartyList.map((item) => (
              <Tooltip content={item.name} key={item.name}>
                <div className={styles.item} onClick={() => onClick(item)}>
                  <Icon name={item.icon} />
                </div>
              </Tooltip>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* <CSSTransition
        in={show}
        appear
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames="tp-list"
        unmountOnExit
      >
        <div className="df-c tp-list">
          {thirdPartyList.map((item) => (
            <Tooltip content={item.name} key={item.name}>
              <div className="tp-item df-c" onClick={() => onClick(item)}>
                <Icon name={item.icon} />
              </div>
            </Tooltip>
          ))}
        </div>
      </CSSTransition> */}
    </div>
  );
};

export default ThirdParty;
