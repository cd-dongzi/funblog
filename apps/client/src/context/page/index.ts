import { useContext } from 'react';

import { Context as PageContext } from './context';
import { Provider as PageProvider } from './provider';

export const usePageStore = () => useContext(PageContext);
export { PageContext, PageProvider };
