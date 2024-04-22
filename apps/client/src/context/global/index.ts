import { useContext } from 'react';

import { GlobalContext } from './context';
import { GlobalProvider } from './provider';

export const useStore = () => useContext(GlobalContext);
export { GlobalContext, GlobalProvider };
