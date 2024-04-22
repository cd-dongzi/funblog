import { setMetaDataServerUrl } from '@/config/metaData';
import { HelperContext, HelperContextProps } from './context';

export const HelperProvider = ({ children, ...props }: { children: React.ReactNode } & HelperContextProps) => {
  setMetaDataServerUrl(props.serverUrl);
  return <HelperContext.Provider value={{ ...props }}>{children}</HelperContext.Provider>;
};
