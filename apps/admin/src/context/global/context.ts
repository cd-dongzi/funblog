import { SiteMeta, User } from '@funblog/types';
import { createContext } from 'react';

export interface GlobalContextProps {
  userInfo?: Partial<User>;
  siteMeta?: Partial<SiteMeta>;
}
export interface GlobalContextData extends GlobalContextProps {
  // setUserInfo: (userInfo: Partial<User>) => void;
  reloadUserInfo: () => Promise<void>;
}
export const GlobalContext = createContext({} as GlobalContextData);
