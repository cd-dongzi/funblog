import { useState } from 'react';
import { getUserInfoByToken } from '@/api';
import { setMetaDataSiteMeta } from '@/config/metaData';
import { GlobalContext, GlobalContextProps } from './context';

export const GlobalProvider = ({ children, ...props }: { children: React.ReactNode } & GlobalContextProps) => {
  const [_userInfo, setUserInfo] = useState(props.userInfo);
  const reloadUserInfo = async () => {
    const info = await getUserInfoByToken();
    setUserInfo(info);
  };
  setMetaDataSiteMeta(props.siteMeta);
  return (
    <GlobalContext.Provider value={{ ...props, userInfo: _userInfo, reloadUserInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};
