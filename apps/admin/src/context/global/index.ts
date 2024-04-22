import { useContext } from 'react';

import { GlobalContext, GlobalContextProps } from './context';
import { GlobalProvider } from './provider';

export const useStore = () => useContext(GlobalContext);
export { GlobalContext, GlobalProvider };
export type { GlobalContextProps };
