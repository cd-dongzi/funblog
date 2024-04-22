import { createContext } from 'react';

export interface HelperContextProps {
  serverUrl?: string;
}
export interface HelperContextData extends HelperContextProps {}
export const HelperContext = createContext({} as HelperContextData);
