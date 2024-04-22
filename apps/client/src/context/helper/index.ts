import { useContext } from 'react';

import { HelperContext, HelperContextProps } from './context';
import { HelperProvider } from './provider';

export const useHelperStore = () => useContext(HelperContext);
export { HelperContext, HelperProvider };
export type { HelperContextProps };
