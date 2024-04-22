import { createContext } from 'react';

export interface PageContextPagination {
  total: number;
  pageSize?: number;
  page?: number;
}
export interface PageContextProps {
  pagination?: PageContextPagination;
}

export interface PageContextData extends PageContextProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  updatePagination: (pagination: Partial<PageContextPagination>) => void;
}
export const Context = createContext({} as PageContextData);
