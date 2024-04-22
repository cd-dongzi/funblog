import { User } from '@funblog/types';
import { useCallback, useState } from 'react';
import { setMetaDataSiteMeta } from '@/config/metaData';
import { GlobalContext, GlobalContextProps } from './context';
import usePc from './hooks/usePc';

export const GlobalProvider = ({ children, ...props }: { children: React.ReactNode } & GlobalContextProps) => {
  const { pc } = usePc();
  const [showMSidebar, setShowMSidebar] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<User>(props.userInfo || ({} as User));

  const toggleMSidebar = useCallback((bol: boolean) => setShowMSidebar(bol), []);
  const toggleLogin = useCallback((bol: boolean) => setShowLogin(bol), []);

  const updateUserInfo = useCallback((user: Partial<User>) => {
    setUserInfo((prev) => ({ ...prev, ...user }));
  }, []);
  const clearUserInfo = useCallback(() => {
    setUserInfo({} as User);
  }, []);
  setMetaDataSiteMeta(props.siteMeta);
  return (
    <GlobalContext.Provider
      value={{
        pc,
        showMSidebar,
        toggleMSidebar,
        showLogin,
        toggleLogin,
        ...props,
        userInfo,
        updateUserInfo,
        clearUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
